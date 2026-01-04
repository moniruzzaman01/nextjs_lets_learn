import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built using{" "}
            <a
              href="https://ui.shadcn.com/"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Created By{" "}
            <a
              href="https://github.com/moniruzzaman01"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Moniruzzaman
            </a>
            . All right reserved to Let's Learn community.
          </p>
        </div>
      </div>
    </footer>
  );
}
