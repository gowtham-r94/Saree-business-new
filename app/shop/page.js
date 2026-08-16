'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from '../../components/FilterSidebar';
import productsData from '../../data/products.json';

const ShopPage = () => {
  const [filters, setFilters] = useState({
    fabric: [],
    occasion: [],
    price: 50000,
  });
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      if (filterType === 'price') {
        return { ...prevFilters, price: value };
      }
      const newValues = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value];
      return { ...prevFilters, [filterType]: newValues };
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData.filter(product => {
      const fabricMatch = filters.fabric.length === 0 || filters.fabric.includes(product.fabric);
      const occasionMatch = filters.occasion.length === 0 || product.occasion.some(o => filters.occasion.includes(o));
      const priceMatch = product.price <= filters.price;
      return fabricMatch && occasionMatch && priceMatch;
    });

    switch (sort) {
      case 'price-lh':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-hl':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
  }, [filters, sort]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Pass state and handlers to FilterSidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <main className="w-full">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-2 sm:mb-0">
              Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> of {productsData.length} products
            </p>
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-lh">Price: Low to High</option>
                <option value="price-hl">Price: High to Low</option>
              </select>
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-md ${view === 'grid' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" /></svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-md ${view === 'list' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Display */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className={`transition-all duration-300 ${
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-8'
            }`}>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} view={view} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
