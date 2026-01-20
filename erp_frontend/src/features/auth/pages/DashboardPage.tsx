// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
// import { useAppSelector } from '../../../app/hooks';
import icon_1 from '../../../assets/icons/icon_1.svg'
import icon_2 from '../../../assets/icons/icon_2.png'
import icon_3 from '../../../assets/icons/icon_3.png'
import icon_4 from '../../../assets/icons/icon_4.png'
import icon_5 from '../../../assets/icons/icon_5.svg'
import icon_6 from '../../../assets/icons/icon_6.svg'
import icon_7 from '../../../assets/icons/icon_7.svg'
import icon_8 from '../../../assets/icons/icon_8.svg'
import { useState } from 'react';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Types for revenue data
interface RevenueDataPoint {
  day: string;
  revenue: number;
  previousPeriod?: number;
}

interface TimeframeData {
  label: string;
  totalRevenue: number;
  changePercentage: number;
  dataPoints: RevenueDataPoint[];
  periodLabel: string;
}

// Static data that can be easily replaced
const revenueData: Record<'weekly' | 'monthly' | 'yearly', TimeframeData> = {
  weekly: {
    label: 'Weekly',
    totalRevenue: 12743,
    changePercentage: 12.5,
    periodLabel: 'This Week',
    dataPoints: [
      { day: 'Mon', revenue: 1000, previousPeriod: 900 },
      { day: 'Tue', revenue: 800, previousPeriod: 1100 },
      { day: 'Wed', revenue: 1100, previousPeriod: 1000 },
      { day: 'Thu', revenue: 1300, previousPeriod: 1270 },
      { day: 'Fri', revenue: 1600, previousPeriod: 1800 },
      { day: 'Sat', revenue: 1000, previousPeriod: 950 },
      { day: 'Sun', revenue: 1400, previousPeriod: 2300 },
    ]
  },
  monthly: {
    label: 'Monthly',
    totalRevenue: 48750,
    changePercentage: 8.2,
    periodLabel: 'This Month',
    dataPoints: [
      { day: 'Week 1', revenue: 11500, previousPeriod: 10800 },
      { day: 'Week 2', revenue: 12500, previousPeriod: 11800 },
      { day: 'Week 3', revenue: 12750, previousPeriod: 12000 },
      { day: 'Week 4', revenue: 12000, previousPeriod: 11200 },
    ]
  },
  yearly: {
    label: 'Yearly',
    totalRevenue: 585000,
    changePercentage: 15.3,
    periodLabel: 'This Year',
    dataPoints: [
      { day: 'Jan', revenue: 45000, previousPeriod: 42000 },
      { day: 'Feb', revenue: 48000, previousPeriod: 44000 },
      { day: 'Mar', revenue: 52000, previousPeriod: 48000 },
      { day: 'Apr', revenue: 49000, previousPeriod: 45000 },
      { day: 'May', revenue: 51000, previousPeriod: 47000 },
      { day: 'Jun', revenue: 53000, previousPeriod: 49000 },
      { day: 'Jul', revenue: 50000, previousPeriod: 46000 },
      { day: 'Aug', revenue: 52000, previousPeriod: 48000 },
      { day: 'Sep', revenue: 54000, previousPeriod: 50000 },
      { day: 'Oct', revenue: 56000, previousPeriod: 52000 },
      { day: 'Nov', revenue: 58000, previousPeriod: 54000 },
      { day: 'Dec', revenue: 60000, previousPeriod: 55000 },
    ]
  }
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg ">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-600">
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
        {payload[1] && (
          <p className="text-sm text-gray-500">
            Previous: ${payload[1].value.toLocaleString()}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  // const { user } = useAppSelector((state) => state.auth);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const currentData = revenueData[selectedTimeframe];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* ... existing stats grid cards ... */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600">Total Revenue</p>
                <p className="text-[24px] font-semibold text-gray-900 mt-10">$ 12,450</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                <img src={icon_3} alt="" />
              </div>
            </div>
            <div className='flex flex-row items-center mt-2'>
              <img src={icon_6} alt="" className='w-6 h-6 mr-2' />
              <p className="text-md font-semibold text-green-600 ">+24% vs last week</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 ">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600">Pending Orders</p>
                <p className="text-[24px] font-semibold text-gray-900 mt-10">156</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                <img src={icon_4} alt="" />
              </div>
            </div>
            <div className='flex flex-row items-center mt-2'>
              <img src={icon_7} alt="" className='w-6 h-6 mr-2' />
              <p className="text-md font-semibold text-red-600">+24% vs last week</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-[24px] font-semibold text-gray-900 mt-10">23</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                <img src={icon_1} alt="" />
              </div>
            </div>
            <div className='flex flex-row items-center mt-2'>
              <img src={icon_8} alt="" className='w-6 h-6 mr-2' />
              <p className="text-md font-semibold text-red-600">+ 2 New Items</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600">Pending Approvals</p>
                <p className="text-[24px] font-semibold text-gray-900 mt-10">2,847</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                <img src={icon_2} alt="" />
              </div>
            </div>
            <div className='flex flex-row items-center mt-2'>
              <img src={icon_5} alt="" className='w-6 h-6 mr-2' />
              <p className="text-md font-semibold text-gray-600">requests awaiting admin approval</p>
            </div>
          </div>
        </div>

        {/* Revenue Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Revenue Analysis Chart */}
          <div className="lg:col-span-2 bg-white rounded-md p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Revenue Analysis</h2>
                <p className="text-sm text-gray-600 mt-1">Sales performance across all channels</p>
              </div>
              <div className="flex space-x-2 mt-3 sm:mt-0">
                {(['weekly', 'monthly', 'yearly'] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTimeframe === timeframe
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {revenueData[timeframe].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Total */}
            <div className="mb-6">
              <p className="text-3xl font-bold items-center text-gray-900">
                ${currentData.totalRevenue.toLocaleString()}   <span className="bg-gray-100 rounded-full p-2 text-sm font-medium text-green-600">
                  +{currentData.changePercentage}%
                </span>
              </p>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={currentData.dataPoints}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>

                    <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#93C5FD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />

                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    strokeWidth={3}
                    stroke="#1773cf"
                    fill="url(#colorRevenue)"
                    activeDot={{ r: 6 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="previousPeriod"
                    strokeWidth={2}
                    stroke="#a3c1de"
                    fill="url(#colorPrevious)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Revenue Table */}
          <div className="bg-white rounded-lg  p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Channels Contribution</h3>

            {/* Three Concentric Circles */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Outer Circle - POS (45%) - Blue */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">

                  {/* Progress circle - 45% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#91C0EECC"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="400.743" // 2 * π * r (2 * 3.14159 * 45)
                    strokeDashoffset="155.508" // 282.743 * (1 - 0.45)
                    transform="rotate(-190 50 50)"
                  />
                </svg>

              </div>

              {/* Middle Circle - Website (30%) - Green */}
              <div className="absolute inset-0 p-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">

                  {/* Progress circle - 30% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="#1773CF99"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="320.911" // 2 * π * r (2 * 3.14159 * 35)
                    strokeDashoffset="153.938" // 219.911 * (1 - 0.30)
                    transform="rotate(-100 50 50)"
                  />
                </svg>

              </div>

              {/* Inner Circle - Mobile App (25%) - Purple */}
              <div className="absolute inset-0 p-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">

                  {/* Progress circle - 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    fill="none"
                    stroke="#91C0EE80"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="250.08" // 2 * π * r (2 * 3.14159 * 25)
                    strokeDashoffset="117.81" // 157.08 * (1 - 0.25)
                    transform="rotate(-30 50 50)"
                  />
                </svg>

              </div>

              {/* Center Average */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-gray-900">30%</div>
              </div>
            </div>

            {/* Sales Amount Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <div className="text-md font-medium text-gray-500">POS:  <span className="text-md text-gray-500">45%</span></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <div className="text-md font-medium text-gray-500">Website:  <span className="text-md text-gray-500">30%</span></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <div className="text-md font-medium text-gray-500">Mobile App:  <span className="text-md text-gray-500">25%</span></div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table 1 - Recent Activities (9/12) */}
          <div className="lg:col-span-3 rounded-lg">
            {/* Header with white background */}
            <div className="p-6 bg-white rounded-t-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm mt-2 sm:mt-0">
                  View All 
                </button>
              </div>
            </div>

            {/* Table with white background */}
            <div className="">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-transparent">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity ID
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Module
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: '#73626',
                        module: 'Inventory',
                        description: 'PRD003 moved from Kuwait City → Repair',
                        date: 'Oct 24, 2025',
                        user: { name: 'John Doe', avatar: 'JD' },
                        status: { text: 'Completed', color: 'bg-green-100 text-green-800' }
                      },
                      {
                        id: '#73625',
                        module: 'Sales',
                        description: 'Order #ORD-78945 created from Online Store',
                        date: 'Oct 23, 2025',
                        user: { name: 'Sarah Smith', avatar: 'SS' },
                        status: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
                      },
                      {
                        id: '#73624',
                        module: 'Purchase',
                        description: 'PO #PUR-45612 approved for Office Supplies',
                        date: 'Oct 22, 2025',
                        user: { name: 'Mike Johnson', avatar: 'MJ' },
                        status: { text: 'Completed', color: 'bg-green-100 text-green-800' }
                      },
                      {
                        id: '#73623',
                        module: 'Inventory',
                        description: 'Low stock alert triggered for Office Chairs',
                        date: 'Oct 21, 2025',
                        user: { name: 'Emma Wilson', avatar: 'EW' },
                        status: { text: 'Warning', color: 'bg-red-100 text-red-800' }
                      },
                      {
                        id: '#73622',
                        module: 'Transfer',
                        description: 'Stock transfer initiated: Warehouse A → Branch B',
                        date: 'Oct 20, 2025',
                        user: { name: 'Alex Brown', avatar: 'AB' },
                        status: { text: 'In Progress', color: 'bg-blue-100 text-blue-800' }
                      },
                      {
                        id: '#73621',
                        module: 'Customer',
                        description: 'New customer registration: TechCorp Inc.',
                        date: 'Oct 19, 2025',
                        user: { name: 'Lisa Chen', avatar: 'LC' },
                        status: { text: 'Completed', color: 'bg-green-100 text-green-800' }
                      },
                      {
                        id: '#73620',
                        module: 'Payment',
                        description: 'Invoice #INV-7890 marked as paid',
                        date: 'Oct 18, 2025',
                        user: { name: 'David Kim', avatar: 'DK' },
                        status: { text: 'Completed', color: 'bg-green-100 text-green-800' }
                      }
                    ].map((activity, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{activity.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{activity.module}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            <div className="line-clamp-1">{activity.description}</div>
                            <div className="text-xs text-gray-500 mt-1">Activity details</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{activity.date}</div>
                          <div className="text-xs text-gray-400">10:30 AM</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 text-sm font-semibold">
                              {activity.user.avatar}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{activity.user.name}</div>
                              <div className="text-xs text-gray-500">Staff ID: {activity.id.replace('#', '')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${activity.status.color}`}>
                            <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-70"></span>
                            {activity.status.text}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination or footer */}
              <div className="flex items-center justify-between pt-4 px-3 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">50</span> activities
                </div>
                <div className="flex space-x-2">
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

          {/* Table 2 - Low Stock Alerts (3/12) */}
          <div className="bg-white rounded-xl  p-6 ">
            <div className='flex flex-row items-center mb-2'>
              <img src={icon_1} alt="" />
              <h2 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h2>

            </div>
            <div className="space-y-4">
              {[
                {
                  name: 'Office Chair',
                  sku: 'CHAIR-001',
                  quantity: 5,
                  minStock: 10,
                  category: 'Furniture'
                },
                {
                  name: 'Wireless Mouse',
                  sku: 'MOUSE-202',
                  quantity: 8,
                  minStock: 15,
                  category: 'Electronics'
                },
                {
                  name: 'A4 Paper Pack',
                  sku: 'PAPER-450',
                  quantity: 3,
                  minStock: 20,
                  category: 'Stationery'
                },
                {
                  name: 'Desk Lamp',
                  sku: 'LAMP-789',
                  quantity: 2,
                  minStock: 12,
                  category: 'Furniture'
                },
                {
                  name: 'Notebooks',
                  sku: 'NOTE-123',
                  quantity: 7,
                  minStock: 25,
                  category: 'Stationery'
                }
              ].map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">SKU: {item.sku}</p>
                      <p className="text-xs text-gray-500">Category: {item.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold bg-gray-100 p-1 rounded-xl text-gray-600">{item.quantity} Left</div>
                      <button className=" py-1 text-blue-600 text-lg font-medium rounded transition-colors">
                        Restock
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button className="w-full py-2 text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm">
                View All Alerts →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}