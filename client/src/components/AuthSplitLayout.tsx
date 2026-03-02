import { ReactNode } from "react";
import { marketingAssets } from "@/config/marketingAssets";

interface AuthSplitLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

/**
 * Auth Split Layout Component
 *
 * Full-screen dark background with hero image and glass form overlay.
 * Matches the dark site styling of the marketing pages.
 *
 * Desktop: Hero image fills the right half; form on a dark-glass left panel.
 * Mobile: Full-screen background image with dark overlay for the form.
 */
export function AuthSplitLayout({
  children,
  imageUrl = marketingAssets.hero.heroHorse,
}: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen w-full flex overflow-hidden pt-[72px]">
      {/* Left side – dark form panel */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative bg-black">
        {/* Mobile: show hero image as background */}
        <div className="md:hidden absolute inset-0 z-0">
          <img
            src={imageUrl}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        </div>

        {/* Form content */}
        <div className="w-full max-w-md relative z-10 my-auto max-h-[calc(100vh-72px-2rem)] overflow-y-auto">
          {children}
        </div>
      </div>

      {/* Right side – image panel (desktop only) */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <img
          src={imageUrl}
          alt="EquiProfile"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-cyan-600/20" />

        {/* Branding overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold font-serif mb-2">EquiProfile</h2>
            <p className="text-white/80 text-lg">
              Professional horse management made simple
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
