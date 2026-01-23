// src/features/sales/pages/CreateInvoice.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import add_icon from '../../../assets/icons/add.svg'

import { Link } from 'react-router-dom';
import { useState } from 'react';

type InvoiceType = 'b2c' | 'b2b' | 'quotation';

export default function CreateInvoice() {
  const [selectedInvoiceType, setSelectedInvoiceType] = useState<InvoiceType>('b2c');
  const [invoiceNo, setInvoiceNo] = useState('INV-B2C-01452');
  const [source, setSource] = useState('');
  const [branch, setBranch] = useState('');
  const [cashier, setCashier] = useState('');
  const [date, setDate] = useState('24 Oct 2025');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
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
                    {/* Source and Branch Row */}
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
                          >

                          </input>

                        </div>
                      </div>


                    </div>

                    {/* Cashier */}
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

                    {/* Date */}
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

                    {/* bank account auto */}
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

                    {/* Sales Rep */}
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
                    {/* Source and Branch Row */}
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
                          >
                          </input>

                        </div>
                      </div>


                    </div>

                    {/* bank account auto */}
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

                    {/* Sales Rep */}
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

                    {/* Address */}
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
                  {/* Source and Branch Row */}
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
                        >
                        </input>
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
                        >
                        </input>
                      </div>
                    </div>
                  </div>

                  {/* Customer Name */}
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

                  {/* Valid Until */}
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
                <div className="flex items-center justify-between bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-900">Products</h3>
                  <Link to='/sales/add_product'>
                   <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <img src={add_icon} alt="" />
                    <span className="font-medium">Add Product</span>
                  </button>
                  </Link>
                 
                </div>

                {/* Summary Section */}
                <div className="bg-white rounded-lg p-6 ">
                  <h4 className="text-base font-semibold  mb-4">Summary</h4>

                  <div className="space-y-3">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">SUBTOTAL</span>
                      <span className="text-sm font-medium text-gray-900">-</span>
                    </div>

                    {/* Tax */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">TAX</span>
                      <span className="text-sm font-medium text-gray-900">-</span>
                    </div>

                    {/* Discount */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 uppercase">DISCOUNT</span>
                      <span className="text-sm font-medium text-gray-900">-</span>
                    </div>

                    {/* Grand Total */}
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-sm text-gray-900 font-semibold uppercase">GRAND TOTAL</span>
                      <span className="text-sm font-semibold text-gray-900">-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}