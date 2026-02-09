import { ReactNode } from "react";
import { marketingAssets } from "@/config/marketingAssets";

interface AuthSplitLayoutProps {
  children: ReactNode;
  imageUrl?: string;
}

/**
 * Auth Split Layout Component
 *
 * Desktop: 50/50 split screen (LEFT: form, RIGHT: image panel)
 * Mobile: Full-screen background image with glass overlay for form
 *
 * Requirements:
 * - No scrolling on desktop; entire page fits one screen (100vh)
 * - Form vertically centered
 * - Mobile uses same image as background with black transparent overlay
 */
export function AuthSplitLayout({
  children,
  imageUrl = marketingAssets.hero.heroHorse,
}: AuthSplitLayoutProps) {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Desktop: Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-y-auto">
        {/* Mobile background image with overlay */}
        <div className="md:hidden fixed inset-0 z-0">
          <img
            src={imageUrl}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        </div>

        {/* Form content */}
        <div className="w-full max-w-md relative z-10 my-auto">{children}</div>
      </div>

      {/* Desktop: Right side - Image panel (hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <img
          src={imageUrl}
          alt="EquiProfile"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for branding */}
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
