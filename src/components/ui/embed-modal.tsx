"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type EmbedModalProps = {
  embedSrc?: string;
  title?: string;
  /**
   * Storage key for persisting dismissal state.
   * When using storage="session" it will show once per browser session.
   */
  storageKey?: string;
  /**
   * Where to persist the dismissal:
   * - 'session': show again when the user returns (new tab/window or after closing the browser)
   * - 'local': hide across future visits until storage is cleared
   * - 'none': never persist; always show on mount
   */
  storage?: "session" | "local" | "none";
  autoOpenOnFirstVisit?: boolean;
};

export default function EmbedModal({
  embedSrc = "https://www.canva.com/design/DAG2FTqGdKY/xOlv9vISov3eJ1rzZAi7CQ/view?embed",
  title = "Featured Presentation",
  storageKey = "gree:hasSeenCanvaEmbed",
  storage = "session",
  autoOpenOnFirstVisit = true,
}: EmbedModalProps) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Open only on first visit
  useEffect(() => {
    if (!autoOpenOnFirstVisit) return;
    try {
      if (typeof window === "undefined") return;
      if (storage === "none") {
        setOpen(true);
        return;
      }
      const store =
        storage === "session" ? window.sessionStorage : window.localStorage;
      const seen = store.getItem(storageKey);
      if (!seen) setOpen(true);
    } catch {}
  }, [autoOpenOnFirstVisit, storageKey, storage]);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close handlers
  const handleClose = useCallback(() => {
    setOpen(false);
    try {
      if (typeof window === "undefined") return;
      if (storage === "none") return; // don't persist
      const store =
        storage === "session" ? window.sessionStorage : window.localStorage;
      store.setItem(storageKey, "1");
    } catch {}
  }, [storageKey, storage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Click outside to close
  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
      className="fixed inset-0 z-[100]  grid place-items-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div className="relative scale-90 w-[min(100%-2rem,1000px)] rounded-2xl border border-border bg-background text-foreground shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border">
          <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
          <button
            aria-label="Close"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content: Responsive embed wrapper */}
        <div className="p-3 sm:p-4">
          {/* Responsive ratio: keep previous mobile ratio, tighter on desktop */}
          <div className="relative w-full pt-[70.7071%] md:pt-[50%] rounded-xl overflow-hidden shadow-sm bg-secondary/30">
            <iframe
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0 transition-transform duration-300 ease-out md:scale-[1.05] md:origin-center"
              style={{ transform: undefined }}
              src={embedSrc}
              allowFullScreen
              allow="fullscreen"
            />
          </div>

          <p className="mt-3 text-xs text-muted-foreground text-center">
            Powered by Gree Software Company
          </p>
        </div>
      </div>
    </div>
  );
}
