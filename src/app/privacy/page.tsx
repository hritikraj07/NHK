import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — NHK',
  description: 'Understand how NHK collects, uses, and safeguards your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 border-b border-nhk-beige pb-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-nhk-accent">
            Legal & Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            Privacy Policy
          </h1>
          <p className="text-xs text-nhk-grey">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-nhk-charcoal/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              1. Information We Collect
            </h2>
            <p>
              At NHK, we respect your privacy. We collect minimal personal data necessary to operate our website and communicate with you:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Newsletter Information:</strong> When you subscribe to our dispatches, we collect your email address. You may unsubscribe at any time.
              </li>
              <li>
                <strong>Contact Inquiries:</strong> When you reach out via our contact form, we collect your name, email address, and message contents to answer your inquiry.
              </li>
              <li>
                <strong>Analytics Data:</strong> We may collect anonymized browser data, device type, pages visited, and referring source (such as Pinterest) to improve site performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              2. Cookies & Affiliate Tracking Technologies
            </h2>
            <p>
              When you click on an outbound affiliate link on NHK, a tracking cookie may be placed by the third-party merchant or affiliate network (e.g. Amazon, Nordstrom) on your browser. This cookie simply indicates to the merchant that you arrived from NHK so we can be credited for qualifying purchases. We do not access or store personal financial or payment details.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              3. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Email addresses collected for newsletters are stored securely with verified email delivery providers who adhere to GDPR and international security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              4. Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights under data privacy laws (such as GDPR or CCPA) to access, correct, or request deletion of any personal information we hold. To exercise these rights, please email us at <code>privacy@nhkcurated.com</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
