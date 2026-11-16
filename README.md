# NHK — Premium Affiliate Marketing & Product Discovery Platform

> *"Discover Products Worth Loving."*

NHK is an editorial product discovery and affiliate marketing web application built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. It is tailored for **Pinterest traffic**, mobile users, visual curation, and transparent affiliate conversions.

---

## ✦ Brand Identity & Design System

- **Brand Personality**: Modern, Minimalistic, Premium, Trustworthy, Stylish, Editorial.
- **Palette**:
  - Warm Off-White: `#FAF9F6`
  - Soft Beige: `#EDE8DF`
  - Charcoal: `#242424`
  - Muted Grey: `#777777`
  - Pure White: `#FFFFFF`
  - Earth Bronze Accent: `#A47551`
- **Typography**: Playfair Display (editorial serif) & Plus Jakarta Sans / Inter (clean geometric sans).
- **Cards**: Pinterest-inspired vertical aspect ratios (`2:3` and `3:4`), soft shadows, subtle lift-on-hover animations, and integrated **"Save Pin"** buttons.

---

## ✦ Features & Page Structure

### 1. Home Page (`/`)
- **Top Announcement Bar**: Pinterest community callout and editorial note.
- **Navigation Bar**: Custom NHK wordmark logo, links (Home, Explore, Categories, About Us, Contact), Search trigger (`⌘K`), and Pinterest channel link.
- **Hero Section**:
  - Headline: *"Find Your Next Favorite Thing."*
  - Subtext: *"Discover thoughtfully curated products, trending finds, and everyday essentials."*
  - Direct CTAs: *"Explore Collections"* & *"Browse by Category"*.
  - Lifestyle hero visual with verified deal and Pinterest trend indicators.
- **Trending Collections**: 5 curated category cards with live product counters.
- **Featured Discoveries**: Interactive filterable product grid with verified prices and merchant badges.
- **Pinterest Finds**: Visual masonry layout highlighting viral pins and mood-board objects.
- **Editor's Notebook**: Handpicked picks with *"Why We Love It"* field notes and highlight bullets.
- **Newsletter Section**: *"Get the Best Finds Delivered."* with email validation and functional feedback.
- **Footer**: Brand story, navigation columns, social links (Pinterest focus), copyright, and prominent FTC Affiliate Transparency Notice.

### 2. Explore Page (`/explore`)
- Pinterest-style multi-column masonry grid.
- Live keyword search across names, taglines, brands, and tags.
- Category filtering (`fashion`, `tech`, `home`, `beauty`, `essentials`).
- Price bracket filtering (Any, Under \$50, Under \$100, \$100+).
- Sorting: Featured First, Highest Rated, Price: Low to High, Price: High to Low, Recently Added.
- URL query parameter synchronization (`/explore?category=fashion&q=leather`).

### 3. Categories Page (`/categories`)
- Showcase for all 5 core departments:
  - **Fashion & Accessories**
  - **Tech & Gadgets**
  - **Home & Living**
  - **Beauty & Lifestyle**
  - **Everyday Essentials**
- Department descriptions, featured count, and showcase cards linking directly to filtered views.

### 4. Product Detail Page (`/product/[slug]`)
- High-resolution vertical gallery (3:4 and 2:3 aspect ratios).
- Prominent **"Save to Pinterest"** share integration (`pinterest.com/pin/create/button`).
- Verified retail price vs. original price with clear savings calculation.
- Primary **"Check Price / View Product at [Merchant]"** affiliate button.
- External link security attributes: `rel="sponsored nofollow noopener noreferrer" target="_blank"`.
- In-box FTC Affiliate Transparency disclosure.
- Curator's Field Note callout.
- Key technical specifications.
- In-depth editorial review with **Pros ("The Highlights")** and **Considerations Before Buying**.
- Related product recommendations within the same category.
- **Schema.org Product JSON-LD** structured data and Open Graph meta tags for Rich Pins.

### 5. About Page (`/about`)
- The NHK Manifesto: Purposeful Utility, Honest Restraint, and Total Transparency.
- Editorial testing criteria and backstory.

### 6. Contact Page (`/contact`)
- Contact form with client & server-side validation.
- Topic selector (General Question, Product Submission, Affiliate Partnership, Price Update).
- Direct editorial email channels and social links.

### 7. Legal & Compliance Pages
- **Affiliate Disclosure (`/affiliate-disclosure`)**: Comprehensive FTC-compliant disclosure (16 CFR Part 255) detailing commission models, editorial independence, and pricing disclaimers.
- **Privacy Policy (`/privacy`)**: Cookie usage, affiliate tracking disclosures, and data rights.
- **Terms & Conditions (`/terms`)**: Third-party merchant link liability and site usage terms.

### 8. Admin & Inventory Management (`/admin`)
- Protected admin route with password authentication (`/admin/login`).
- **Dashboard Metrics**: Total Products, Active Categories, Editor's Picks, Pinterest Finds.
- **Product Management**:
  - Add new products with image URLs, merchant, affiliate links, pricing, features, pros, considerations, and tags.
  - Edit existing products with pre-populated fields.
  - Delete products with confirmation.
  - Instant **"Test Affiliate Link"** verification.
  - Instant **"Reset Defaults"** action.
- Real-time client synchronization + Next.js REST API routes (`/api/products`).

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js 18.x, 20.x, or 24.x
- npm

### 1. Installation
```bash
npm install
```

### 2. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## ✦ Admin Dashboard Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Default Password**: `nhk2026`
- **Custom Password Configuration**:
  Set an environment variable in `.env.local`:
  ```env
  ADMIN_PASSWORD=your_secure_password_here
  ```

---

## ✦ How to Add Products and Affiliate Links

You can manage products in two ways:

### Method A: Through the Admin Portal (No Code Required)
1. Go to `/admin/login` and log in with your admin password.
2. Click **"+ Add New Product"**.
3. Fill in:
   - **Product Name**
   - **Tagline**
   - **Category**
   - **Merchant Name** (e.g., `Nordstrom`, `Amazon`, `SSENSE`, `Apple`)
   - **Verified Retail Price** (and optional original price for discounts)
   - **Affiliate URL** (your unique affiliate referral link with tracking tags)
   - **Primary Image URL** (vertical 2:3 or 3:4 Unsplash image or CDN link)
   - **Features, Pros, and Considerations**
   - **Badges**: Check *Featured on Homepage*, *Editor's Pick*, or *Pinterest Find*.
4. Click **"Create Product"**. It immediately appears on the website and in category feeds!

### Method B: In Code (`src/data/products.ts`)
Add or edit product objects directly in `src/data/products.ts`. Each product follows the `Product` TypeScript interface defined in `src/types/index.ts`.

---

## ✦ Deployment to Vercel

This project is built with standard Next.js App Router conventions and deploys to **Vercel** with zero configuration.

### Deploying via Vercel Web Dashboard:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Visit [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
3. Import your repository.
4. In the **Environment Variables** section, optionally add:
   - `ADMIN_PASSWORD`: Your custom admin password.
5. Click **"Deploy"**. Vercel will build and deploy the site globally in under 60 seconds.

### Deploying via Vercel CLI:
```bash
npm i -g vercel
vercel
```
To deploy directly to production:
```bash
vercel --prod
```

---

## ✦ License
© 2026 NHK Curation Media Ltd. All rights reserved.
