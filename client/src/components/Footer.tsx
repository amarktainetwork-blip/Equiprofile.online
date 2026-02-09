import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 border-t border-white/10 bg-black">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                EquiProfile
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional horse management for the modern equestrian.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/features">
                  <a className="hover:text-white transition-colors">Features</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="hover:text-white transition-colors">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a className="hover:text-white transition-colors">
                    Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about">
                  <a className="hover:text-white transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy">
                  <a className="hover:text-white transition-colors">Privacy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="hover:text-white transition-colors">Terms</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} EquiProfile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
