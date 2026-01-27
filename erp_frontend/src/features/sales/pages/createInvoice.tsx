// src/features/sales/pages/CreateInvoice.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import add_icon from '../../../assets/icons/add.svg'
import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type InvoiceType = 'b2c' | 'b2b' | 'quotation';

interface SelectedProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function CreateInvoice() {
  const [selectedInvoiceType, setSelectedInvoiceType] = useState<InvoiceType>('b2c');
  const [invoiceNo, setInvoiceNo] = useState('INV-B2C-01452');
  const [source, setSource] = useState('');
  const [branch, setBranch] = useState('');
  const [cashier, setCashier] = useState('');
  const [date, setDate] = useState('24 Oct 2025');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'KNET'>('CASH');
  const [paymentStatus, setPaymentStatus] = useState<'PAID' | 'UNPAID' | 'PARTIAL'>('PAID');

  // Load selected products from localStorage on component mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('selectedProducts');
    if (storedProducts) {
      try {
        const products = JSON.parse(storedProducts);
        setSelectedProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }, []);

  // Calculate totals
  const calculateSubtotal = () => {
    return selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateDiscount = () => {
    return 0; // You can add discount logic here
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTax() - calculateDiscount();
  };

  // Function to remove product
  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = selectedProducts.filter(p => p.id !== productId);
    setSelectedProducts(updatedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  // Function to update quantity
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedProducts = selectedProducts.map(p => 
      p.id === productId ? { ...p, quantity: newQuantity } : p
    );
    setSelectedProducts(updatedProducts);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveInvoice = () => {
    // Implement save logic here
    console.log('Saving invoice...');
    alert('Invoice saved successfully!');
  };

  const handleExportPDF = () => {
    // Implement PDF export logic here
    console.log('Exporting PDF...');
    alert('Exporting PDF...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className='flex flex-row justify-between mb-8 items-center'>
          <Link to='/sales'>
            <img src={arrow_back_icon} alt="" className='w-8 h-8' />
          </Link>
        </div>
        <div className=" ">
          {/* Main Form */}
          <div>
            <div className="space-y-6">
              <div className='bg-white space-y-6 p-6 rounded-xl'>
                {/* Invoice Number */}
                <div className=''>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Invoice No
                  </label>
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="INV-B2C-01452"
                  />
                </div>

                {/* Invoice Type Radio Buttons */}
                <div className="flex gap-4">
                  {/* B2C Sales Invoice */}
                  <button
                    onClick={() => setSelectedInvoiceType('b2c')}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${selectedInvoiceType === 'b2c'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${selectedInvoiceType === 'b2c' ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                        B2C Sales Invoice
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedInvoiceType === 'b2c'
                        ? 'border-blue-500'
                        : 'border-gray-300'
                        }`}>
                        {selectedInvoiceType === 'b2c' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* B2B Sales Invoice */}
                  <button
                    onClick={() => setSelectedInvoiceType('b2b')}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${selectedInvoiceType === 'b2b'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${selectedInvoiceType === 'b2b' ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                        B2B Sales Invoice
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedInvoiceType === 'b2b'
                        ? 'border-blue-500'
                        : 'border-gray-300'
                        }`}>
                        {selectedInvoiceType === 'b2b' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Quotation */}
                  <button
                    onClick={() => setSelectedInvoiceType('quotation')}
                    className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${selectedInvoiceType === 'quotation'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${selectedInvoiceType === 'quotation' ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                        Quotation
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedInvoiceType === 'quotation'
                        ? 'border-blue-500'
                        : 'border-gray-300'
                        }`}>
                        {selectedInvoiceType === 'quotation' && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Conditional Forms Based on Invoice Type */}
              {selectedInvoiceType === 'b2c' && (
                <>
                  <div className="space-y-4 bg-white rounded-xl p-6">
                    {/* Source and Branch Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Source
                        </label>
                        <div className="relative">
                          <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          >
                            <option value="">POS / Website / Mobile App</option>
                            <option value="pos">POS</option>
                            <option value="website">Website</option>
                            <option value="mobile">Mobile App</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Branch
                        </label>
                        <div className="relative">
                          <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          >
                            <option value="">Kuwait City Branch</option>
                            <option value="kuwait">Kuwait City Branch</option>
                            <option value="salmiya">Salmiya Branch</option>
                            <option value="hawally">Hawally Branch</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cashier */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Cashier
                      </label>
                      <input
                        type="text"
                        value={cashier}
                        onChange={(e) => setCashier(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ahmed Raza (EMP-021)"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Date
                      </label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="24 Oct 2025"
                      />
                    </div>
                  </div>


                  <div className="space-y-4 bg-white rounded-xl p-6">
                    <div >
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Customer Name
                        </label>
                        <div className="relative">
                          <input
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={cashier}
                        onChange={(e) => setCashier(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="--"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Customer Type
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="B2C"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedInvoiceType === 'b2b' && (
                <>
                  <div className="space-y-4 bg-white rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Source
                        </label>
                        <div className="relative">
                          <select
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          >
                            <option value="">POS / Website / Mobile App</option>
                            <option value="pos">POS</option>
                            <option value="website">Website</option>
                            <option value="mobile">Mobile App</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Branch
                        </label>
                        <div className="relative">
                          <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          >
                            <option value="">Kuwait City Branch</option>
                            <option value="kuwait">Kuwait City Branch</option>
                            <option value="salmiya">Salmiya Branch</option>
                            <option value="hawally">Hawally Branch</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Bank Account (Auto)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Qurain – Main Account"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Sales Rep
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Sara Khan (EMP-014)  "
                      />
                    </div>
                  </div>

                  <div className="space-y-4 bg-white rounded-lg p-6">
                    <div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Company Name
                        </label>
                        <div className="relative">
                          <input
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                            placeholder='Enter company name'
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Faisal Ahmad"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+965 55 213 445 "
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Kuwait City"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedInvoiceType === 'quotation' && (
                <div className="space-y-4 bg-white rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Customer
                      </label>
                      <div className="relative">
                        <input
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          placeholder='BlueTech LLC'
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Valid Till
                      </label>
                      <div className="relative">
                        <input
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-10"
                          placeholder='30 Oct 2025'
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Status
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Sent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      IncoTerms
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="SCIF"
                    />
                  </div>
                </div>
              )}

              {/* Products Section */}
              <div className="space-y-6">
                {/* Products Header */}
                <div className="">
                 <div className='flex items-center justify-between bg-white p-6'>
                   <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                  <Link to='/sales/add_product'>
                    <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                      <img src={add_icon} alt="" />
                      <span className="font-medium">Add Product</span>
                    </button>
                  </Link>
                 </div>
                   {/* Selected Products Table */}
                {selectedProducts.length > 0 && (
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="overflow-x-auto ">
                        <h2 className='text-lg font-semibold px-4 py-2 bg-none shadow'>Product Table</h2>
                  
                      <table className="w-full shadow-lg">
                        <thead className="bg-gray-50 border-b border-gray-200 ">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Image
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              SKU
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Qty
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Price
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Tax
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Total
                            </th>
                            {/* <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Action
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedProducts.map((product) => {
                            const productSubtotal = product.price * product.quantity;
                            const productTax = productSubtotal * 0.05;
                            const productTotal = productSubtotal + productTax;

                            return (
                              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-12 h-12 object-cover rounded-md"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">Size: {product.size}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{product.sku}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center justify-center gap-2">
                                    {/* <button
                                      onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                                      className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                    >
                                      <span className="text-gray-600 font-semibold">-</span>
                                    </button> */}
                                    <span className="w-10 text-center font-medium text-gray-900">{product.quantity}</span>
                                    {/* <button
                                      onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                      className="w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                    >
                                      <span className="font-semibold">+</span>
                                    </button> */}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="text-sm font-medium text-gray-900">
                                    KWD {product.price.toFixed(2)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="text-sm text-gray-900">
                                    KWD {productTax.toFixed(2)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="text-sm font-semibold text-gray-900">
                                    KWD {productTotal.toFixed(2)}
                                  </div>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <button
                                    onClick={() => handleRemoveProduct(product.id)}
                                    className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                </div>

              

                {/* Summary Section */}
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-base font-semibold mb-4">Summary</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">SUBTOTAL</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedProducts.length > 0 ? `KWD ${calculateSubtotal().toFixed(2)}` : '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">TAX (5%)</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedProducts.length > 0 ? `KWD ${calculateTax().toFixed(2)}` : '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">DISCOUNT</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedProducts.length > 0 ? `KWD ${calculateDiscount().toFixed(2)}` : '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-900 font-semibold uppercase">GRAND TOTAL</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {selectedProducts.length > 0 ? `KWD ${calculateGrandTotal().toFixed(2)}` : '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Section - Only show when products are selected */}
                {selectedProducts.length > 0 && (
                  <>
                  <div className="bg-white rounded-lg p-6 space-y-6">
                    {/* Payment Method */}
                    <div>
                      <h4 className="text-base font-semibold mb-4">Payment Method</h4>
                      <div className="space-y-3">
                        {['CASH', 'CARD', 'KNET'].map((method) => (
                          <label
                            key={method}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <span className="text-sm text-gray-700">{method}</span>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method}
                              checked={paymentMethod === method}
                              onChange={(e) => setPaymentMethod(e.target.value as 'CASH' | 'CARD' | 'KNET')}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-600"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Payment Status */}
                    <div>
                      <h4 className="text-base font-semibold mb-4">Payment Status</h4>
                      <div className="space-y-3">
                        {['PAID', 'UNPAID', 'PARTIAL'].map((status) => (
                          <label
                            key={status}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <span className="text-sm text-gray-700">{status}</span>
                            <input
                              type="radio"
                              name="paymentStatus"
                              value={status}
                              checked={paymentStatus === status}
                              onChange={(e) => setPaymentStatus(e.target.value as 'PAID' | 'UNPAID' | 'PARTIAL')}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                  
                  </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <button
                        onClick={handlePrint}
                        className="px-6 py-3 bg-white border border-blue-300 rounded-lg text-gray-700 font-medium hover:bg-blue-500 transition-colors cursor-pointer hover:text-white"
                      >
                        Print
                      </button>
                      <button
                        onClick={handleSaveInvoice}
                        className="px-6 py-3 bg-white border border-blue-300 rounded-lg text-gray-700 font-medium hover:bg-blue-500 transition-colors cursor-pointer hover:text-white"
                      >
                        Save Invoice
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="px-6 py-3 bg-white border border-blue-300 rounded-lg text-gray-700 font-medium hover:bg-blue-500 transition-colors cursor-pointer hover:text-white"
                      >
                        Export PDF
                      </button>
                    </div>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}