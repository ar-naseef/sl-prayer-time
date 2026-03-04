'use client';

import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  months: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export default function MonthSelector({ months, selectedIndex, onChange }: MonthSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedButton = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedIndex]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-foreground">
        Select Month
      </label>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-gradient-to-r from-background via-background to-transparent hover:from-primary/15 transition-colors rounded-r-lg opacity-0 group-hover:opacity-100"
          aria-label="Scroll months left"
        >
          <ChevronLeft className="w-4 h-4 text-primary" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scroll-smooth px-12 py-2 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onChange(index)}
              className={`flex-shrink-0 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                selectedIndex === index
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border/50 text-foreground hover:border-primary/30'
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-gradient-to-l from-background via-background to-transparent hover:from-primary/15 transition-colors rounded-l-lg opacity-0 group-hover:opacity-100"
          aria-label="Scroll months right"
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
