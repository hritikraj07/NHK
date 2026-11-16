import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'NHK — Discover Products Worth Loving | Curated Affiliate Discovery',
  description:
    'NHK is a premium digital curation platform featuring handpicked lifestyle, fashion, tactile home decor, and minimalist tech. Mindfully vetted, honest recommendations.',
  keywords: [
    'curated products',
    'minimalist design',
    'pinterest lifestyle',
    'editorial product discovery',
    'quiet luxury',
    'aesthetic home decor',
    'everyday essentials',
  ],
  authors: [{ name: 'NHK Editorial Desk' }],
  creator: 'NHK',
  metadataBase: new URL('https://nhkcurated.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nhkcurated.com',
    siteName: 'NHK',
    title: 'NHK — Discover Products Worth Loving',
    description:
      'Curated collections of timeless fashion, minimalist workspace tech, and architectural home objects.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'NHK Curated Product Discovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHK — Discover Products Worth Loving',
    description:
      'Curated collections of timeless fashion, minimalist workspace tech, and architectural home objects.',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Schema.org Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NHK',
              alternateName: 'NHK Curated',
              url: 'https://nhkcurated.com',
              logo: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80',
              sameAs: [
                'https://pinterest.com',
                'https://instagram.com',
              ],
              description: 'Independent product discovery brand curating products worth loving.',
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-full bg-[#FAF9F6] text-[#242424] antialiased selection:bg-[#EDE8DF]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
