'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const districts = [
  { value: 'colombo', label: 'Colombo' },
  { value: 'gampaha', label: 'Gampaha' },
  { value: 'kalutara', label: 'Kalutara' },
  { value: 'jaffna', label: 'Jaffna / Nallur' },
];

interface DistrictSelectorProps {
  selected: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function DistrictSelector({ selected, onChange, isLoading }: DistrictSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredDistricts = districts.filter(district =>
    district.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLabel = districts.find(d => d.value === selected)?.label;

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-foreground mb-3">
        Select Your District
      </label>
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between font-medium ${
            selected
              ? 'bg-primary/8 border-primary/30 text-foreground'
              : 'bg-card border-border/50 text-muted-foreground hover:border-primary/20'
          } hover:shadow-sm`}
        >
          <span>{selectedLabel || 'Select Your District'}</span>
          <ChevronDown
            className={`w-5 h-5 text-primary transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-card border border-border/50 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            <div className="p-4 border-b border-border/30">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <ul className="max-h-72 overflow-y-auto">
              {filteredDistricts.map((district, index) => (
                <li key={district.value}>
                  <button
                    onClick={() => {
                      onChange(district.value);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-5 py-4 text-sm transition-colors duration-150 ${
                      selected === district.value
                        ? 'bg-primary/12 text-primary font-semibold'
                        : 'text-foreground hover:bg-secondary/15'
                    } ${index > 0 ? 'border-t border-border/20' : ''}`}
                  >
                    {district.label}
                  </button>
                </li>
              ))}

              {filteredDistricts.length === 0 && (
                <li className="px-5 py-8 text-center text-muted-foreground text-sm">
                  No districts found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>Loading prayer times...</span>
        </div>
      )}
    </div>
  );
}
