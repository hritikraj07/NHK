import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#FAF9F6]">
      <div className="max-w-md w-full text-center space-y-6">
        <Logo size="md" showTagline />

        <div className="space-y-2 pt-4">
          <span className="text-xs uppercase font-bold tracking-widest text-nhk-accent">
            Error 404
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-nhk-charcoal">
            Page Not Found
          </h1>
          <p className="text-sm text-nhk-grey leading-relaxed">
            The curated object or collection you are seeking may have been archived or moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-nhk-charcoal text-white text-xs font-semibold uppercase tracking-wider hover:bg-nhk-accent transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/explore"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-nhk-grey-border text-nhk-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-nhk-beige transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-nhk-accent" />
            <span>Browse All Finds</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
