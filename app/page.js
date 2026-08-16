import Link from 'next/link';
import products from './../data/products.json';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import ModernHero from '../components/ModernHero';

export default function HomePage() {
  // Get the first 4 products to feature
  const featuredProducts = products.filter(p => p.inStock).slice(0, 4);

  return (
    <div className="bg-editorial-cream">
      {/* Hero Section */}
      <ModernHero />

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-maroon mb-12">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-maroon mb-4">
                The Heart of Handloom
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our journey began with a simple yet profound love for the timeless elegance of the Indian saree. We believe that every saree is not just a piece of clothing, but a story woven with threads of tradition, artistry, and cultural heritage.
              </p>
              <Link
                href="/story"
                className="text-maroon font-semibold hover:underline"
              >
                Read Our Full Story &rarr;
              </Link>
            </div>
            <div className="h-80 w-full relative rounded-lg overflow-hidden shadow-xl">
               <Image 
                 src="https://plus.unsplash.com/premium_photo-1781645282311-1fa50376693d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Weaver at a loom" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}