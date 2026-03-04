'use client';

import { useEffect, useState } from 'react';
import { Clock, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { parse, differenceInSeconds } from 'date-fns';
import type { PrayerTime } from '@/data/prayerTimes';
import { formatTimeForDisplay } from '@/data/prayerTimes';

interface TodayHighlightProps {
  prayerTimes: PrayerTime;
}

const prayerDetails = [
  { name: 'Fajr', icon: Moon, color: 'from-indigo-600 to-blue-600', time: 'fajr' },
  { name: 'Sunrise', icon: Sunrise, color: 'from-orange-500 to-yellow-500', time: 'sunrise' },
  { name: 'Dhuhr', icon: Sun, color: 'from-yellow-500 to-orange-500', time: 'luhr' },
  { name: 'Asr', icon: Sun, color: 'from-yellow-600 to-orange-600', time: 'asr' },
  { name: 'Maghrib', icon: Sunset, color: 'from-orange-600 to-red-600', time: 'magrib' },
  { name: 'Isha', icon: Moon, color: 'from-slate-700 to-slate-900', time: 'isha' },
];

export default function TodayHighlight({ prayerTimes }: TodayHighlightProps) {
  const [timeUntilNext, setTimeUntilNext] = useState<{ name: string; seconds: number; isTomorrow?: boolean } | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let nextPrayerTime: Date | null = null;
      let nextPrayerName = '';
      let isTomorrow = false;

      for (const detail of prayerDetails) {
        const timeStr = prayerTimes[detail.time as keyof PrayerTime] as string;
        const [h, m] = timeStr.split(':').map((n) => parseInt(n, 10));
        const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), isNaN(h) ? 0 : h, isNaN(m) ? 0 : m);

        if (prayerDate > now) {
          nextPrayerTime = prayerDate;
          nextPrayerName = detail.name;
          break;
        } else {
          setCurrentPrayer(detail.name);
        }
      }

      if (nextPrayerTime) {
        const secondsUntil = differenceInSeconds(nextPrayerTime, now);
        setTimeUntilNext({
          name: nextPrayerName,
          seconds: secondsUntil > 0 ? secondsUntil : 0,
        });
      } else {
        setTimeUntilNext({ name: 'Fajr', seconds: 0, isTomorrow: true });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-stretch">
      {/* Column 1: Today's prayer times */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 ${!timeUntilNext ? 'md:col-span-2' : ''} min-w-0 h-full`}>
        {prayerDetails.map((prayer) => {
          const Icon = prayer.icon;
          const timeStr = prayerTimes[prayer.time as keyof PrayerTime] as string;
          const isCurrentPrayer = currentPrayer === prayer.name;

          return (
            <div
              key={prayer.name}
              className={`border transition-colors duration-200 p-5 md:p-6 ${
                isCurrentPrayer
                  ? 'border-primary/60 bg-primary/5'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                {/* Mobile: [icon] [name] [Now] on one row, time below; sm+: icon + (name + time) + Now */}
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
                  <div className={`p-2 bg-gradient-to-br ${prayer.color} text-white shrink-0`}>
                    <Icon className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider sm:hidden">
                    {prayer.name}
                  </p>
                  {isCurrentPrayer && (
                    <div className="flex items-center gap-1.5 text-primary ml-auto sm:hidden">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}
                  <div className="w-full hidden sm:block min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                      {prayer.name}
                    </p>
                    <p className="text-xl font-bold text-foreground font-mono">
                      {formatTimeForDisplay(timeStr)}
                    </p>
                  </div>
                </div>
                {/* Time on mobile (below icon + name row) */}
                <p className="text-xl font-bold text-foreground font-mono sm:hidden">
                  {formatTimeForDisplay(timeStr)}
                </p>
                {isCurrentPrayer && (
                  <div className="hidden sm:flex items-center gap-1.5 text-primary ml-2 shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs font-semibold">Now</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Column 2: Next prayer in (right side) */}
      {timeUntilNext && (
        <div className="h-full flex flex-col bg-card border border-primary/20 p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">
                {timeUntilNext.isTomorrow ? 'Next prayer' : 'Next prayer in'}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-primary truncate">
                {timeUntilNext.name}
                {timeUntilNext.isTomorrow && (
                  <span className="text-base md:text-lg font-normal text-muted-foreground ml-1.5">(tomorrow)</span>
                )}
              </h2>
            </div>
            <Clock className="w-10 h-10 text-primary/20 shrink-0" />
          </div>
          {!timeUntilNext.isTomorrow && (
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-4 py-6 border border-primary/10">
              <p className="text-center font-mono text-3xl md:text-4xl text-primary font-bold tracking-tight tabular-nums">
                {formatTime(timeUntilNext.seconds)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
