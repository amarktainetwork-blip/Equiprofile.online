import { Link } from "wouter";
import { useState, useEffect } from "react";

export function Footer() {
  const [buildInfo, setBuildInfo] = useState<{
    sha?: string;
    time?: string;
    version?: string;
  } | null>(null);

  useEffect(() => {
    // Try to fetch build info from /build.txt
    fetch("/build.txt")
      .then((res) => res.text())
      .then((text) => {
        const info: Record<string, string> = {};
        text.split("\n").forEach((line) => {
          const [key, value] = line.split("=");
          if (key && value) {
            info[key.trim()] = value.trim();
          }
        });
        setBuildInfo({
          sha: info.BUILD_SHA,
          time: info.BUILD_TIME,
          version: info.VERSION,
        });
      })
      .catch(() => {
        // Fallback to reading from meta tag
        const metaTag = document.querySelector('meta[name="x-build-sha"]');
        if (metaTag) {
          setBuildInfo({ sha: metaTag.getAttribute("content") || undefined });
        }
      });
  }, []);

  return (
    <footer className="py-12 lg:py-16 border-t bg-card">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold font-serif mb-4">
              <span className="text-gradient">EquiProfile</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional horse management for the modern equestrian.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features">
                  <a className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a className="hover:text-foreground transition-colors">
                    Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about">
                  <a className="hover:text-foreground transition-colors">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy">
                  <a className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2026 EquiProfile — Part of Amarktai Network. All rights reserved.
          </p>
          {buildInfo && (
            <p className="mt-2 text-xs opacity-70">
              {buildInfo.version && `v${buildInfo.version}`}
              {buildInfo.sha && ` • Build ${buildInfo.sha}`}
              {buildInfo.time &&
                ` • ${new Date(buildInfo.time).toLocaleDateString()}`}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
