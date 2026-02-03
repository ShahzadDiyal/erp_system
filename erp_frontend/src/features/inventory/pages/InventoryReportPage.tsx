// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';

import history_icon  from '../../../assets/icons/history_icon.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import export_excel from '../../../assets/icons/export_excel.svg';
import export_pdf from '../../../assets/icons/export_pdf.svg';
import search_icon from '../../../assets/icons/search_icon.svg';
import filterIcon from '../../../assets/icons/filter_icon.svg';

type TabType = 'stock-summary' | 'inventory-movement' | 'low-stock' | 'damage-discard' | 'transfer-history';

export default function DashboardPage() {
    // const [showProductDetails, setShowProductDetails] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showBulkTransfer] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('stock-summary');

    // Mock data for Stock Summary
    const stockSummaryData = [
        {
            id: 1,
            name: 'Ergonomic Office Chair',
            sku: 'CHAIR-001',
            category: 'Furniture',
            branch: 'Main Warehouse',
            available: 45,
            reserved: 5,
            damaged: 2,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        },
        {
            id: 2,
            name: 'Wireless Keyboard',
            sku: 'KB-202',
            category: 'Electronics',
            branch: 'Downtown Store',
            available: 23,
            reserved: 8,
            damaged: 1,
            status: 'Low Stock',
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=150&h=150&fit=crop'
        },
        {
            id: 3,
            name: 'Desk Lamp LED',
            sku: 'LAMP-789',
            category: 'Lighting',
            branch: 'Main Warehouse',
            available: 0,
            reserved: 0,
            damaged: 3,
            status: 'Out of Stock',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&h=150&fit=crop'
        },
        {
            id: 4,
            name: 'Monitor 27" 4K',
            sku: 'MON-456',
            category: 'Electronics',
            branch: 'Tech Store',
            available: 12,
            reserved: 3,
            damaged: 0,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=150&h=150&fit=crop'
        },
        {
            id: 5,
            name: 'Notebook Set',
            sku: 'NOTE-123',
            category: 'Stationery',
            branch: 'Main Warehouse',
            available: 150,
            reserved: 20,
            damaged: 5,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=150&h=150&fit=crop'
        },
    ];

    // Mock data for Inventory Movement
    const inventoryMovementData = [
        {
            id: 1,
            date: '2026-01-20',
            product: 'Ergonomic Office Chair',
            type: 'Transfer',
            from: 'Main Warehouse',
            to: 'Downtown Store',
            quantity: 10,
            balanceAfter: 45,
            user: 'John Smith'
        },
        {
            id: 2,
            date: '2026-01-19',
            product: 'Wireless Keyboard',
            type: 'Sale',
            from: 'Downtown Store',
            to: 'Customer',
            quantity: -5,
            balanceAfter: 23,
            user: 'Sarah Johnson'
        },
        {
            id: 3,
            date: '2026-01-18',
            product: 'Monitor 27" 4K',
            type: 'Purchase',
            from: 'Supplier',
            to: 'Tech Store',
            quantity: 15,
            balanceAfter: 27,
            user: 'Mike Davis'
        },
        {
            id: 4,
            date: '2026-01-17',
            product: 'Desk Lamp LED',
            type: 'Damage',
            from: 'Main Warehouse',
            to: 'Damaged Stock',
            quantity: -3,
            balanceAfter: 0,
            user: 'Emily Wilson'
        },
        {
            id: 5,
            date: '2026-01-16',
            product: 'Notebook Set',
            type: 'Restock',
            from: 'Supplier',
            to: 'Main Warehouse',
            quantity: 100,
            balanceAfter: 175,
            user: 'John Smith'
        },
    ];

    // Mock data for Low Stock Report
    const lowStockData = [
        {
            id: 1,
            product: 'Wireless Keyboard',
            name: 'KB-202',
            branch: 'Downtown Store',
            available: 23,
            threshold: 50,
            shortage: 27,
            suggestedAction: 'Reorder Now'
        },
        {
            id: 2,
            product: 'Desk Lamp LED',
            name: 'LAMP-789',
            branch: 'Main Warehouse',
            available: 0,
            threshold: 20,
            shortage: 20,
            suggestedAction: 'Critical - Reorder Immediately'
        },
        {
            id: 3,
            product: 'Monitor 27" 4K',
            name: 'MON-456',
            branch: 'Tech Store',
            available: 12,
            threshold: 25,
            shortage: 13,
            suggestedAction: 'Reorder Soon'
        },
        {
            id: 4,
            product: 'USB Cable Set',
            name: 'USB-333',
            branch: 'Downtown Store',
            available: 8,
            threshold: 30,
            shortage: 22,
            suggestedAction: 'Reorder Now'
        },
        {
            id: 5,
            product: 'Power Bank',
            name: 'PWR-777',
            branch: 'Tech Store',
            available: 5,
            threshold: 15,
            shortage: 10,
            suggestedAction: 'Reorder Soon'
        },
    ];

    // Mock data for Damage & Discard Report
    const damageDiscardData = [
        {
            id: 1,
            product: 'Desk Lamp LED',
            name: 'LAMP-789',
            branch: 'Main Warehouse',
            quantity: 3,
            status: 'Damaged',
            financialImpact: 75,
            reference: 'DMG-2026-001'
        },
        {
            id: 2,
            product: 'Wireless Keyboard',
            name: 'KB-202',
            branch: 'Downtown Store',
            quantity: 1,
            status: 'Damaged',
            financialImpact: 45,
            reference: 'DMG-2026-002'
        },
        {
            id: 3,
            product: 'Ergonomic Office Chair',
            name: 'CHAIR-001',
            branch: 'Main Warehouse',
            quantity: 2,
            status: 'Discarded',
            financialImpact: 300,
            reference: 'DIS-2026-001'
        },
        {
            id: 4,
            product: 'Notebook Set',
            name: 'NOTE-123',
            branch: 'Main Warehouse',
            quantity: 5,
            status: 'Damaged',
            financialImpact: 25,
            reference: 'DMG-2026-003'
        },
        {
            id: 5,
            product: 'Monitor 27" 4K',
            name: 'MON-456',
            branch: 'Tech Store',
            quantity: 1,
            status: 'Damaged',
            financialImpact: 450,
            reference: 'DMG-2026-004'
        },
    ];

    // Mock data for Transfer History
    const transferHistoryData = [
        {
            id: 1,
            transferId: 'TRF-2026-001',
            from: 'Main Warehouse',
            to: 'Downtown Store',
            products: 'Office Chair, Desk Lamp',
            units: 15,
            status: 'Completed',
            date: '2026-01-20'
        },
        {
            id: 2,
            transferId: 'TRF-2026-002',
            from: 'Tech Store',
            to: 'Main Warehouse',
            products: 'Monitor, Keyboard',
            units: 8,
            status: 'In Transit',
            date: '2026-01-19'
        },
        {
            id: 3,
            transferId: 'TRF-2026-003',
            from: 'Downtown Store',
            to: 'Tech Store',
            products: 'Notebook Set',
            units: 50,
            status: 'Completed',
            date: '2026-01-18'
        },
        {
            id: 4,
            transferId: 'TRF-2026-004',
            from: 'Main Warehouse',
            to: 'Downtown Store',
            products: 'Wireless Keyboard, USB Cable',
            units: 20,
            status: 'Pending',
            date: '2026-01-17'
        },
        {
            id: 5,
            transferId: 'TRF-2026-005',
            from: 'Tech Store',
            to: 'Main Warehouse',
            products: 'Power Bank',
            units: 10,
            status: 'Completed',
            date: '2026-01-16'
        },
    ];

    // const handleViewProduct = (product: any) => {
    //     setSelectedProduct(product);
    //     setShowProductDetails(true);
    // };

    const handleProductSelect = (productId: number) => {
        setSelectedProductIds(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedProductIds.length === stockSummaryData.length) {
            setSelectedProductIds([]);
        } else {
            setSelectedProductIds(stockSummaryData.map(p => p.id));
        }
    };

    const handleBulkTransfer = () => {
        if (selectedProductIds.length === 0) {
            alert('Please select at least one product to transfer');
            return;
        }
        console.log('Transfer products:', selectedProductIds);
        alert(`Transferring ${selectedProductIds.length} product(s)`);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'stock-summary':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    {showBulkTransfer && (
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedProductIds.length === stockSummaryData.length}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </th>
                                    )}
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Available</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Reserved</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Damaged</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {stockSummaryData.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        {showBulkTransfer && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProductIds.includes(product.id)}
                                                    onChange={() => handleProductSelect(product.id)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                />
                                            </td>
                                        )}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900 font-mono">{product.sku}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium">{product.category}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{product.branch}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{product.available}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-blue-600">{product.reserved}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-red-600">{product.damaged}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-2 text-xs font-medium rounded-lg ${
                                                product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'inventory-movement':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">From → To</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Balance After</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">User</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {inventoryMovementData.map((movement) => (
                                    <tr key={movement.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{movement.date}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{movement.product}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${
                                                movement.type === 'Transfer' ? 'bg-blue-100 text-blue-800' :
                                                movement.type === 'Sale' ? 'bg-green-100 text-green-800' :
                                                movement.type === 'Purchase' ? 'bg-purple-100 text-purple-800' :
                                                movement.type === 'Damage' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {movement.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{movement.from} → {movement.to}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-[14px] font-semibold ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{movement.balanceAfter}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{movement.user}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'low-stock':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Available</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Threshold</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Shortage</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Suggested Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {lowStockData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{item.product}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900 font-mono">{item.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{item.branch}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-[14px] font-semibold ${item.available === 0 ? 'text-red-600' : item.available < 10 ? 'text-orange-600' : 'text-yellow-600'}`}>
                                                {item.available}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{item.threshold}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-red-600">{item.shortage}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${
                                                item.suggestedAction.includes('Critical') ? 'bg-red-100 text-red-800' :
                                                item.suggestedAction.includes('Now') ? 'bg-orange-100 text-orange-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {item.suggestedAction}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'damage-discard':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Branch</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Financial Impact (KWD)</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {damageDiscardData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{item.product}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900 font-mono">{item.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{item.branch}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{item.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${
                                                item.status === 'Damaged' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-semibold text-red-600">-{item.financialImpact.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900 font-mono">{item.reference}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'transfer-history':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Transfer ID</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">From → To</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Products</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Units</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {transferHistoryData.map((transfer) => (
                                    <tr key={transfer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-mono text-blue-600">{transfer.transferId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{transfer.from} → {transfer.to}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-[14px] text-gray-900">{transfer.products}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{transfer.units}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-lg ${
                                                transfer.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                transfer.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {transfer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{transfer.date}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Inventory Reports Header */}
                 <div className="px-6">
          <div className='flex flex-row items-center'>
            <img src={history_icon} alt="" />
            <h1 className="text-2xl font-bold text-gray-900 mx-2">Inventory Reports</h1></div>
          <p className="text-[#33333399] mt-2 font-semibold">Track stock levels, inventory movement, and product performance across all branches.</p>
        </div>

                {/* Products Table Section */}
                <div className="bg-white rounded-xl overflow-hidden">
                    {/* Filters Row */}
                    <div className="p-6">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                            {/* Date Filter */}
                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Date</option>
                                    <option>Today</option>
                                    <option>Last 7 Days</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Branches</option>
                                    <option>Main Warehouse</option>
                                    <option>Downtown Store</option>
                                    <option>Tech Store</option>
                                    <option>Online Store</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Categories</option>
                                    <option>Furniture</option>
                                    <option>Electronics</option>
                                    <option>Lighting</option>
                                    <option>Stationery</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            {/* Stock Status Filter */}
                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Stock Status</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                    <option>Pre Order</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            {/* Filter Icon Button */}
                            <div className="flex-shrink-0">
                                <button className="w-14 h-14 flex items-center justify-center cursor-pointer">
                                    <img src={filterIcon} alt="Filter" className="w-7 h-7" />
                                </button>
                            </div>
                        </div>

                        {/* Search and Actions Row */}
                        <div className="pt-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Search Field */}
                                <div className="relative w-full sm:w-auto">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <img src={search_icon} alt="Search" className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by Invoice No, Supplier Name…"
                                        className="pl-10 pr-4 py-2.5 border border-[#00000080] rounded-lg focus:border-blue-500 w-full sm:w-[360px]"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-3 w-full sm:w-auto">
                                    <button className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer transition-colors w-full sm:w-auto">
                                        <img src={export_pdf} alt="Add" className="w-7 h-7" />
                                        <span className="text-lg font-medium text-black">Export PDF</span>
                                    </button>

                                    <button className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer transition-colors w-full sm:w-auto">
                                        <img src={export_excel} alt="Export" className="w-7 h-7" />
                                        <span className="text-lg font-medium text-gray-700">Export Excel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="relative mx-6 shadow rounded-xl">
                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 px-6 pt-4" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab('stock-summary')}
                                    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                                        activeTab === 'stock-summary'
                                            ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Stock Summary
                                </button>
                                <button
                                    onClick={() => setActiveTab('inventory-movement')}
                                    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                                        activeTab === 'inventory-movement'
                                            ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Inventory Movement
                                </button>
                                <button
                                    onClick={() => setActiveTab('low-stock')}
                                    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                                        activeTab === 'low-stock'
                                            ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Low Stock Report
                                </button>
                                <button
                                    onClick={() => setActiveTab('damage-discard')}
                                    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                                        activeTab === 'damage-discard'
                                            ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Damage & Discard Report
                                </button>
                                <button
                                    onClick={() => setActiveTab('transfer-history')}
                                    className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                                        activeTab === 'transfer-history'
                                            ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Transfer History
                                </button>
                            </nav>
                        </div>

                        {/* Table Title */}
                        <div className="px-6 py-3">
                            <h2 className="text-xl font-bold text-gray-900">
                                {activeTab === 'stock-summary' && 'PRODUCT LIST (MASTER INVENTORY)'}
                                {activeTab === 'inventory-movement' && 'INVENTORY MOVEMENT LOG'}
                                {activeTab === 'low-stock' && 'LOW STOCK ALERT'}
                                {activeTab === 'damage-discard' && 'DAMAGE & DISCARD RECORDS'}
                                {activeTab === 'transfer-history' && 'TRANSFER HISTORY'}
                            </h2>
                        </div>

                        {/* Table Content */}
                        {renderTabContent()}

                        {/* Bulk Transfer Button */}
                        {showBulkTransfer && selectedProductIds.length > 0 && activeTab === 'stock-summary' && (
                            <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {selectedProductIds.length} product(s) selected
                                    </span>
                                    <button
                                        onClick={handleBulkTransfer}
                                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Transfer Selected Products
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">50</span> products
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    3
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}