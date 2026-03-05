/**
 * Shared Navbar component
 *
 * Single source of truth for the top navigation bar used on:
 *   - Landing page (/)
 *   - Login page (/login)
 *   - Register page (/register)
 *   - All other marketing / public pages
 *
 * This file re-exports MarketingNav so that any page can simply
 * `import Navbar from "@/components/Navbar"` and get consistent
 * navigation across the entire public-facing site.
 */
export { MarketingNav as default, MarketingNav as Navbar } from "./MarketingNav";
