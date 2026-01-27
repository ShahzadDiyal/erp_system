// src/features/sales/pages/addInvoiceProducts.tsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/Productcard';
import ProductPopup from '../components/Productpopup';
import DashboardLayout from '../../../layouts/DashboardLayout';
import barcode_icon from '../../../assets/icons/barcode_icon.svg'
import search_icon from '../../../assets/icons/search_icon.svg'
import { Link, useNavigate } from 'react-router-dom';
import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg'

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface SelectedProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function AddInvoiceProducts() {
  const navigate = useNavigate();
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Category state
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  
  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Selected products for invoice
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const categories = [
    'All Items',
    'Accessories',
    'Home Goods',
    'Electronics',
    'Sale'
  ];

  // Mock product data - Replace with actual API call
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

    // Filter by search query (with safety check)
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  // Handle product card click - THIS IS THE KEY FUNCTION
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  // Handle add to selection
  const handleAddToSelection = (productWithDetails: SelectedProduct) => {
    setSelectedProducts(prev => [...prev, productWithDetails]);
  };

  // Handle move forward - navigate to invoice with selected products
  const handleMoveForward = () => {
    // Store selected products in localStorage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    navigate('/sales/create_invoice');
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 mb-4">
        <div className='flex flex-row justify-between mb-8 items-center'>
          <Link to='/sales'>
            <img src={arrow_back_icon} alt="" className='w-8 h-8' />
          </Link>
          <button 
            onClick={handleMoveForward}
            className='py-2 px-4 border-1 border-blue-600 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white hover:font-semibold transition-all relative'
          >
            Move Forward
            {selectedProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {selectedProducts.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <img src={search_icon} alt="" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, SKU, or barcode"
            className="w-full pl-12 pr-16 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Scan Barcode"
          >
            <img src={barcode_icon} alt="" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-5 gap-3 mt-4 p-6 bg-white rounded-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-md font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${selectedCategory === category
                ? 'border border-[#1773CF] text-black shadow-md shadow-blue-200'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid - 5 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 p-6 bg-white">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleProductClick(product)}
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

        {/* Product Popup - THIS IS KEY */}
        {isPopupOpen && selectedProduct && (
          <ProductPopup
            product={selectedProduct}
            onClose={() => {
              setIsPopupOpen(false);
              setSelectedProduct(null);
            }}
            onAdd={handleAddToSelection}
          />
        )}
      </div>
    </DashboardLayout>
  );
}