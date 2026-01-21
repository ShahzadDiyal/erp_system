    // src/components/TransferStockModal.tsx
    import { useState } from 'react';

    import exclaimation_icon from '../../../assets/icons/exclaimation_icon.svg'
    import dashed_arrow from '../../../assets/icons/dashed_arrow.svg'
    import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg'

    interface TransferStockModalProps {
        isOpen: boolean;
        onClose: () => void;
        product: {
            name: string;
            sku: string;
        } | null;
    }

    export default function TransferStockModal({ isOpen, onClose, product }: TransferStockModalProps) {
        const [fromLocation, setFromLocation] = useState('Warehouse');
        const [toLocation, setToLocation] = useState('Kuwait City Branch');

        if (!isOpen || !product) return null;

      

        const handleConfirmTransfer = () => {
            // Handle transfer logic here
            console.log('Transfer:', { fromLocation, toLocation,  product });
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
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col h-[90vh]">
                    {/* Header */}
                    <div className="px-8 pt-6 flex-shrink-0">
                        <h2 className="text-lg font-bold text-gray-900 text-center">VIEW INVENTORY</h2>
                    </div>

                    {/* Top Content - Info Alert and Table */}
                    <div className="px-8 py-6 space-y-6 flex-shrink-0 overflow-y-auto" >
                        {/* Info Alert */}

                        <div className="px-8 py-6 space-y-6 flex-shrink-0 bg-white">
                            {/* Transfer Section with Arrow */}
                            <div className="relative">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* From Location */}
                                    <div className="relative bg-white">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            From Location
                                        </label>
                                        <select
                                            value={fromLocation}
                                            onChange={(e) => setFromLocation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                                        >
                                            <option>Warehouse</option>
                                            <option>Expo Branch</option>
                                            <option>Ardia Branch</option>
                                            <option>Qorain Branch</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>

                                    {/* Arrow Column */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                            <img src={dashed_arrow} alt="" />
                                        </div>
                                    </div>

                                    {/* To Location */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            To Location
                                        </label>
                                        <select
                                            value={toLocation}
                                            onChange={(e) => setToLocation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                                        >
                                            <option>Kuwait City Branch</option>
                                            <option>Downtown Branch</option>
                                            <option>Mall Branch</option>
                                            <option>Airport Branch</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product, SKU, and Quantity */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Product */}
                                <div>
                                  
                                </div>

                                {/* SKU */}
                                <div className="relative">
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            Transfer Reason
                                        </label>
                                        <select
                                            value={toLocation}
                                            onChange={(e) => setToLocation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                                        >
                                            <option>Branch Replenishment</option>
                                            <option>Downtown Branch</option>
                                            <option>Mall Branch</option>
                                            <option>Airport Branch</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>

                                {/* Quantity to Transfer */}
                                <div className="relative">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 bg-[#F7F9FA] rounded-lg p-4 mx-12">
                        <div className="flex-shrink-0 mt-0.5">
                            <img src={exclaimation_icon} alt="" />
                        </div>
                        <p className="text-sm text-gray-700 ">✔ Stock transfer created successfully</p>
                    </div>

                    {/* Spacer to push bottom content down */}
                    <div className="flex-1"></div>

                    {/* Bottom Content - Form Fields */}


                    {/* Footer Buttons - Fixed at Bottom */}
                    <div className="px-8 py-6 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-[#1773CF33] cursor-pointer  text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmTransfer}
                                className="px-6 py-3 bg-[#1773CF] cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Confirm Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }