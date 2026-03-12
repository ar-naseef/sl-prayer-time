import { Copy, Github } from "lucide-react";
import Link from "next/link";

const LOGO_URL = "https://www.94dev.com/img/94DEV-dark.png";

interface FooterProps {
  onCopyClick?: () => void;
  copyEnabled?: boolean;
}

export default function Footer({ onCopyClick, copyEnabled }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-background/50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <Link
            href="https://94dev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            aria-label="94dev"
          >
            <span className="text-sm">Powered by</span>
            <img src={LOGO_URL} alt="94dev" className="h-6 w-auto" />
          </Link>
          <div className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
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
          <div className="flex  items-center gap-1 text-xs text-muted-foreground">
            <Link
              href="https://www.acju.lk/prayer-times/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Source: ACJU Prayer Times
            </Link>
            <span>|</span>
            <Link
              href="https://github.com/ar-naseef/sl-prayer-time"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 hover:text-foreground hover:underline"
            >
              <Github className="w-3 h-3" aria-hidden />
              <span>Contribute on GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
