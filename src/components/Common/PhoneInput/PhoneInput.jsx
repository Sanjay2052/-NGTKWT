import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

export const COUNTRY_CODES = [
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', placeholder: '9876 5432' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', placeholder: '50 123 4567' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', placeholder: '5512 3456' },
  { code: '+968', country: 'Oman', flag: '🇴🇲', placeholder: '9123 4567' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', placeholder: '3912 3456' },
  { code: '+91', country: 'India', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', placeholder: '300 1234567' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩', placeholder: '1712 345678' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', placeholder: '77 123 4567' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭', placeholder: '917 123 4567' },
  { code: '+86', country: 'China', flag: '🇨🇳', placeholder: '139 1234 5678' },
  { code: '+93', country: 'Afghanistan', flag: '🇦🇫', placeholder: '70 123 4567' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', placeholder: '100 123 4567' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿', placeholder: '550 12 34 56' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦', placeholder: '612 345678' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳', placeholder: '20 123 456' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', placeholder: '802 123 4567' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', placeholder: '71 123 4567' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', placeholder: '712 345 678' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭', placeholder: '24 123 4567' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹', placeholder: '91 123 4567' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿', placeholder: '712 345 678' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬', placeholder: '712 345 678' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴', placeholder: '7 9123 4567' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧', placeholder: '70 123 456' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶', placeholder: '770 123 4567' },
  { code: '+44', country: 'UK', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', placeholder: '202 555 0123' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', placeholder: '8123 4567' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', placeholder: '984 1234567' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷', placeholder: '501 123 4567' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: '+33', country: 'France', flag: '🇫🇷', placeholder: '6 12 34 56 78' }
];

export default function PhoneInput({ value = '', onChange, error = false, id }) {
  const [selectedCode, setSelectedCode] = useState('+965');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Parse external value on load or change
  useEffect(() => {
    if (!value) {
      setPhoneNumber('');
      return;
    }

    const trimmed = value.trim();
    if (trimmed.startsWith('+')) {
      const matched = COUNTRY_CODES
        .slice()
        .sort((a, b) => b.code.length - a.code.length)
        .find(c => trimmed.startsWith(c.code));

      if (matched) {
        setSelectedCode(matched.code);
        const rest = trimmed.slice(matched.code.length).trim();
        setPhoneNumber(rest);
      } else {
        setPhoneNumber(trimmed);
      }
    } else {
      setPhoneNumber(trimmed);
    }
  }, [value]);

  const currentCountry = COUNTRY_CODES.find(c => c.code === selectedCode) || COUNTRY_CODES[0];

  const filteredCountries = COUNTRY_CODES.filter((item) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      item.country.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  const handleSelectCountry = (country) => {
    setSelectedCode(country.code);
    setIsOpen(false);
    setSearchTerm('');
    const fullVal = phoneNumber ? `${country.code} ${phoneNumber}` : country.code;
    onChange(fullVal);
  };

  const handleNumberChange = (e) => {
    const rawVal = e.target.value;

    // Auto-detect if user typed or pasted a code with '+'
    if (rawVal.startsWith('+')) {
      const matched = COUNTRY_CODES
        .slice()
        .sort((a, b) => b.code.length - a.code.length)
        .find(c => rawVal.startsWith(c.code));

      if (matched) {
        const rest = rawVal.slice(matched.code.length).trim();
        setSelectedCode(matched.code);
        setPhoneNumber(rest);
        onChange(`${matched.code} ${rest}`);
        return;
      }
    }

    setPhoneNumber(rawVal);
    const fullVal = rawVal ? `${selectedCode} ${rawVal}` : '';
    onChange(fullVal);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }} id={id}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '0.5rem',
          background: '#FFFFFF',
          border: error
            ? '2px solid #EF4444'
            : (isFocused || isOpen ? '1.5px solid #D4AF37' : '1px solid #CBD5E1'),
          boxShadow: error
            ? '0 0 0 3px rgba(239, 68, 68, 0.15)'
            : (isFocused || isOpen ? '0 0 0 3px rgba(212, 175, 55, 0.15)' : 'none'),
          transition: 'all 0.2s ease',
          overflow: 'hidden'
        }}
      >
        {/* Trigger Button for Custom Dropdown */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          title="Select Country Code"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.75rem 0.75rem',
            background: isOpen ? '#F1F5F9' : '#F8FAFC',
            border: 'none',
            borderRight: '1px solid #CBD5E1',
            color: 'var(--color-navy-950)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            outline: 'none',
            flexShrink: 0,
            userSelect: 'none',
            transition: 'background 0.15s ease'
          }}
        >
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{currentCountry.flag}</span>
          <span style={{ color: 'var(--color-navy-950)' }}>
            {selectedCode}
          </span>
          <ChevronDown
            size={14}
            style={{
              color: isOpen ? '#D4AF37' : '#64748B',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              marginLeft: '0.1rem'
            }}
          />
        </button>

        {/* Phone Input Field */}
        <input
          type="tel"
          placeholder={currentCountry.placeholder}
          value={phoneNumber}
          onChange={handleNumberChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={20}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            background: '#FFFFFF',
            border: 'none',
            color: 'var(--color-navy-950)',
            fontSize: '0.95rem',
            fontWeight: 500,
            outline: 'none',
            width: '100%'
          }}
        />
      </div>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.35rem)',
            left: 0,
            zIndex: 9999,
            width: 'min(320px, 100vw - 2rem)',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '0.75rem',
            boxShadow: '0 12px 30px rgba(11, 30, 54, 0.18)',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          {/* Search Box inside Popover */}
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
            <Search size={15} style={{ color: '#D4AF37', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search country or code..."
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

          {/* List of Countries */}
          <div
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              padding: '0.25rem 0'
            }}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((item) => {
                const isSelected = item.code === selectedCode;
                return (
                  <div
                    key={`${item.code}-${item.country}`}
                    onClick={() => handleSelectCountry(item)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.85rem',
                      color: isSelected ? '#D4AF37' : 'var(--color-navy-950)',
                      fontWeight: isSelected ? 600 : 400,
                      background: isSelected ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.12s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{item.flag}</span>
                      <span style={{ fontWeight: 600, minWidth: '45px', color: 'var(--color-navy-950)' }}>
                        {item.code}
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.8rem' }}>
                        {item.country}
                      </span>
                    </div>

                    {isSelected && <Check size={16} style={{ color: '#D4AF37', flexShrink: 0 }} />}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: '1.25rem 1rem',
                  textAlign: 'center',
                  color: '#64748B',
                  fontSize: '0.825rem'
                }}
              >
                No matching country found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
