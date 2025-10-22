"use client";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const links = {
  telegram: "https://t.me/students_dev_hub",
  youtube: "https://www.youtube.com/@greesoftwareacademy",
};

export default function ResourcesModal({ open, onOpenChange }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-secondary rounded-lg max-w-lg w-full">
        <div className="border-b py-4 px-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Resources</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-6 grid gap-4">
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Telegram Community</p>
                <p className="text-sm text-muted-foreground">
                  Join our student dev hub
                </p>
              </div>
              <span className="text-primary font-semibold">Open</span>
            </div>
          </a>

          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">YouTube Channel</p>
                <p className="text-sm text-muted-foreground">
                  Watch lessons and resources
                </p>
              </div>
              <span className="text-primary font-semibold">Open</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
