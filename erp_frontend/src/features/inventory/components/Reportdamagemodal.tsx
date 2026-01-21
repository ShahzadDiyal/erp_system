// src/components/ReportDamageModal.tsx
import { useState } from 'react';
import exclaimation_icon from '../../../assets/icons/exclaimation_icon.svg';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';

interface ReportDamageModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        branch: string;
        quantity: number;
    } | null;
}

export default function ReportDamageModal({ isOpen, onClose, product }: ReportDamageModalProps) {
    const [damagedQuantity, setDamagedQuantity] = useState('2');
    const [damageReason, setDamageReason] = useState('Physical Damage');

    if (!isOpen || !product) return null;

    const handleReportDamage = () => {
        // Handle report damage logic here
        console.log('Report Damage:', { damagedQuantity, damageReason, product });
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-opacity-50 z-[60] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col  h-[90vh]">
                {/* Header */}
               <div className="px-8 pt-6 flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-900 text-center uppercase">Report Damaged Item</h2>
                </div>

                {/* Content - Scrollable */}
                <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
                    {/* Info Alert */}
                    <div className="flex items-start space-x-3 bg-[#F7F9FA] rounded-lg p-4">
                        <div className="flex-shrink-0 mt-0.5">
                            <img src={exclaimation_icon} alt="" />
                        </div>
                        <p className="text-sm text-gray-700">Items will be moved to Repair Branch</p>
                    </div>

                    {/* Form Fields - First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Product */}
                        <div className='bg-white shadow p-3 rounded-lg'>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product
                            </label>
                            <input
                                type="text"
                                value={product.name}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium"
                            />
                        </div>

                        {/* Branch */}
                        <div className='bg-white shadow p-3 rounded-lg'>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Branch
                            </label>
                            <input
                                type="text"
                                value={product.branch}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium"
                            />
                        </div>

                        {/* Damaged Quantity */}
                        <div className='bg-white shadow p-3 rounded-lg'>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Damaged Quantity
                            </label>
                            <input
                                type="number"
                                value={damagedQuantity}
                                onChange={(e) => setDamagedQuantity(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 font-medium"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Form Fields - Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Available Quantity */}
                        <div className='bg-white p-3 rounded-lg shadow'>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Available Quantity
                            </label>
                            <input
                                type="text"
                                value={`${product.quantity} units`}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium"
                            />
                        </div>

                        {/* Damage Reason */}
                        <div className="relative bg-white p-3 rounded-lg shadow">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Damage Reason
                            </label>
                            <select
                                value={damageReason}
                                onChange={(e) => setDamageReason(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                            >
                                <option>Physical Damage</option>
                                <option>Water Damage</option>
                                <option>Manufacturing Defect</option>
                                <option>Expired Product</option>
                                <option>Customer Return</option>
                                <option>Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons - Fixed at Bottom */}
                <div className="px-8 py-6 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-[#1773CF33] cursor-pointer text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReportDamage}
                            className="px-6 py-3 bg-[#F5AC68] cursor-pointer text-black font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Report Damage
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}