"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const DEFAULT_SELECTED_SLUGS = [
  "colombo-gampaha-kalutara",
  "ratnapura-kegalle",
  "kandy-matale-nuwara-eliya",
  "badulla-monaragala",
  "anuradhapura-polonnaruwa",
  "kurunegala",
];

const ORDERED_COPY_REGION_SLUGS = [
  "colombo-gampaha-kalutara",
  "ratnapura-kegalle",
  "kandy-matale-nuwara-eliya",
  "badulla-monaragala",
  "anuradhapura-polonnaruwa",
  "kurunegala",
];

const COPY_REGION_LABEL_OVERRIDES: Record<string, string> = {
  "colombo-gampaha-kalutara": "Colombo, Gampaha, Kalutara",
  "ratnapura-kegalle": "Kegalle, Ratnapura",
  "kandy-matale-nuwara-eliya": "Kandy, Matale, Nuwara Eliya",
  "badulla-monaragala": "Badulla, Monaragala",
  "anuradhapura-polonnaruwa": "Anuradhapura, Polonnaruwa",
  kurunegala: "Kurunegala",
};

interface CopyPrayerTimesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  districts: { value: string; label: string }[];
  getCopyTextForRegions: (selectedSlugs: string[]) => string;
  defaultSelectedSlugs?: string[];
}

export default function CopyPrayerTimesModal({
  open,
  onOpenChange,
  districts,
  getCopyTextForRegions,
  defaultSelectedSlugs = DEFAULT_SELECTED_SLUGS,
}: CopyPrayerTimesModalProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(
    () => new Set(defaultSelectedSlugs),
  );
  const regionOrder = useMemo(
    () =>
      new Map(
        ORDERED_COPY_REGION_SLUGS.map((slug, idx) => [slug, idx] as const),
      ),
    [],
  );
  const orderedDistricts = useMemo(
    () =>
      districts
        .map((district, idx) => ({ district, idx }))
        .sort((a, b) => {
          const aOrder =
            regionOrder.get(a.district.value) ?? Number.MAX_SAFE_INTEGER;
          const bOrder =
            regionOrder.get(b.district.value) ?? Number.MAX_SAFE_INTEGER;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return a.idx - b.idx;
        })
        .map(({ district }) => district),
    [districts, regionOrder],
  );
  const orderedSelectedSlugs = useMemo(
    () =>
      orderedDistricts
        .filter((d) => selectedSlugs.has(d.value))
        .map((d) => d.value),
    [orderedDistricts, selectedSlugs],
  );

  useEffect(() => {
    if (open) {
      setSelectedSlugs(new Set(defaultSelectedSlugs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when modal opens
  }, [open]);

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const previewText = useMemo(
    () => getCopyTextForRegions(orderedSelectedSlugs),
    [getCopyTextForRegions, orderedSelectedSlugs],
  );

  const handleCopy = async () => {
    const slugs = orderedSelectedSlugs;
    if (slugs.length === 0) {
      toast.error("Select at least one region");
      return;
    }
    const text = getCopyTextForRegions(slugs);
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard for WhatsApp");
      onOpenChange(false);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] p-4 sm:max-w-4xl sm:p-6">
        <div className="flex max-h-[calc(100dvh-6rem)] flex-col gap-4 overflow-hidden">
          <DialogHeader className="shrink-0">
            <DialogTitle>Copy prayer times for WhatsApp</DialogTitle>
            <DialogDescription>
              Choose which regions to include. Preview updates as you select.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2">
              <div className="flex flex-col gap-1 min-h-0">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Regions
                </span>
                <div className="grid max-h-[40vh] gap-1 overflow-y-auto pr-1 md:max-h-[45vh]">
                  {orderedDistricts.map((d) => (
                    <label
                      key={d.value}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-transparent px-3 py-2 hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={selectedSlugs.has(d.value)}
                        onCheckedChange={() => toggleSlug(d.value)}
                      />
                      <span className="text-sm">
                        {COPY_REGION_LABEL_OVERRIDES[d.value] ?? d.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex min-h-0 flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Generated text
                </span>
                <textarea
                  readOnly
                  value={previewText || "Select regions to see preview."}
                  className="min-h-[40vh] w-full resize-none rounded-md border border-input bg-muted/30 px-3 py-2 font-mono text-sm whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-ring md:min-h-[45vh]"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to clipboard
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
