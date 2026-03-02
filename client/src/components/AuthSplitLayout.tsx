import { ReactNode } from "react";
import { marketingAssets } from "@/config/marketingAssets";

interface AuthSplitLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

/**
 * Auth Split Layout Component
 *
 * Full-screen dark background with video background and glass form overlay.
 * Matches the landing page hero video style.
 *
 * Desktop & Mobile: Video fills the background; form centered over a dark overlay.
 */
export function AuthSplitLayout({
  children,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-[72px]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={marketingAssets.auth.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Form content */}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        {children}
      </div>
    </div>
  );
}
