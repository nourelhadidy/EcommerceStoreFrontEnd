# LuxeCart — Modern E-Commerce Storefront

A responsive, editorial-style e-commerce front end built with **React**, **Material UI (MUI)**, and **Redux Toolkit**, powered by the [Fake Store API](https://fakestoreapi.com/). The UI follows a custom "gallery" design language — hairline borders, serif display type, and ink/wine/brass accent colors — for a premium, boutique-retail feel rather than a generic template look.

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Routing](#routing)
- [Data Source](#data-source)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Notes](#environment-notes)
- [Roadmap](#roadmap)

---

## Overview

LuxeCart is a client-side storefront demo that showcases a full shopping experience — browsing, category filtering, product detail pages, cart management, wishlist toggling, and newsletter signup — built entirely with reusable React components and a shared design-token system so every page looks and feels consistent.

The app fetches live product, category, and cart data from the public Fake Store API, meaning it works out of the box with no backend or database setup required.

---

## Screenshots

| Home | Products |
|------|----------|
| <img width="100%" alt="Home page" src="https://github.com/user-attachments/assets/2ddef507-be5c-4cc8-a339-62128fa87e85" /> | <img width="100%" alt="Products page" src="https://github.com/user-attachments/assets/2473a60b-27ff-4697-b074-78dcf6d0423b" /> |

| Product Details | Cart Drawer |
|-------------------|---------------|
| <img width="100%" alt="Product details page" src="https://github.com/user-attachments/assets/82f3658d-daff-470d-9f6c-d0f5e9e430d8" /> | <img width="100%" alt="Cart drawer" src="https://github.com/user-attachments/assets/97c44299-2228-45e0-b612-27b9dd50546d" /> |

---

## Tech Stack

| Layer            | Technology                                   |
|-------------------|-----------------------------------------------|
| UI Library         | [React](https://react.dev/)                  |
| Component Library  | [Material UI (MUI)](https://mui.com/)         |
| State Management   | [Redux Toolkit](https://redux-toolkit.js.org/) |
| Routing            | [React Router](https://reactrouter.com/)      |
| Icons              | [MUI Icons](https://mui.com/material-ui/material-icons/) |
| Data Source        | [Fake Store API](https://fakestoreapi.com/)   |
| Fonts              | Google Fonts — Fraunces (display), Inter (body) |

---

## Features

### 🛍️ Storefront
- Hero section with call-to-action buttons and social-proof stats
- Value-proposition strip (shipping, guarantee, returns, support)
- "Shop by Category" tile grid, dynamically generated from the API's category list
- "Featured / This Week's Selection" product grid with wishlist toggle and add-to-cart
- Customer testimonials section
- Newsletter signup with basic email validation

### 📦 Product Catalogue
- Full product listing grouped by category
- Category filter chips (`All Products` + one per category)
- Responsive card grid (2 columns on mobile, 4 on desktop) with hover image zoom

### 🔍 Product Details
- Dynamic route (`/productDetails/:id`) fetching a single product by ID
- Loading and "not found" states
- Rating display, price, description, category chip
- Add to Cart (dispatches to Redux) and Go to Cart actions
- Snackbar feedback on cart actions

### 🧭 Navigation
- Fixed top app bar with logo, nav links, and live product search
  - Search matches exact title → partial match → prefix match, in that order
- Slide-out mobile navigation drawer
- Slide-out cart drawer that fetches a live cart (`/carts/1`) and resolves each line item's product data
- Account menu (Profile / Cart / Login) and wishlist/cart icon buttons with live cart count badge

### 🔔 Feedback & UX
- MUI `Snackbar` + `Alert` used consistently across pages for success/error/info messages
- Loading indicators (`CircularProgress`) for all async data fetches
- Sharp, borderless card design (0 border-radius) reinforced by 1px hairline borders instead of shadows, per the design system below

---

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx              # Fixed app bar, search, mobile & cart drawers
├── pages/
│   ├── Home.jsx                 # Landing page (hero, categories, featured, testimonials, newsletter)
│   ├── Products.jsx             # Full catalogue with category filtering
│   └── ProductDetails/
│       └── ProductDetails.jsx   # Single product page
├── store/
│   ├── store.js                 # Redux store configuration
│   └── slice/
│       ├── userSlice.js         # User/auth state
│       └── cartSlice.js         # Cart state
└── App.jsx                      # Route definitions (not shown here)
```

> Note: exact paths may vary slightly depending on how routes are wired in `App.jsx`; adjust imports if you reorganize folders.

---


## State Management

Global state is managed with **Redux Toolkit** via a single store:

```js
// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: { user: userReducer, cart: cartReducer },
});

export default store;
```

| Slice   | Responsibility                                      |
|---------|------------------------------------------------------|
| `user`  | Authentication / profile state                       |
| `cart`  | Cart line items, added via `addToCart(product)`      |

Components read/dispatch cart state with the standard Redux Toolkit hooks:

```js
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";

const dispatch = useDispatch();
dispatch(addToCart(product));
```


## Routing

Built with `react-router-dom`. Key routes referenced throughout the app:

| Path                          | Page               | Description                          |
|--------------------------------|---------------------|----------------------------------------|
| `/`                             | Home                | Landing page                          |
| `/products`                     | Products            | Full catalogue, optional `?category=` query param |
| `/productDetails/:id`           | ProductDetails      | Single product view                   |
| `/cart`                         | Cart                | Cart page (linked from Navbar & ProductDetails) |
| `/profile`                      | Profile             | User profile (linked from account menu) |
| `/login`                        | Login               | Auth page (linked from account menu)  |
| `/about`, `/services`, `/contact` | Static pages      | Linked from primary nav               |

---

## Data Source

All product, category, and cart data comes from the free [Fake Store API](https://fakestoreapi.com/):

- `GET /products` — full product list
- `GET /products/:id` — single product
- `GET /products/categories` — list of category names
- `GET /products/category/:category` — products within a category
- `GET /carts/1` — sample cart contents

Since this is a public demo API, cart/checkout actions are **not persisted server-side** — real order placement, payments, and authentication would need to be wired up to an actual backend.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm (or yarn/pnpm)

### Installation

```bash
git clone <your-repo-url>
cd luxecart
npm install
```

### Run the development server

```bash
npm start
```

The app will be available at `http://localhost:3000` (or your bundler's default port).

### Build for production

```bash
npm run build
```

---

## Available Scripts

| Command           | Description                          |
|--------------------|----------------------------------------|
| `npm start`         | Runs the app in development mode      |
| `npm run build`      | Builds the app for production          |
| `npm test`           | Runs the test suite (if configured)   |
| `npm run lint`       | Runs the linter (if configured)       |

> Adjust this table to match your actual `package.json` scripts.

---

## Environment Notes

- No environment variables or `.env` file are required to run the app locally — all data comes from the public Fake Store API.
- Google Fonts (`Fraunces`, `Inter`) are injected at runtime via a `<link>` tag added to `document.head` in `Home.jsx`. If you add more pages that need these fonts before `Home` mounts, consider moving the font `<link>` into your root `index.html` instead.
- Images referenced locally (e.g. `/images/wallpaper.png` in the hero section) must exist in your `public/` folder.

---

## Roadmap

Ideas for hardening this into a production-ready app:

- [ ] Centralize `BRAND`, `FONT_DISPLAY`, and `FONT_BODY` into a shared `theme.js` / MUI `createTheme()` config instead of redeclaring them per file
- [ ] Extract the repeated `Eyebrow` and `SectionHeading` components into a shared `components/` folder
- [ ] Wire the Navbar cart drawer to read from the Redux `cart` slice instead of a separate API fetch, so cart state stays in sync app-wide
- [ ] Add real authentication and persist cart/wishlist per user
- [ ] Add unit tests for cart reducers and key UI flows
- [ ] Add a real checkout flow and order confirmation page
- [ ] Add pagination or infinite scroll to the Products catalogue
- [ ] Persist wishlist state (currently local `useState` on the Home page, reset on refresh)

---

