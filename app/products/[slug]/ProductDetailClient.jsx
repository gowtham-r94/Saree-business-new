'use client';
import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../components/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || 'https://via.placeholder.com/600x800?text=No+Image'
  );
  const [quantity, setQuantity] = useState(1);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

const handleAddToCart = () => {
    addToCart(product, { quantity });
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, { quantity });
    startTransition(() => router.push('/cart'));
  };
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gray-900 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        {/* Product Details Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2.5">
              {product.images?.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-full sm:w-16 h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-colors ${
                    selectedImage === img ? 'border-amber-600' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
{/* Main Featured Image */}
            <div className="relative flex-1 aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                  {product.fabric} • {product.weave}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {product.title}
                </h1>

                {/* Rating & Stock Status */}
                <div className="mt-3 flex items-center space-x-4">
                  <div className="flex items-center bg-green-700 text-white text-xs font-bold px-2.5 py-1 rounded">
                    ★ {product.rating}
                  </div>
                  <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-3 border-t border-b border-gray-100 py-4">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-normal">Inclusive of all taxes</span>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                <div>
                  <span className="text-gray-500 block">Length</span>
                  <span className="font-medium text-gray-800">{product.length}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Blouse Stitching</span>
                  <span className="font-medium text-gray-800">
                    {product.blouseStitchingAvailable ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Fabric</span>
                  <span className="font-medium text-gray-800">{product.fabric}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Weave</span>
                  <span className="font-medium text-gray-800">{product.weave}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Product Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Occasion Tags */}
              {product.occasion && product.occasion.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                    Ideal For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.occasion.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center shadow-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock || isPending}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center shadow-md"
                >
                  {isPending ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailClient;