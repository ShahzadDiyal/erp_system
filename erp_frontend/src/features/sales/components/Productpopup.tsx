// src/features/sales/components/ProductPopup.tsx
import { useState, useEffect } from 'react';
import add_product_icon from '../../../assets/icons/add_product_icon.svg'
import add_product_icon_2 from '../../../assets/icons/add.svg'

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface ProductPopupProps {
  product: Product;
  onClose: () => void;
  onAdd: (productWithDetails: {
    id: string;
    name: string;
    sku: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
  }) => void;
}

export default function ProductPopup({ product, onClose, onAdd }: ProductPopupProps) {
  const [selectedSize, setSelectedSize] = useState('Small');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const sizes = ['Small', 'Medium', 'Large'];

  const handleAddProduct = () => {
    // Add product with selected details
    onAdd({
      id: `${product.id}-${selectedSize}-${Date.now()}`,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.image
    });

    // Show success animation
    setShowSuccess(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Popup */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Checkmark Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex items-center justify-center z-10 animate-fadeIn">
            <div className="flex flex-col items-center gap-4 bg-black">
              <div className="relative">
                {/* Animated Circle */}
                <img src={add_product_icon} alt="" />
              </div>
            </div>
          </div>
        )}

       

        {/* Product Header */}
        <div className="flex flex-row justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>
           <p className="text-2xl font-semibold text-gray-900">
              KWD {product.price.toFixed(2)}
            </p>
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            The name's Seven..007. Pure beef perfection in every bite. 7 ounces of juicy goodness, double cheese, and our classified sauce. Nutritional Content per serving: 985 calories
          </p>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <div className="space-y-2">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex items-center justify-between  cursor-pointer transition-all hover:border-gray-400"
                
              >
                <span className="font-medium text-gray-900">{size}</span>
                <div className="relative">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="sr-only"
                  />
                  <div 
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                    style={{
                      borderColor: selectedSize === size ? '#000000' : '#9CA3AF',
                      backgroundColor: 'white'
                    }}
                  >
                    {selectedSize === size && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center bg-[#74ABE233] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors font-bold text-lg"
              >
                −
              </button>
              <span className="w-14 h-14 flex items-center justify-center bg-[#74ABE2] text-black disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors font-bold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center bg-[#74ABE233] text-black disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors font-bold text-lg"
              >
                +
              </button>
            </div>
            <div className="text-right flex flex-row items-center ">
              <p className="text-md font-semibold text-gray-700 px-2">Total</p>
              <p className="text-lg font-bold text-gray-900 px-2">
                KWD {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddProduct}
          disabled={showSuccess}
          className="w-full py-4 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
            <img src={add_product_icon_2} alt="" />
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}