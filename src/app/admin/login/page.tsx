'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle, KeyRound, Shield } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the admin password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Also save client token in sessionStorage for client side guards
        sessionStorage.setItem('nhk_admin_logged_in', 'true');
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Connection failure. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#FAF9F6]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-nhk-grey-border shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" showTagline />
          <div className="pt-4 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-nhk-accent">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Curation Desk</span>
          </div>
          <p className="text-xs text-nhk-grey">
            Enter your management password to add, modify, or manage affiliate products.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-nhk-grey absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-sm text-nhk-charcoal placeholder-nhk-grey focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Verifying...</span> : <span>Enter Dashboard</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Local Demo Credentials Helper */}
        <div className="pt-4 border-t border-nhk-beige text-center">
          <div className="inline-flex items-center gap-1 text-[11px] text-nhk-grey bg-nhk-beige/60 px-3 py-1.5 rounded-full border border-nhk-grey-border/60">
            <Shield className="w-3 h-3 text-nhk-accent" />
            <span>
              Default demo password: <code className="font-bold text-nhk-charcoal">nhk2026</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
