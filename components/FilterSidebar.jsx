'use client';

import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {

  return (
    <div className="w-full md:w-80 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2 text-gray-700">Fabric</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.fabric.includes('Silk')}
                onChange={() => onFilterChange('fabric', 'Silk')}
              />
              <span className="ml-2 text-gray-700">Silk</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.fabric.includes('Organza')}
                onChange={() => onFilterChange('fabric', 'Organza')}
              />
              <span className="ml-2 text-gray-700">Organza</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.fabric.includes('Cotton')}
                onChange={() => onFilterChange('fabric', 'Cotton')}
              />
              <span className="ml-2 text-gray-700">Cotton</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">Occasion</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.occasion.includes('Wedding')}
                onChange={() => onFilterChange('occasion', 'Wedding')}
              />
              <span className="ml-2 text-gray-700">Wedding</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.occasion.includes('Festival')}
                onChange={() => onFilterChange('occasion', 'Festival')}
              />
              <span className="ml-2 text-gray-700">Festival</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-pink-600 rounded"
                checked={filters.occasion.includes('Casual')}
                onChange={() => onFilterChange('occasion', 'Casual')}
              />
              <span className="ml-2 text-gray-700">Casual</span>
            </label>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">Price Range</h4>
          <input
            type="range"
            min="5000"
            max="50000"
            value={filters.price}
            onChange={(e) => onFilterChange('price', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(filters.price - 5000) / 450}%, #e5e7eb ${(filters.price - 5000) / 450}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-gray-600 mt-2">
            <span>₹5,000</span>
            <span>₹{Number(filters.price).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
