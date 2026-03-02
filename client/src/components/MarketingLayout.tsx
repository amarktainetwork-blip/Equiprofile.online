import { ReactNode } from "react";
import { MarketingNav } from "./MarketingNav";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

interface MarketingLayoutProps {
  children: ReactNode;
}

/**
 * Shared layout for all marketing/public pages.
 * Provides the consistent MarketingNav + dark background + Footer wrapper
 * that matches the landing page styling.
 */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <MarketingNav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
