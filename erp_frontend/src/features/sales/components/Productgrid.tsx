// src/features/pos/components/ProductGrid.tsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/Productcard';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ searchQuery,  onAddToCart }: ProductGridProps) {
  // Mock product data - Replace with actual API call
  const [selectedCategory, setSelectedCategory] = useState('All Items');

   const categories = [
    'All Items',
    'Accessories',
    'Home Goods',
    'Electronics',
    'Sale'
  ];


  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Cotton Basic T-Shirt',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      category: 'All Items'
    },
    {
      id: '2',
      name: 'Cotton Basic Polo',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop',
      category: 'All Items'
    },
    {
      id: '3',
      name: 'Cotton Basic Hoodie',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop',
      category: 'All Items'
    },
    {
      id: '4',
      name: 'Cotton Basic Sweater',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop',
      category: 'All Items'
    },
    {
      id: '5',
      name: 'Cotton Basic Jacket',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop',
      category: 'All Items'
    },
    {
      id: '6',
      name: 'Premium Cotton Shirt',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: '7',
      name: 'Designer Polo Shirt',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: '8',
      name: 'Casual Button Down',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop',
      category: 'Electronics'
    },
    {
      id: '9',
      name: 'Smart Casual Tee',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
      category: 'Home Goods'
    },
    {
      id: '10',
      name: 'Urban Style Shirt',
      sku: 'SKU1024',
      price: 25.00,
      stock: 11,
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=500&fit=crop',
      category: 'Sale'
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Items') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 bg-white rounded-lg">
        
   {/* Category Tabs */}
            <div className="grid grid-cols-5 gap-3 mt-4 py-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-md font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'border-1 border-[#1773CF] text-black shadow-md shadow-blue-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

      {/* Product Grid - 5 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 text-center max-w-sm">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}