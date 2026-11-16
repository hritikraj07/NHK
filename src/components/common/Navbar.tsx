'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass, ArrowUpRight, Search, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const CATEGORY_LINKS = [
  { href: '/explore?category=fashion', label: 'Fashion' },
  { href: '/explore?category=tech', label: 'Tech' },
  { href: '/explore?category=home', label: 'Home' },
  { href: '/explore?category=beauty', label: 'Beauty' },
  { href: '/explore?category=essentials', label: 'Essentials' },
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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-nhk-beige'
            : 'bg-[#FAF9F6] border-b border-nhk-beige/60'
        }`}
      >
        {/* Top Micro-Bar for Pinterest Announcement & Editorial Note */}
        <div className="bg-[#EDE8DF] text-[11px] tracking-wider uppercase font-medium text-nhk-charcoal/80 py-1.5 px-3 sm:px-4 text-center border-b border-nhk-grey-border/40 flex items-center justify-center gap-2 sm:gap-3">
          <span className="truncate">Thoughtful Finds for Mindful Living</span>
          <span className="hidden sm:inline text-nhk-grey">•</span>
          <a
            href="https://in.pinterest.com/nhkhritxkk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 hover:text-nhk-accent transition-colors font-semibold flex-shrink-0"
          >
            Follow on Pinterest <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Logo size="md" showTagline />
            </div>

            {/* Desktop Navigation Links (>= md) */}
            <nav className="hidden md:flex items-center gap-8 flex-shrink-0" aria-label="Desktop Navigation">
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

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Desktop / Tablet Search Trigger Button (>= sm) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center w-48 md:w-56 lg:w-64 px-4 py-2 rounded-full border border-nhk-grey-border/80 text-nhk-grey hover:text-nhk-charcoal hover:border-nhk-charcoal bg-white/90 transition-all text-xs shadow-sm"
                aria-label="Open search dialog"
              >
                <Search className="w-3.5 h-3.5 text-nhk-grey mr-2 flex-shrink-0" />
                <span className="truncate text-nhk-grey/90">Search products...</span>
              </button>

              {/* Mobile Quick Search Button (< sm) */}
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden w-10 h-10 rounded-full border border-nhk-grey-border/80 bg-white/90 hover:bg-nhk-beige text-nhk-charcoal flex items-center justify-center transition-all shadow-sm"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-nhk-charcoal" />
              </button>

              {/* Pinterest Profile Direct Button */}
              <a
                href="https://in.pinterest.com/nhkhritxkk/"
                target="_blank"
                rel="noopener noreferrer"
                title="NHK on Pinterest"
                className="w-10 h-10 rounded-full border border-nhk-grey-border bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
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

              {/* Mobile Menu Hamburger Button (< md) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full border border-nhk-grey-border/70 bg-white/80 hover:bg-nhk-beige active:scale-95 text-nhk-charcoal flex items-center justify-center transition-all shadow-sm"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop Overlay (< md) */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 top-[88px] sm:top-[104px] bg-nhk-charcoal/40 backdrop-blur-sm z-30 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Slide-Down Drawer (< md) */}
        {mobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 max-h-[calc(100vh-5.5rem)] overflow-y-auto bg-[#FAF9F6] border-b border-nhk-beige shadow-xl px-5 py-6 space-y-6 z-40 animate-in slide-in-from-top-2 duration-200"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            {/* Search Trigger Inside Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-nhk-grey-border/80 bg-white text-nhk-grey hover:text-nhk-charcoal text-sm shadow-sm transition-all"
            >
              <Search className="w-4 h-4 text-nhk-accent" />
              <span className="truncate">Search products, collections, tags...</span>
            </button>

            {/* Primary Nav Links */}
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between min-h-[48px] px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-nhk-beige text-nhk-charcoal font-semibold'
                        : 'text-nhk-charcoal hover:bg-nhk-beige/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-nhk-grey/60" />
                  </Link>
                );
              })}
            </nav>

            {/* Category Quick Links */}
            <div className="pt-2 border-t border-nhk-beige space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nhk-accent block px-2">
                Quick Departments
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_LINKS.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs px-3.5 py-2 rounded-full bg-white border border-nhk-grey-border/80 text-nhk-charcoal hover:bg-nhk-charcoal hover:text-white transition-all shadow-sm"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-nhk-beige flex flex-col gap-3">
              <Link
                href="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[48px] py-3.5 rounded-full bg-nhk-charcoal text-white text-center text-sm font-semibold hover:bg-nhk-accent transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4" /> Start Exploring
              </Link>
              <a
                href="https://in.pinterest.com/nhkhritxkk/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3 rounded-full bg-white border border-nhk-grey-border text-center text-xs font-semibold text-nhk-charcoal hover:bg-nhk-beige transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Image
                  src="/pinterest-logo.png"
                  alt="Pinterest"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
                <span>Follow NHK on Pinterest</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}