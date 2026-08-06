import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

export const COUNTRY_CODES = [
  // Middle East & GCC
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', placeholder: '9876 5432' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', placeholder: '50 123 4567' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', placeholder: '5512 3456' },
  { code: '+968', country: 'Oman', flag: '🇴🇲', placeholder: '9123 4567' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', placeholder: '3912 3456' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴', placeholder: '7 9123 4567' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧', placeholder: '70 123 456' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶', placeholder: '770 123 4567' },
  { code: '+967', country: 'Yemen', flag: '🇾🇪', placeholder: '71 234 5678' },
  { code: '+963', country: 'Syria', flag: '🇸🇾', placeholder: '91 234 5678' },
  { code: '+970', country: 'Palestine', flag: '🇵🇸', placeholder: '59 123 4567' },
  { code: '+972', country: 'Israel', flag: '🇮🇱', placeholder: '50 123 4567' },
  { code: '+98', country: 'Iran', flag: '🇮🇷', placeholder: '912 345 6789' },

  // South Asia
  { code: '+91', country: 'India', flag: '🇮🇳', placeholder: '98765 43210' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', placeholder: '300 1234567' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩', placeholder: '1712 345678' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', placeholder: '77 123 4567' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', placeholder: '984 1234567' },
  { code: '+93', country: 'Afghanistan', flag: '🇦🇫', placeholder: '70 123 4567' },
  { code: '+960', country: 'Maldives', flag: '🇲🇻', placeholder: '712 3456' },
  { code: '+975', country: 'Bhutan', flag: '🇧🇹', placeholder: '17 12 34 56' },

  // East & Southeast Asia
  { code: '+86', country: 'China', flag: '🇨🇳', placeholder: '139 1234 5678' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', placeholder: '90 1234 5678' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷', placeholder: '10 1234 5678' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼', placeholder: '912 345 678' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰', placeholder: '9123 4567' },
  { code: '+853', country: 'Macau', flag: '🇲🇴', placeholder: '6123 4567' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭', placeholder: '917 123 4567' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', placeholder: '8123 4567' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', placeholder: '12 345 6789' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩', placeholder: '812 3456 7890' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', placeholder: '81 234 5678' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', placeholder: '91 234 5678' },
  { code: '+95', country: 'Myanmar', flag: '🇲🇲', placeholder: '9 1234 5678' },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭', placeholder: '12 345 678' },
  { code: '+856', country: 'Laos', flag: '🇱🇦', placeholder: '20 1234 5678' },
  { code: '+673', country: 'Brunei', flag: '🇧🇳', placeholder: '812 3456' },
  { code: '+976', country: 'Mongolia', flag: '🇲🇳', placeholder: '8812 3456' },

  // Central Asia & Caucasus
  { code: '+7', country: 'Kazakhstan', flag: '🇰🇿', placeholder: '701 123 4567' },
  { code: '+998', country: 'Uzbekistan', flag: '🇺🇿', placeholder: '90 123 45 67' },
  { code: '+993', country: 'Turkmenistan', flag: '🇹🇲', placeholder: '65 123456' },
  { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬', placeholder: '555 123 456' },
  { code: '+992', country: 'Tajikistan', flag: '🇹🇯', placeholder: '91 812 3456' },
  { code: '+994', country: 'Azerbaijan', flag: '🇦🇿', placeholder: '50 123 45 67' },
  { code: '+374', country: 'Armenia', flag: '🇦🇲', placeholder: '91 123456' },
  { code: '+995', country: 'Georgia', flag: '🇬🇪', placeholder: '591 12 34 56' },

  // Africa
  { code: '+20', country: 'Egypt', flag: '🇪🇬', placeholder: '100 123 4567' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿', placeholder: '550 12 34 56' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦', placeholder: '612 345678' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳', placeholder: '20 123 456' },
  { code: '+218', country: 'Libya', flag: '🇱🇾', placeholder: '91 123 4567' },
  { code: '+249', country: 'Sudan', flag: '🇸🇩', placeholder: '91 234 5678' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬', placeholder: '802 123 4567' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦', placeholder: '71 123 4567' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', placeholder: '712 345 678' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭', placeholder: '24 123 4567' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹', placeholder: '91 123 4567' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿', placeholder: '712 345 678' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬', placeholder: '712 345 678' },
  { code: '+244', country: 'Angola', flag: '🇦🇴', placeholder: '912 345 678' },
  { code: '+237', country: 'Cameroon', flag: '🇨🇲', placeholder: '6 71 23 45 67' },
  { code: '+225', country: 'Ivory Coast', flag: '🇨🇮', placeholder: '07 12 34 5678' },
  { code: '+243', country: 'DR Congo', flag: '🇨🇩', placeholder: '991 234 567' },
  { code: '+242', country: 'Congo', flag: '🇨🇬', placeholder: '06 123 4567' },
  { code: '+221', country: 'Senegal', flag: '🇸🇳', placeholder: '77 123 45 67' },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼', placeholder: '71 234 5678' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲', placeholder: '97 1234567' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼', placeholder: '78 123 4567' },
  { code: '+258', country: 'Mozambique', flag: '🇲🇿', placeholder: '82 123 4567' },
  { code: '+261', country: 'Madagascar', flag: '🇲🇬', placeholder: '32 12 345 67' },
  { code: '+252', country: 'Somalia', flag: '🇸🇴', placeholder: '61 234 5678' },
  { code: '+223', country: 'Mali', flag: '🇲🇱', placeholder: '65 12 34 56' },
  { code: '+226', country: 'Burkina Faso', flag: '🇧🇫', placeholder: '70 12 34 56' },
  { code: '+265', country: 'Malawi', flag: '🇲🇼', placeholder: '88 123 4567' },
  { code: '+227', country: 'Niger', flag: '🇳🇪', placeholder: '90 12 34 56' },
  { code: '+224', country: 'Guinea', flag: '🇬🇳', placeholder: '621 12 34 56' },
  { code: '+235', country: 'Chad', flag: '🇹🇩', placeholder: '66 12 34 56' },
  { code: '+229', country: 'Benin', flag: '🇧🇯', placeholder: '97 12 34 56' },
  { code: '+257', country: 'Burundi', flag: '🇧🇮', placeholder: '79 12 34 56' },
  { code: '+211', country: 'South Sudan', flag: '🇸🇸', placeholder: '912 345 678' },
  { code: '+228', country: 'Togo', flag: '🇹🇬', placeholder: '90 12 34 56' },
  { code: '+232', country: 'Sierra Leone', flag: '🇸🇱', placeholder: '76 123 456' },
  { code: '+231', country: 'Liberia', flag: '🇱🇷', placeholder: '77 123 4567' },
  { code: '+222', country: 'Mauritania', flag: '🇲🇷', placeholder: '45 12 34 56' },
  { code: '+291', country: 'Eritrea', flag: '🇪🇷', placeholder: '7 123 456' },
  { code: '+220', country: 'Gambia', flag: '🇬🇲', placeholder: '701 2345' },
  { code: '+241', country: 'Gabon', flag: '🇬🇦', placeholder: '06 12 34 56' },
  { code: '+264', country: 'Namibia', flag: '🇳🇦', placeholder: '81 123 4567' },
  { code: '+267', country: 'Botswana', flag: '🇧🇼', placeholder: '71 123 456' },
  { code: '+266', country: 'Lesotho', flag: '🇱🇸', placeholder: '58 123 456' },
  { code: '+268', country: 'Eswatini', flag: '🇸🇿', placeholder: '76 123 456' },
  { code: '+253', country: 'Djibouti', flag: '🇩🇯', placeholder: '77 12 34 56' },
  { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶', placeholder: '222 123 456' },
  { code: '+230', country: 'Mauritius', flag: '🇲🇺', placeholder: '5123 4567' },
  { code: '+248', country: 'Seychelles', flag: '🇸🇨', placeholder: '2 51 23 45' },
  { code: '+238', country: 'Cape Verde', flag: '🇨🇻', placeholder: '991 23 45' },

  // Europe
  { code: '+44', country: 'UK', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', placeholder: '151 12345678' },
  { code: '+33', country: 'France', flag: '🇫🇷', placeholder: '6 12 34 56 78' },
  { code: '+39', country: 'Italy', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: '+34', country: 'Spain', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', placeholder: '6 12345678' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭', placeholder: '79 123 45 67' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪', placeholder: '470 12 34 56' },
  { code: '+43', country: 'Austria', flag: '🇦🇹', placeholder: '664 1234567' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', placeholder: '70 123 45 67' },
  { code: '+47', country: 'Norway', flag: '🇳🇴', placeholder: '412 34 567' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰', placeholder: '20 12 34 56' },
  { code: '+358', country: 'Finland', flag: '🇫🇮', placeholder: '45 1234567' },
  { code: '+48', country: 'Poland', flag: '🇵🇱', placeholder: '512 345 678' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', placeholder: '912 345 678' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪', placeholder: '83 123 4567' },
  { code: '+30', country: 'Greece', flag: '🇬🇷', placeholder: '691 234 5678' },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿', placeholder: '601 123 456' },
  { code: '+40', country: 'Romania', flag: '🇷🇴', placeholder: '712 345 678' },
  { code: '+36', country: 'Hungary', flag: '🇭🇺', placeholder: '20 123 4567' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦', placeholder: '50 123 4567' },
  { code: '+7', country: 'Russia', flag: '🇷🇺', placeholder: '912 345-67-89' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷', placeholder: '501 123 4567' },
  { code: '+375', country: 'Belarus', flag: '🇧🇾', placeholder: '29 123-45-67' },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰', placeholder: '912 345 678' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬', placeholder: '87 123 4567' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸', placeholder: '61 1234567' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷', placeholder: '91 123 4567' },
  { code: '+387', country: 'Bosnia & Herzegovina', flag: '🇧🇦', placeholder: '61 123 456' },
  { code: '+355', country: 'Albania', flag: '🇦🇱', placeholder: '67 123 4567' },
  { code: '+370', country: 'Lithuania', flag: '🇱🇹', placeholder: '612 34567' },
  { code: '+371', country: 'Latvia', flag: '🇱🇻', placeholder: '21 234 567' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪', placeholder: '5123 4567' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮', placeholder: '31 123 456' },
  { code: '+357', country: 'Cyprus', flag: '🇨🇾', placeholder: '96 123456' },
  { code: '+352', country: 'Luxembourg', flag: '🇱🇺', placeholder: '621 123 456' },
  { code: '+354', country: 'Iceland', flag: '🇮🇸', placeholder: '612 3456' },
  { code: '+356', country: 'Malta', flag: '🇲🇹', placeholder: '9912 3456' },
  { code: '+373', country: 'Moldova', flag: '🇲🇩', placeholder: '621 23 456' },
  { code: '+389', country: 'North Macedonia', flag: '🇲🇰', placeholder: '71 234 567' },
  { code: '+382', country: 'Montenegro', flag: '🇲🇪', placeholder: '67 123 456' },

  // Americas & Caribbean
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', placeholder: '202 555 0123' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', placeholder: '11 91234-5678' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷', placeholder: '9 11 1234-5678' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴', placeholder: '300 123 4567' },
  { code: '+56', country: 'Chile', flag: '🇨🇱', placeholder: '9 1234 5678' },
  { code: '+51', country: 'Peru', flag: '🇵🇪', placeholder: '912 345 678' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪', placeholder: '412 1234567' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨', placeholder: '99 123 4567' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹', placeholder: '5123 4567' },
  { code: '+53', country: 'Cuba', flag: '🇨🇺', placeholder: '5 1234567' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴', placeholder: '71234567' },
  { code: '+1', country: 'Dominican Republic', flag: '🇩🇴', placeholder: '809 123 4567' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳', placeholder: '9123 4567' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾', placeholder: '981 123456' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻', placeholder: '7012 3456' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮', placeholder: '8712 3456' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷', placeholder: '8123 4567' },
  { code: '+507', country: 'Panama', flag: '🇵🇦', placeholder: '6123 4567' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾', placeholder: '99 123 456' },
  { code: '+1', country: 'Jamaica', flag: '🇯🇲', placeholder: '876 123 4567' },
  { code: '+1', country: 'Trinidad & Tobago', flag: '🇹🇹', placeholder: '868 123 4567' },
  { code: '+1', country: 'Bahamas', flag: '🇧🇸', placeholder: '242 123 4567' },

  // Oceania
  { code: '+61', country: 'Australia', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿', placeholder: '21 123 4567' },
  { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬', placeholder: '7012 3456' },
  { code: '+679', country: 'Fiji', flag: '🇫🇯', placeholder: '701 2345' }
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
