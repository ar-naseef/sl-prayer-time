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
    () => new Set(defaultSelectedSlugs)
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
    () => getCopyTextForRegions(Array.from(selectedSlugs)),
    [getCopyTextForRegions, selectedSlugs]
  );

  const handleCopy = async () => {
    const slugs = Array.from(selectedSlugs);
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
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Copy prayer times for WhatsApp</DialogTitle>
          <DialogDescription>
            Choose which regions to include. Preview updates as you select.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 min-h-0">
          <div className="flex flex-col gap-1 min-h-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Regions
            </span>
            <div className="grid gap-1 overflow-y-auto max-h-[45vh] pr-1">
              {districts.map((d) => (
                <label
                  key={d.value}
                  className="flex items-center gap-3 rounded-md border border-transparent hover:bg-muted/50 px-3 py-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedSlugs.has(d.value)}
                    onCheckedChange={() => toggleSlug(d.value)}
                  />
                  <span className="text-sm">{d.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 min-h-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Generated text
            </span>
            <textarea
              readOnly
              value={previewText || "Select regions to see preview."}
              className="flex-1 min-h-[45vh] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm font-mono whitespace-pre-wrap resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              spellCheck={false}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy to clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
