'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface PinterestPinButtonProps {
  url: string;
  media: string;
  description: string;
  className?: string;
  variant?: 'badge' | 'icon' | 'solid';
  label?: string;
}

export function PinterestPinButton({
  url,
  media,
  description,
  className = '',
  variant = 'badge',
  label = 'Save Pin',
}: PinterestPinButtonProps) {
  const [copied, setCopied] = useState(false);

  // Full URL resolution if relative
  const fullUrl =
    typeof window !== 'undefined' && url.startsWith('/')
      ? `${window.location.origin}${url}`
      : url;

  const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    fullUrl
  )}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(description)}`;

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(pinUrl, '_blank', 'width=750,height=600,toolbar=no,menubar=no');
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleShareClick}
        aria-label="Save to Pinterest"
        title="Save to Pinterest"
        className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-red-600 hover:bg-white hover:scale-110 transition-all flex items-center justify-center ${className}`}
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
        </svg>
      </button>
    );
  }

  if (variant === 'solid') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={handleShareClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E60023] hover:bg-[#ad081b] text-white text-xs tracking-wider uppercase font-semibold shadow-sm transition-all hover:shadow"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
          </svg>
          {label}
        </button>
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          className="p-2.5 rounded-full border border-nhk-grey-border bg-white text-nhk-charcoal hover:bg-nhk-beige transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // Default 'badge'
  return (
    <button
      onClick={handleShareClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-nhk-charcoal hover:text-red-600 shadow-sm text-xs font-medium backdrop-blur-sm transition-all hover:scale-105 ${className}`}
    >
      <svg className="w-3 h-3 fill-red-600" viewBox="0 0 24 24">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
      </svg>
      <span>Pin</span>
    </button>
  );
}
