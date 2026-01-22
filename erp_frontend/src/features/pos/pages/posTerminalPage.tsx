// src/features/pos/pages/POSTerminalPage.tsx
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

import desktop_icon from '../../../assets/icons/desktop_icon.svg'
import market_icon from '../../../assets/icons/market_icon.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg'
import { Link } from 'react-router-dom';

export default function POSTerminalPage() {
    const [selectedTerminal, setSelectedTerminal] = useState('POS-01 (Front Desk)');
    const [selectedBranch, setSelectedBranch] = useState('Army Market');
    const [openingCash, setOpeningCash] = useState('');

    return (
        <DashboardLayout>
            <div className="min-h-screen ">
                <div className="">
                    {/* Main Container */}
                    <div className="">
                        {/* Header Section with Dropdowns */}
                        <div className="">
                            <div className="bg-white px-8 py-4 rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Terminal Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={desktop_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedTerminal}
                                            onChange={(e) => setSelectedTerminal(e.target.value)}
                                            className="w-full py-3.5 bg-white text-center  border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>POS-01 (Front Desk)</option>
                                            <option>POS-02 (Back Counter)</option>
                                            <option>POS-03 (Drive-Thru)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">

                                </div>

                                {/* Branch Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={market_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>Army Market</option>
                                            <option>Downtown Branch</option>
                                            <option>Mall Branch</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white mt-3 p-6 sm:p-8 lg:p-8">
                            <div className="max-w-8xl mx-auto">

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end">

                                    {/* Opening Cash Input */}
                                    <div className="lg:col-span-7">
                                        <input
                                            type="text"
                                            value={openingCash}
                                            onChange={(e) => setOpeningCash(e.target.value)}
                                            placeholder="Opening Cash Amount"
                                            className="w-full px-5 py-4 bg-white border border-[#00000080] rounded-xl text-[#00000080] font-semibold text-center placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                                        />
                                    </div>

                                    {/* Gap (2/12) – only on large screens */}
                                    <div className="hidden lg:block lg:col-span-2" />

                                    {/* Start POS Button */}
                                    <div className="lg:col-span-3 cursor-pointer">
                                        <Link to='/pos'>
                                            <button className="w-full px-8 sm:px-12 py-4 bg-[#1773CF] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform active:translate-y-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
                                                Start POS
                                            </button>
                                        </Link>

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