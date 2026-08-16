# Saree Business

This is a Next.js application for a Saree business. It includes a product catalog, a shopping cart, and an admin panel to manage products.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

The admin panel is located at `/productadmin`. To access it, you need to log in at `/login` with the following credentials:

- **Email:** admin@example.com
- **Password:** password

## Functionality Overview

- **Product Catalog:** View a list of sarees with filtering and sorting options.
- **Product Details:** View the details of a specific saree.
- **Shopping Cart:** Add sarees to the cart and view the cart contents.
- **Admin Panel:** Add, update, and delete sarees.

## Functionality Errors Fixed

- **`addToCart` bug:** Fixed a bug in the `addToCart` function that caused issues when adding an existing item to the cart with different options.
- **Incorrect path revalidation:** Corrected the `revalidatePath` calls in the admin panel to ensure that the correct pages are updated after a product is added, updated, or deleted.
- **Misplaced admin page:** Moved the admin page from `/login` to `/productadmin` and created a new login page.
- **Incorrect redirection:** Fixed the redirection in the product form to point to the correct admin page.
- **Removed empty `products.json`:** Removed the empty `products.json` file from the root directory.
