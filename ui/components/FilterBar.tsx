"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, MapPin, Search, X } from "lucide-react";

interface FilterBarProps {
  districts: { value: string; label: string }[];
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
  selectedMonthIndex: number;
  onMonthChange: (index: number) => void;
  months: string[];
  isLoading?: boolean;
}

export default function FilterBar({
  districts,
  selectedDistrict,
  onDistrictChange,
  selectedMonthIndex,
  onMonthChange,
  months,
  isLoading,
}: FilterBarProps) {
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const districtDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  // Handle click outside district dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        districtDropdownRef.current &&
        !districtDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDistrictOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDistrictOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDistrictOpen]);

  // Escape to close dropdown / month picker
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsDistrictOpen(false);
        setIsMonthOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredDistricts = districts.filter((district) =>
    district.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedLabel = districts.find(
    (d) => d.value === selectedDistrict,
  )?.label;

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* District Selector */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Location
          </label>
          <div ref={districtDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsDistrictOpen(!isDistrictOpen)}
              aria-expanded={isDistrictOpen}
              aria-haspopup="listbox"
              aria-label={
                selectedDistrict
                  ? `Location: ${selectedLabel}`
                  : "Choose location"
              }
              className="w-full min-h-12 px-5 py-3 rounded-xl border border-border/50 bg-background/50 text-foreground hover:border-primary/30 hover:bg-background flex items-center justify-between text-sm font-medium transition-all duration-200"
            >
              <span className="flex items-center gap-3 min-w-0">
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden />
                <span className="truncate">{selectedLabel || "Choose a district..."}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                  isDistrictOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDistrictOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-3 bg-card border border-border/50 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden"
                role="listbox"
              >
                <div className="p-4 border-b border-border/30">
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                      aria-hidden
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search districts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border/30 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                </div>

                <ul className="max-h-72 overflow-y-auto">
                  {filteredDistricts.map((district, index) => (
                    <li key={district.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedDistrict === district.value}
                        onClick={() => {
                          onDistrictChange(district.value);
                          setIsDistrictOpen(false);
                          setSearchQuery("");
                        }}
                        className={`w-full text-left px-5 py-4 text-sm transition-colors duration-150 flex items-center gap-3 ${
                          selectedDistrict === district.value ?
                            "bg-primary/12 text-primary font-semibold"
                          : "text-foreground hover:bg-secondary/15"
                        } ${index > 0 ? "border-t border-border/20" : ""}`}
                      >
                        {selectedDistrict === district.value && (
                          <span
                            className="w-2 h-2 bg-primary rounded-full shrink-0"
                            aria-hidden
                          />
                        )}
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

        {/* Month Selector */}
        {selectedDistrict && (
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Month
            </label>
            <div>
              <button
                type="button"
                onClick={() => setIsMonthOpen(true)}
                className="w-full min-h-12 px-5 py-3 rounded-xl border border-border/50 bg-background/50 text-foreground hover:border-primary/30 hover:bg-background flex items-center justify-between text-sm font-medium transition-colors"
                aria-label="Choose month"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{months[selectedMonthIndex]}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Month picker modal */}
      {isMonthOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-2xl border border-border bg-card shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  Select month
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMonthOpen(false)}
                className="p-1.5 rounded-md hover:bg-secondary/20 text-muted-foreground"
                aria-label="Close month picker"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {months.map((month, index) => {
                const isActive = index === selectedMonthIndex;
                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => {
                      onMonthChange(index);
                      setIsMonthOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ?
                        "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background/60 border border-border/60 text-foreground hover:border-primary/40 hover:bg-background"
                    }`}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
