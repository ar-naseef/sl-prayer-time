import { Copy, Github } from "lucide-react";
import Link from "next/link";
import { getDistrictPathSegments, slugToDistrictDisplayName } from "@/lib/regions";

const LOGO_URL = "https://www.94dev.com/img/94DEV-dark.png";

interface FooterProps {
  onCopyClick?: () => void;
  copyEnabled?: boolean;
}

export default function Footer({ onCopyClick, copyEnabled }: FooterProps) {
  const districtSegments = getDistrictPathSegments().filter(
    (segment) => segment !== "sri-lanka",
  );

  return (
    <footer className="mt-auto border-t border-border bg-background/60">
      <div className="container mx-auto px-4 py-8 md:py-10 max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Powered by
              </span>
              <Link
                href="https://94dev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                aria-label="94dev"
              >
                <img src={LOGO_URL} alt="94dev" className="h-6 w-auto" />
              </Link>
            </div>
            <div className="inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Sri Lanka Prayer Times</span>
              {copyEnabled && onCopyClick && (
                <button
                  type="button"
                  onClick={onCopyClick}
                  className="cursor-pointer inline-flex items-center justify-center rounded-full p-1 opacity-35 hover:opacity-70 transition-opacity text-muted-foreground hover:text-foreground"
                  aria-label="Copy prayer times for WhatsApp"
                  title="Copy prayer times for WhatsApp"
                >
                  <Copy className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground md:justify-start">
              <Link
                href="https://www.acju.lk/prayer-times/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-foreground hover:underline"
              >
                Source: ACJU Prayer Times
              </Link>
              <Link
                href="https://github.com/ar-naseef/sl-prayer-time"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline-offset-2 hover:text-foreground hover:underline"
              >
                <Github className="w-3 h-3" aria-hidden />
                <span>Contribute on GitHub</span>
              </Link>
              <Link
                href="/faq"
                className="underline-offset-2 hover:text-foreground hover:underline"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="mt-2 w-full border-t border-border/60 pt-4 md:mt-0 md:w-1/2 md:border-t-0 md:pt-0">
            <p className="mb-2 text-xs md:text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              District prayer time pages
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-1.5 text-xs md:text-sm text-muted-foreground text-left">
              {districtSegments.map((segment) => {
                const label = `${slugToDistrictDisplayName(segment)}`;
                return (
                  <Link
                    key={segment}
                    href={`/${segment}-prayer-times`}
                    className="underline-offset-2 hover:text-foreground hover:underline whitespace-nowrap"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
