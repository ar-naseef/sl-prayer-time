'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import type { PrayerTime } from '@/data/prayerTimes';
import { formatTimeForDisplay } from '@/data/prayerTimes';

interface MonthlyViewProps {
  data: PrayerTime[];
  district: string;
  month: string;
  isCurrentMonth: boolean;
}

export default function MonthlyView({ data, district, month, isCurrentMonth }: MonthlyViewProps) {
  const [expandedDates, setExpandedDates] = useState<Set<number>>(new Set());
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  const toggleExpanded = (date: number) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  if (data.length === 0) return null;

  const today = new Date().getDate();

  useEffect(() => {
    if (!isCurrentMonth || !tableBodyRef.current) return;
    const row = tableBodyRef.current.querySelector(`[data-date="${today}"]`);
    row?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [isCurrentMonth, today]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {month} Prayer Times
          </h3>
        </div>
        {isCurrentMonth && (
          <button
            type="button"
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/40 px-3 py-1.5"
            onClick={() => {
              tableBodyRef.current?.querySelector(`[data-date="${today}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            Jump to today
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[70vh] border border-border/50">
          <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border/60 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Fajr</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Sunrise</th>
              <th className="px-6 py-4 text-center font-semibold text-primary">Dhuhr</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Asr</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Maghrib</th>
              <th className="px-6 py-4 text-center font-semibold text-foreground">Isha</th>
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>
            {data.map((prayer, index) => (
              <tr
                key={index}
                data-date={prayer.date}
                className={`border-b border-border/30 transition-colors last:border-b-0 ${
                  isCurrentMonth && prayer.date === today
                    ? 'bg-primary/8 hover:bg-primary/12'
                    : 'hover:bg-secondary/8'
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">
                  <div className="flex items-center gap-3">
                    {isCurrentMonth && prayer.date === today && (
                      <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full" />
                    )}
                    <span>{prayer.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-mono text-foreground text-sm">
                  {formatTimeForDisplay(prayer.fajr)}
                </td>
                <td className="px-6 py-4 text-center font-mono text-foreground text-sm">
                  {formatTimeForDisplay(prayer.sunrise)}
                </td>
                <td className="px-6 py-4 text-center font-mono font-bold text-primary">
                  {formatTimeForDisplay(prayer.luhr)}
                </td>
                <td className="px-6 py-4 text-center font-mono text-foreground text-sm">
                  {formatTimeForDisplay(prayer.asr)}
                </td>
                <td className="px-6 py-4 text-center font-mono text-foreground text-sm">
                  {formatTimeForDisplay(prayer.magrib)}
                </td>
                <td className="px-6 py-4 text-center font-mono text-foreground text-sm">
                  {formatTimeForDisplay(prayer.isha)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 max-h-[70vh] overflow-y-auto pr-1">
        {data.map((prayer) => (
          <div
            key={prayer.date}
            className={`border overflow-hidden transition-colors duration-200 ${
              expandedDates.has(prayer.date)
                ? 'border-primary/30 bg-primary/8'
                : 'border-border/50 bg-card'
            } ${isCurrentMonth && prayer.date === today ? 'ring-1.5 ring-primary/20' : ''}`}
          >
            <button
              onClick={() => toggleExpanded(prayer.date)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-secondary/8 transition-colors"
            >
              <div className="flex items-center gap-4 text-left flex-1">
                <div className="flex items-center gap-3">
                  {isCurrentMonth && prayer.date === today && (
                    <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full shrink-0" />
                  )}
                  <span className="font-semibold text-foreground min-w-fit">Day {prayer.date}</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  {formatTimeForDisplay(prayer.fajr)} — {formatTimeForDisplay(prayer.isha)}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-300 shrink-0 ml-2 ${
                  expandedDates.has(prayer.date) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedDates.has(prayer.date) && (
              <div className="px-5 py-5 bg-background/40 border-t border-border/30 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <PrayerTimeItem label="Fajr" time={prayer.fajr} />
                <PrayerTimeItem label="Sunrise" time={prayer.sunrise} />
                <PrayerTimeItem label="Dhuhr" time={prayer.luhr} highlight />
                <PrayerTimeItem label="Asr" time={prayer.asr} />
                <PrayerTimeItem label="Maghrib" time={prayer.magrib} />
                <PrayerTimeItem label="Isha" time={prayer.isha} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PrayerTimeItem({
  label,
  time,
  highlight = false,
}: {
  label: string;
  time: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-4 text-center transition-colors ${
        highlight
          ? 'bg-primary/12 border border-primary/20 ring-1 ring-primary/10'
          : 'bg-card/50 border border-border/30'
      }`}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
        {label}
      </p>
      <p className={`font-mono font-bold ${highlight ? 'text-primary text-lg' : 'text-foreground text-base'}`}>
        {time}
      </p>
    </div>
  );
}
