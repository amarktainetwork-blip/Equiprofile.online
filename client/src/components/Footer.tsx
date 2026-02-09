import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 border-t border-gray-200 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                EquiProfile
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Professional horse management for the modern equestrian.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/features">
                  <a className="hover:text-gray-900 transition-colors">Features</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="hover:text-gray-900 transition-colors">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <a className="hover:text-gray-900 transition-colors">
                    Dashboard
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about">
                  <a className="hover:text-gray-900 transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-gray-900 transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy">
                  <a className="hover:text-gray-900 transition-colors">Privacy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="hover:text-gray-900 transition-colors">Terms</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} EquiProfile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
