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
 * hosts the form on a solid dark background.
 *
 * Mobile: Video fills the full background; the form panel uses glass-morphism
 * (frosted glass) so it reads clearly over the video.
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
        {/* Mobile: darken video so the glass form panel reads clearly */}
        <div className="absolute inset-0 bg-black/50 md:hidden" />
      </div>

      {/* Form panel
          Mobile:  glass-morphism overlay over the video (backdrop-blur + translucent bg),
                   full-height so the form centres over the video
          Desktop: solid dark right-half panel, no blur needed */}
      <div
        className={[
          // base
          "relative z-10 w-full flex items-center justify-center px-4 py-8",
          // mobile: full-height glass panel over the video
          "min-h-[calc(100vh-72px)] bg-white/10 backdrop-blur-md border-t border-white/10",
          // desktop: solid dark right half, drop the blur
          "md:min-h-0 md:w-1/2 md:bg-gray-950 md:backdrop-blur-none md:border-t-0 md:border-l md:border-white/5",
        ].join(" ")}
      >
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
