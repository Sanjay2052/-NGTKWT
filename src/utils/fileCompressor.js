import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';

// Configure pdfjs worker source dynamically
if (typeof window !== 'undefined' && pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

/**
 * Format bytes to readable MB/KB string
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Compress an Image File (JPG, PNG, WEBP) to be strictly < 1MB
 */
async function compressImage(file, maxBytes = 950 * 1024) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = async () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        // Maximum dimension cap for document clarity
        let maxDim = 1920;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image onto canvas with white background (handles transparent PNGs converting to JPEG)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        let blob = null;

        // Iteratively lower quality/resolution until size < maxBytes
        while (quality >= 0.15) {
          blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', quality));
          if (blob && blob.size <= maxBytes) {
            break;
          }
          quality -= 0.12;

          // If quality drops below 0.45 and still > maxBytes, resize dimensions further
          if (quality < 0.45 && (canvas.width > 800 || canvas.height > 800)) {
            canvas.width = Math.round(canvas.width * 0.8);
            canvas.height = Math.round(canvas.height * 0.8);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }

        if (!blob) {
          resolve(file);
          return;
        }

        const compressedFileName = file.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg";
        const compressedFile = new File([blob], compressedFileName, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });

        resolve(compressedFile);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Compress a PDF File using pdfjs-dist canvas rendering and jsPDF creation
 */
async function compressPdf(file, maxBytes = 950 * 1024) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) return file;

    // Determine initial rendering scale based on page count
    let renderScale = numPages > 5 ? 1.0 : (numPages > 2 ? 1.25 : 1.5);
    let jpegQuality = 0.70;

    let compressedBlob = null;
    let attempts = 0;

    while (attempts < 3) {
      const pdfWriter = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: renderScale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        const imgData = canvas.toDataURL('image/jpeg', jpegQuality);

        if (pageNum > 1) {
          pdfWriter.addPage([viewport.width, viewport.height], viewport.width > viewport.height ? 'landscape' : 'portrait');
        } else {
          pdfWriter.deletePage(1);
          pdfWriter.addPage([viewport.width, viewport.height], viewport.width > viewport.height ? 'landscape' : 'portrait');
        }

        pdfWriter.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
      }

      compressedBlob = pdfWriter.output('blob');

      if (compressedBlob.size <= maxBytes) {
        break;
      }

      // Aggressive compression for next iteration if size > maxBytes
      renderScale = Math.max(0.75, renderScale * 0.75);
      jpegQuality = Math.max(0.35, jpegQuality - 0.20);
      attempts++;
    }

    if (!compressedBlob || compressedBlob.size >= file.size) {
      return file; // If compression didn't reduce size, keep original
    }

    const compressedFileName = file.name.replace(/\.[^/.]+$/, "") + "_compressed.pdf";
    return new File([compressedBlob], compressedFileName, {
      type: 'application/pdf',
      lastModified: Date.now()
    });
  } catch (error) {
    console.warn("PDF compression fallback:", error);
    return file;
  }
}

/**
 * Compress a DOCX File by re-encoding embedded media images in word/media/
 */
async function compressDocx(file, maxBytes = 950 * 1024) {
  try {
    const zip = new JSZip();
    const loadedZip = await zip.loadAsync(file);

    let imageFiles = [];
    loadedZip.folder("word/media")?.forEach((relativePath, fileEntry) => {
      if (!fileEntry.dir) {
        imageFiles.push({ path: relativePath, entry: fileEntry });
      }
    });

    if (imageFiles.length === 0) {
      // Re-pack with maximum DEFLATE compression if no images found
      const newBlob = await loadedZip.generateAsync({
        type: 'blob',
        mimeType: file.type,
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
      });
      if (newBlob.size < file.size) {
        return new File([newBlob], file.name, { type: file.type });
      }
      return file;
    }

    // Compress embedded media images
    for (const imgItem of imageFiles) {
      const imgBlob = await imgItem.entry.async("blob");
      if (imgBlob.size > 100 * 1024) { // Only compress images larger than 100KB inside docx
        const imgFile = new File([imgBlob], imgItem.path, { type: imgBlob.type || 'image/jpeg' });
        const compressedImg = await compressImage(imgFile, 150 * 1024); // max 150KB per docx image
        const compressedBuffer = await compressedImg.arrayBuffer();
        loadedZip.file("word/media/" + imgItem.path, compressedBuffer);
      }
    }

    const compressedBlob = await loadedZip.generateAsync({
      type: 'blob',
      mimeType: file.type,
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    });

    if (compressedBlob.size >= file.size) {
      return file;
    }

    return new File([compressedBlob], file.name, { type: file.type });
  } catch (error) {
    console.warn("DOCX compression fallback:", error);
    return file;
  }
}

/**
 * Main entry point: Compresses file if size > 1MB (1,048,576 bytes)
 * Returns object containing compressed file and stats.
 */
export async function compressFileIfNeeded(file, onStatusUpdate = null) {
  if (!file) return null;

  const ONE_MB = 1024 * 1024;
  const TARGET_MAX_BYTES = 950 * 1024; // ~0.93 MB to strictly guarantee < 1 MB

  const originalSize = file.size;

  // If file is already <= 1 MB, no compression needed
  if (originalSize <= ONE_MB) {
    return {
      file,
      compressed: false,
      originalSize,
      compressedSize: originalSize,
      formattedOriginal: formatFileSize(originalSize),
      formattedCompressed: formatFileSize(originalSize),
      savingsPercent: 0
    };
  }

  if (onStatusUpdate) onStatusUpdate(`Compressing document from ${formatFileSize(originalSize)}...`);

  const fileExt = file.name.split('.').pop().toLowerCase();
  const fileType = file.type.toLowerCase();

  let outputFile = file;

  try {
    if (fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
      outputFile = await compressImage(file, TARGET_MAX_BYTES);
    } else if (fileType === 'application/pdf' || fileExt === 'pdf') {
      outputFile = await compressPdf(file, TARGET_MAX_BYTES);
    } else if (fileExt === 'docx' || fileType.includes('wordprocessingml')) {
      outputFile = await compressDocx(file, TARGET_MAX_BYTES);
    } else if (fileExt === 'doc') {
      // Legacy .doc format - attempt zip DEFLATE packing if possible
      outputFile = await compressDocx(file, TARGET_MAX_BYTES);
    }
  } catch (err) {
    console.error("Auto-compression error:", err);
    outputFile = file;
  }

  // Safety check: if compression still yielded > 1MB, run an aggressive image fallback if it's an image
  if (outputFile.size > ONE_MB && (outputFile.type.startsWith('image/') || ['jpg', 'jpeg', 'png'].includes(fileExt))) {
    outputFile = await compressImage(outputFile, 800 * 1024);
  }

  const finalSize = outputFile.size;
  const isCompressed = finalSize < originalSize;
  const savingsPercent = isCompressed ? Math.round(((originalSize - finalSize) / originalSize) * 100) : 0;

  return {
    file: outputFile,
    compressed: isCompressed,
    originalSize,
    compressedSize: finalSize,
    formattedOriginal: formatFileSize(originalSize),
    formattedCompressed: formatFileSize(finalSize),
    savingsPercent
  };
}
