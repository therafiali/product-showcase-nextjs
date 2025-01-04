'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import Link from 'next/link';
import Loading from './Loading';

import ErrorMessage from './ErrorMessage';


const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product'); // Adjust the endpoint if needed
        if (!response.ok) {
          <ErrorMessage message='Error in API' />
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Render loading or error components if necessary
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container w-full mx-auto px-6 py-12 min-h-screen">
       <Link href={"/"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {'<<<'} Home 
            </span>
          </button>
        </Link>
      {/* Search Bar */}
      <div className="mb-6 max-w-xl mx-auto border rounded-md">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-4 text-xl border border-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8 text-center flex flex-wrap gap-4 justify-center items-center">
        <button
          onClick={() => handleCategoryChange('All')}
          className="px-6 py-3 mx-2 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange('Electronics')}
          className="px-6 py-3 mx-2 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Electronics
        </button>
        <button
          onClick={() => handleCategoryChange('Clothing')}
          className="px-6 py-3 mx-2 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Clothing
        </button>
        <button
          onClick={() => handleCategoryChange('Home')}
          className="px-6 py-3 mx-2 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 focus:outline-none"
        >
          Home
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-xl text-white my-8">
            Product not found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`products/${product.id}`}>
              <div className="bg-white p-6 border border-white rounded-lg shadow-xl hover:border-2 hover:border-gray-700 hover:scale-105 transform transition-all duration-300 ease-in-out">
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transform transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm"></div>
                </div>
                <h3 className="text-2xl font-semibold text-center text-black mb-2">
                  {product.title}
                </h3>
                <p className="text-lg font-bold text-center text-black">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
