import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions — NHK',
  description: 'Terms governing your use of the NHK product discovery website.',
};

export default function TermsPage() {
  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 border-b border-nhk-beige pb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-nhk-accent">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            Terms & Conditions
          </h1>
          <p className="text-xs text-nhk-grey">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-nhk-charcoal/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using NHK (nhkcurated.com), you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, please do not use our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              2. Editorial Nature & Disclaimer of Warranty
            </h2>
            <p>
              The content provided on NHK is for informational and product discovery purposes only. While we strive to maintain accurate, up-to-date pricing and specifications, we make no representations or warranties of any kind regarding completeness, accuracy, or suitability.
            </p>
            <p>
              Any reliance you place on such information is strictly at your own discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              3. External Links & Merchant Transactions
            </h2>
            <p>
              NHK contains links to external merchant websites not operated by us. When you purchase products through these third-party links, your transaction is subject solely to the terms, warranties, and return policies of that third-party retailer. NHK is not liable for any issues, damages, or disputes arising between you and an external merchant.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              4. Intellectual Property
            </h2>
            <p>
              All original text, curation criteria, brand logos, and visual assets created by NHK are the intellectual property of NHK and protected by applicable copyright and trademark laws. Third-party brand names and product imagery are used for identification and review purposes and remain property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              5. Contact Information
            </h2>
            <p>
              Questions regarding these Terms should be sent to{' '}
              <Link href="/contact" className="text-nhk-accent underline font-medium">
                our contact desk
              </Link>{' '}
              or emailed to <code>legal@nhkcurated.com</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
