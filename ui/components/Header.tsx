'use client';

import { format } from 'date-fns';
import { Calendar, Copy, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onCopyPrayerTimes?: () => void;
  copyEnabled?: boolean;
}

export default function Header({ onCopyPrayerTimes, copyEnabled }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setShowCopy(true);
        window.setTimeout(() => setShowCopy(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Sri Lanka Prayer Times
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Select your district to view accurate daily prayer times
            </p>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <div className="hidden sm:inline-flex items-center gap-3 px-4 py-2 bg-background/80 border border-border/70">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary">
                <Calendar className="w-4 h-4" aria-hidden />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Today
                </span>
                <span className="text-xs md:text-sm font-semibold text-foreground">
                  {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
            </div>
            {copyEnabled && onCopyPrayerTimes && showCopy && (
              <button
                type="button"
                onClick={onCopyPrayerTimes}
                className="p-2 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                aria-label="Copy prayer times for WhatsApp"
                title="Copy today's prayer times for all regions"
              >
                <Copy className="w-5 h-5 text-primary" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 bg-secondary/20 hover:bg-secondary/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
