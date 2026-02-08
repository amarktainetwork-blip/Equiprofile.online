import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imagePosition?: "center" | "top" | "bottom";
  minHeight?: string;
  overlay?: boolean;
}

/**
 * PageBanner Component
 * 
 * A reusable banner component for marketing pages.
 * Features:
 * - Responsive design with proper image scaling
 * - Customizable min-height (default ~280-360px desktop)
 * - Object-fit cover with configurable positioning
 * - Optional gradient overlay for better text readability
 * - Animated entrance
 */
export function PageBanner({
  title,
  subtitle,
  imageSrc,
  imagePosition = "center",
  minHeight = "min-h-[280px] md:min-h-[360px]",
  overlay = true,
}: PageBannerProps) {
  const objectPosition = {
    center: "object-center",
    top: "object-top",
    bottom: "object-bottom",
  }[imagePosition];

  return (
    <div className={`relative ${minHeight} overflow-hidden`}>
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover ${objectPosition}`}
      />

      {/* Gradient Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
