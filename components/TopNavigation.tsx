'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface TopNavigationProps {
  searchableContent?: any[];
}

export default function TopNavigation({ searchableContent = [] }: TopNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomepage = pathname === '/';

  const handleSearch = () => {
    if (isHomepage) {
      const searchInput = document.getElementById('main-search-input');
      searchInput?.focus();
    } else {
      router.push('/');
    }
  };

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  const navItems = [
    { href: '/coe-hub', label: 'CoE Hub' },
    { href: '/content-hub', label: 'Content Hub' },
    { href: '/enablement-hub', label: 'Enablement Hub' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Home Link */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity no-underline"
          >
            {/* Gladly green plus icon */}
            <div className="w-9 h-9 bg-[#009B00] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">GTM Hub</span>
          </Link>

          {/* Center Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-lg text-base font-semibold transition-all no-underline ${
                  isActive(item.href)
                    ? 'bg-white/15 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Search */}
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all cursor-pointer border-none"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <kbd className="px-1.5 py-0.5 bg-white/20 text-white/70 text-xs rounded hidden sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </nav>
  );
}
