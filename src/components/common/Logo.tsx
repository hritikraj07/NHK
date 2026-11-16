import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showTagline = false }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl tracking-[0.2em]',
    md: 'text-2xl tracking-[0.25em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.3em]',
  };

  return (
    <Link
      href="/"
      className={`inline-flex flex-col group select-none ${className}`}
      aria-label="NHK Homepage"
    >
      <div className="flex items-baseline gap-1">
        <span
          className={`font-serif font-bold text-nhk-charcoal uppercase transition-colors group-hover:text-nhk-accent ${sizeClasses[size]}`}
          style={{ letterSpacing: '0.22em' }}
        >
          NHK
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-nhk-accent inline-block self-baseline transition-transform group-hover:scale-125" />
      </div>
      {showTagline && (
        <span className="text-[10px] tracking-[0.25em] uppercase text-nhk-grey font-medium -mt-1 font-sans">
          Products Worth Loving
        </span>
      )}
    </Link>
  );
}
