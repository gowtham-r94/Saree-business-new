'use client';

// Assuming path is: components/ProductCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    router.push('/cart');
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="border rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={product?.images?.[0] || 'https://via.placeholder.com/300x400?text=No+Image'}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h2 className="font-semibold text-lg truncate text-gray-900" title={product.title}>
              {product.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{product.fabric}</p>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-bold text-base">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <button
              onClick={handleBuyNow}
              className="mt-4 w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors z-10 relative"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
