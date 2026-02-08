import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Hook that scrolls to the top of the page whenever the route changes
 * This ensures users start at the top of each new page
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
}
