import { ReactNode } from "react";
import { marketingAssets } from "@/config/marketingAssets";

interface AuthSplitLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

/**
 * Auth Split Layout Component
 *
 * Desktop (md+): 50/50 split — left panel plays the auth video, right panel
 * is a solid dark scrollable panel that never overflows the viewport.
 *
 * Mobile: Video fills the full background. The panel itself is transparent so
 * the video remains visible all around. Only the Card (form block) carries the
 * glass-morphism effect via its own backdrop-blur / bg classes.
 */
export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full pt-[72px] relative md:flex">
      {/* Video panel — absolute full-bg on mobile, left 50% on desktop */}
      <div className="absolute inset-0 md:relative md:inset-auto md:w-1/2 md:flex-shrink-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={marketingAssets.auth.video} type="video/mp4" />
        </video>
        {/* Mobile: very light scrim so the card stands out against the video */}
        <div className="absolute inset-0 bg-black/30 md:hidden" />
      </div>

      {/* Form panel
          Mobile:  transparent — glass effect lives on the Card itself so the
                   video shows through everywhere around the input block
          Desktop: solid dark right half; overflow-y-auto so tall forms scroll
                   instead of overflowing the viewport */}
      <div
        className={[
          // base — centres the card, transparent on mobile
          "relative z-10 w-full flex items-center justify-center px-4 py-8",
          "min-h-[calc(100vh-72px)]",
          // desktop overrides
          "md:w-1/2 md:min-h-0 md:bg-gray-950 md:overflow-y-auto md:border-l md:border-white/5",
        ].join(" ")}
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
