import { getProducts } from '../../productadmin/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

/**
 * Generates static pages for each product at build time.
 * This function is made robust by filtering out any products that might be
 * missing a slug, which resolves the "received undefined" error.
 */
export async function generateStaticParams() {
  const products = await getProducts();

  return products
    .filter(product => typeof product.slug === 'string' && product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}

/**
 * Fetches a single product by its slug.
 * In a real application, this would query a database directly for the slug.
 * For now, it filters the full product list for simplicity.
 * @param {string} slug - The slug of the product to fetch.
 * @returns {Promise<Object|undefined>} The product object or undefined if not found.
 */
async function getProductBySlug(slug) {
  const products = await getProducts();
  // In a real DB, you'd do: return db.products.find({ slug });
  return products.find(p => p.slug === slug);
}

/**
 * Generates metadata (e.g., title, description) for the page header.
 */
export async function generateMetadata({ params }) {
    const { slug } = await params; // Await params to get the slug
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.title} | Saree Emporium`,
        description: product.description?.substring(0, 160) || '',
    };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params; // Await params to get the slug
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}