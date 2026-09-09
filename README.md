# UpTraders - Manikanta Super Market

A full-featured e-commerce web application for Manikanta Super Market — a supermarket platform offering fresh groceries, daily essentials, and household items.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion + GSAP
- **Payments**: Razorpay + Stripe
- **Auth**: Google OAuth
- **Maps**: Google Maps API

## Features

- User authentication (Email/Password + Google OAuth)
- Product browsing & search
- Category listing
- Product detail pages with zoom
- Shopping cart & checkout
- Order tracking
- Wishlist
- User profile & addresses
- Wallet
- Coupons
- Admin dashboard
- Delivery partner dashboard
- Responsive (Mobile, Tablet, Desktop)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shaikmuzammil2905/uptraders.com.git
cd uptraders.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Environment Variables

See `.env.example` for required variables.

## Deployment

This project is configured for deployment on **Vercel**.

- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

## Backend

The backend API is a separate Node.js/Express application. See the backend repository for setup instructions.

Production backend: `https://manikantabee.vercel.app/api`
