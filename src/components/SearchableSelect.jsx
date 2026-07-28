import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

export default function SearchableSelect({
  options = [],
  value = '',
  onChange = () => {},
  placeholder = 'Select option...',
  searchPlaceholder = 'Search options...',
  accentColor = '#F95738', // brand default
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Auto focus search input on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger Button / Display Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          background: '#FFFFFF',
          border: isOpen ? `1.5px solid ${accentColor}` : '1px solid #CBD5E1',
          color: value ? 'var(--color-navy-950)' : '#94A3B8',
          fontSize: '0.9rem',
          fontWeight: value ? 500 : 400,
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: isOpen ? `0 0 0 3px ${accentColor}20` : 'none',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
      >
        <span style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginRight: '0.5rem'
        }}>
          {value || placeholder}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {value && (
            <span
              onClick={handleClear}
              title="Clear selection"
              style={{
                color: '#94A3B8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <X size={14} />
            </span>
          )}
          <ChevronDown
            size={18}
            style={{
              color: isOpen ? accentColor : '#64748B',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease'
            }}
          />
        </div>
      </div>

      {/* Hidden input for HTML form validation if required */}
      {required && (
        <input
          type="text"
          value={value}
          onChange={() => {}}
          required
          tabIndex={-1}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            position: 'absolute',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.35rem)',
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '0.75rem',
            boxShadow: '0 12px 30px rgba(11, 30, 54, 0.15)',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {/* Search Box Header */}
          <div
            style={{
              padding: '0.65rem 0.75rem',
              borderBottom: '1px solid #F1F5F9',
              background: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Search size={16} style={{ color: accentColor, flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.85rem',
                color: 'var(--color-navy-950)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Counter info */}
          <div
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.725rem',
              color: '#64748B',
              background: '#F1F5F9',
              borderBottom: '1px solid #E2E8F0',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>Showing {filteredOptions.length} of {options.length} options</span>
            {searchTerm && <span>Filter: "{searchTerm}"</span>}
          </div>

          {/* Options Scroll List */}
          <div
            style={{
              maxHeight: '230px',
              overflowY: 'auto',
              padding: '0.25rem 0'
            }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => {
                const isSelected = value === option;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(option)}
                    style={{
                      padding: '0.65rem 1rem',
                      fontSize: '0.875rem',
                      color: isSelected ? accentColor : 'var(--color-navy-950)',
                      fontWeight: isSelected ? 700 : 400,
                      background: isSelected
                        ? `${accentColor}10`
                        : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>{option}</span>
                    {isSelected && <Check size={16} style={{ color: accentColor }} />}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  color: '#64748B',
                  fontSize: '0.85rem'
                }}
              >
                No matching options found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
