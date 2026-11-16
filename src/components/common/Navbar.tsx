'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-sm border-b border-nhk-beige'
            : 'bg-[#FAF9F6] border-b border-nhk-beige/60'
        }`}
      >
        {/* Top Micro-Bar for Pinterest Announcement & Editorial Note */}
        <div className="bg-[#EDE8DF] text-[11px] tracking-wider uppercase font-medium text-nhk-charcoal/80 py-1.5 px-4 text-center border-b border-nhk-grey-border/40 flex items-center justify-center gap-3">
          <span>Thoughtful Finds for Mindful Living</span>
          <span className="hidden sm:inline text-nhk-grey">•</span>
          <a
            href="https://in.pinterest.com/nhkhritxkk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 hover:text-nhk-accent transition-colors font-semibold"
          >
            Follow on Pinterest <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Logo size="md" showTagline />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 flex-shrink-0">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? 'text-nhk-charcoal font-semibold'
                        : 'text-nhk-grey hover:text-nhk-charcoal'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-nhk-charcoal rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 md:flex-initial justify-end">
              {/* Search Trigger (no icon, no command K, clean input style) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center w-full sm:w-56 md:w-64 lg:w-72 px-4 py-2 rounded-full border border-nhk-grey-border/80 text-nhk-grey hover:text-nhk-charcoal hover:border-nhk-charcoal bg-white/80 transition-all text-xs shadow-sm"
                aria-label="Open search dialog"
              >
                <span className="truncate text-nhk-grey/90">Search products, collections...</span>
              </button>

              {/* Pinterest Profile Direct Button */}
              <a
                href="https://in.pinterest.com/nhkhritxkk/"
                target="_blank"
                rel="noopener noreferrer"
                title="NHK on Pinterest"
                className="w-9 h-9 rounded-full border border-nhk-grey-border bg-white hover:scale-105 transition-all flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
                aria-label="Follow NHK on Pinterest"
              >
                <Image
                  src="/pinterest-logo.png"
                  alt="Pinterest"
                  width={24}
                  height={24}
                  className="rounded-full object-contain"
                />
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-nhk-charcoal hover:bg-nhk-beige transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-nhk-beige bg-[#FAF9F6] px-6 py-6 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-colors py-2 border-b border-nhk-beige/50 ${
                      isActive
                        ? 'text-nhk-charcoal font-semibold'
                        : 'text-nhk-grey hover:text-nhk-charcoal'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 flex flex-col gap-3">
                <Link
                  href="/explore"
                  className="w-full py-3 rounded-full bg-nhk-charcoal text-white text-center text-sm font-medium hover:bg-nhk-charcoal-dark flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" /> Start Exploring
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
