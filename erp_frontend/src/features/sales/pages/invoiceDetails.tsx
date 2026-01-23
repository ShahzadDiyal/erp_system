// src/features/sales/pages/InvoiceDetails.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';

export default function InvoiceDetails() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice #INV-001</h1>
            <p className="text-gray-600 mt-1">Details and actions</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border rounded-lg">Print</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Invoice Information</h2>
          <div className="p-8 border-2 border-dashed rounded-lg text-center">
            <p className="text-gray-500">Invoice details will appear here</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
