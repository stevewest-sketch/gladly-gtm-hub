'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function GlobalSearchButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isHomepage = pathname === '/';

  const handleSearch = () => {
    if (isHomepage) {
      // Already on homepage, focus the search input
      const searchInput = document.getElementById('main-search-input');
      searchInput?.focus();
    } else {
      // Navigate to homepage
      router.push('/');
    }
  };

  // Keyboard shortcut - Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  // Hide on homepage since search is already visible
  if (isHomepage) return null;

  return (
    <button
      onClick={handleSearch}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-2 px-4 py-3 rounded-full
        bg-gradient-to-r from-gray-800 to-gray-900 text-white
        shadow-lg hover:shadow-xl transition-all duration-300
        ${isHovered ? 'pr-6' : ''}
      `}
    >
      <span className="text-xl">🔍</span>
      <span className={`
        font-medium overflow-hidden transition-all duration-300 whitespace-nowrap
        ${isHovered ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}
      `}>
        Search
      </span>
      <kbd className={`
        px-1.5 py-0.5 bg-white/20 rounded text-xs transition-all duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        {'\u2318'}K
      </kbd>
    </button>
  );
}
