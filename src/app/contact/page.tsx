'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setStatusMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          subject: 'General Question',
          message: '',
        });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Network error occurred. Please try again later.');
    }
  };

  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nhk-beige text-nhk-charcoal text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-nhk-accent" />
            <span>Connect with NHK</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-nhk-charcoal">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-nhk-grey leading-relaxed">
            Have a question about a product recommendation, an idea for our review desk, or brand inquiry? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-nhk-grey-border shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Helena Vance"
                  className="w-full px-4 py-3 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-sm text-nhk-charcoal placeholder-nhk-grey focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-sm text-nhk-charcoal placeholder-nhk-grey focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-2">
                  Topic / Inquiries
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-sm text-nhk-charcoal focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all cursor-pointer"
                >
                  <option value="General Question">General Question</option>
                  <option value="Product Submission">Product Submission for Review</option>
                  <option value="Affiliate / Brand Partnership">Affiliate / Brand Partnership</option>
                  <option value="Editorial Correction">Editorial Correction / Price Update</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your thoughts, suggestions, or link..."
                  className="w-full px-4 py-3 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-sm text-nhk-charcoal placeholder-nhk-grey focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all resize-y"
                  required
                />
              </div>

              {/* Status Alert */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message Received</p>
                    <p className="mt-0.5 text-xs text-emerald-700">{statusMessage}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Submission Issue</p>
                    <p className="mt-0.5 text-xs text-red-600">{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-8 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Direct Channels & FAQ (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-nhk-grey-border shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-nhk-charcoal">
                Direct Channels
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="text-xs uppercase font-bold text-nhk-accent block mb-1">
                    Contact Email
                  </span>
                  <a
                    href="mailto:nhkhritxkk@gmail.com"
                    className="text-nhk-charcoal font-medium hover:underline text-base"
                  >
                    nhkhritxkk@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-nhk-accent block mb-2">
                    Social Discovery
                  </span>
                  <a
                    href="https://in.pinterest.com/nhkhritxkk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-nhk-grey-border text-xs font-semibold text-nhk-charcoal hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                  >
                    <Image
                      src="/pinterest-logo.png"
                      alt="Pinterest"
                      width={20}
                      height={20}
                      className="rounded-full object-contain"
                    />
                    <span>Follow @nhkhritxkk on Pinterest</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick FAQ Box */}
            <div className="bg-[#EDE8DF]/50 rounded-3xl p-8 border border-nhk-beige space-y-4">
              <h4 className="font-serif text-lg font-bold text-nhk-charcoal">
                Common Inquiries
              </h4>
              <div className="space-y-3 text-xs leading-relaxed text-nhk-charcoal/90">
                <div>
                  <p className="font-semibold text-nhk-charcoal">Can I pay for a review?</p>
                  <p className="text-nhk-grey mt-0.5">
                    No. We maintain strict editorial independence. Products are evaluated strictly on their merits.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-nhk-charcoal">How often are prices updated?</p>
                  <p className="text-nhk-grey mt-0.5">
                    Our team verifies pricing on a weekly basis, noting the verified check month next to each recommendation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
