'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle, ArrowRight } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'You have been added to our private dispatch.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="py-20 bg-white border-t border-nhk-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#EDE8DF]/60 border border-nhk-grey-border p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-nhk-accent/5 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-nhk-charcoal text-xs font-semibold tracking-wider uppercase shadow-sm">
            <Mail className="w-3.5 h-3.5 text-nhk-accent" />
            <span>Weekly Dispatches</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-nhk-charcoal tracking-tight">
            Get the Best Finds Delivered.
          </h2>

          <p className="text-sm sm:text-base text-nhk-grey max-w-xl mx-auto leading-relaxed">
            Join over 24,000 design lovers. Every Sunday, we send one concise email with our top five verified product discoveries, hidden gems, and price drops. No spam, ever.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-5 py-3.5 rounded-full bg-white border border-nhk-grey-border text-nhk-charcoal placeholder-nhk-grey text-sm focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all shadow-sm"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white font-medium text-sm transition-all shadow-sm whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </form>

          <p className="text-[11px] text-nhk-grey">
            By subscribing you agree to our{' '}
            <a href="/privacy" className="underline hover:text-nhk-charcoal">
              Privacy Policy
            </a>
            . Unsubscribe at any time with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
