// src/features/hr/pages/LeaveRequestDetails.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
// import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg';
import dropdown_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import edit_icon from '../../../assets/icons/edit_icon.svg';
import active_icon from '../../../assets/icons/active_rounded_icon.svg';
// import { useAppSelector } from '../../../app/hooks';
// import type { RootState } from '../../../app/store';

export default function LeaveRequestDetails() {
            //  const { user } = useAppSelector((state: RootState) => state.auth);

    
    const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
    const [employmentDetailsOpen, setEmploymentDetailsOpen] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);




    // Mock data
    const employeeData = {
        name: 'Ayesha Khan',
        status: 'Active',
        personalDetails: {
            employeeId: 'EMP00123',
            employeeName: 'Ayesha Khan',
            gender: 'Female',
            dob: '15-03-1990',
            phone: '+92 300 1234567',
            email: 'ayesha.khan@company.com',
            address: '123 Main Street, Karachi, Pakistan'
        },
        employmentDetails: {
            role: 'Senior Developer',
            department: 'Engineering',
            branch: 'Karachi HQ',
            joiningDate: '15-01-2020',
            employmentType: 'Full-time'
        },
        stats: {
            totalWorkingDays: 26,
            absent: 2,
            lateArrivals: 2,
            present: 22
        },
        lastSync: '09:30 AM',
        attendance: [
            { date: '2024-01-01', checkIn: '09:00 AM', checkOut: '06:00 PM', source: 'Mobile App', status: 'Present' },
            { date: '2024-01-02', checkIn: '09:15 AM', checkOut: '06:00 PM', source: 'Desktop', status: 'Late' },
            { date: '2024-01-03', checkIn: '09:00 AM', checkOut: '06:00 PM', source: 'Mobile App', status: 'Present' },
            { date: '2024-01-04', checkIn: '09:00 AM', checkOut: '05:45 PM', source: 'Desktop', status: 'Present' },
            { date: '2024-01-05', checkIn: '-', checkOut: '-', source: '-', status: 'Absent' },
        ]
    };

    const personalFields = [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'employeeName', label: 'Employee Name' },
        { key: 'gender', label: 'Gender' },
        { key: 'dob', label: 'Date of Birth' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'address', label: 'Address' }
    ];

    const employmentFields = [
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department' },
        { key: 'branch', label: 'Branch' },
        { key: 'joiningDate', label: 'Joining Date' },
        { key: 'employmentType', label: 'Employment Type' }
    ];

    const handleFieldClick = (fieldKey: string) => {
        setEditingField(fieldKey === editingField ? null : fieldKey);
    };


           // Check user role
//   const isSuperAdmin = user?.role?.role_name === 'Super Admin';
//   const isHR = user?.role?.role_name === 'HR';


//    const basePath = isSuperAdmin 
//     ? '/admin' 
//     : isHR 
//         ? '/hr'
//         : '';

   


    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gray-50">
                <div className="px-4 md:px-6 py-6 ">
                    {/* Back Button */}
                    {/* <div className="mb-3">
                       <Link to={`${basePath}/hr`} className='inline-flex items-center text-gray-600 hover:text-gray-900'>
  <img src={arrow_back_icon} alt="Back" className='w-5 h-5 mr-2' />
  <span className="text-md font-medium">Back</span>
</Link>
                    </div> */}

                    {/* First Row: Employee Name and Active Button */}
                    <div className="px-3 py-6 mb-3">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">{employeeData.name}</h1>
                            <button className="inline-flex items-center px-4 py-2 border border-[#0088FF] rounded-full text-green-800 cursor-pointer">
                                <span className="text-md font-medium px-4 text-[#0088FF]">Active</span>
                                <img src={active_icon} alt="Active" className="w-7 h-7 mr-2" />

                            </button>
                        </div>
                    </div>

                    {/* Second Row: Personal Details Dropdown */}
                    <div className="bg-white rounded-[20px] shadow-sm mb-6 overflow-hidden">
                        <button
                            onClick={() => setPersonalDetailsOpen(!personalDetailsOpen)}
                            className="w-full p-6 flex items-center justify-between"
                        >
                            <span className="text-lg font-medium text-gray-900">Personal Details</span>
                            <div className="flex items-center cursor-pointer">
                                {personalDetailsOpen && (
                                    <img src={edit_icon} alt="Edit" className="w-5 h-5 mr-3" />
                                )}
                                <img
                                    src={dropdown_icon}
                                    alt="Dropdown"
                                    className={`w-5 h-5 transform transition-transform ${personalDetailsOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </button>

                        {personalDetailsOpen && (
                            <div className="px-6 pb-4 transition-all duration-800 ease-in-out">
                                {personalFields.map((field) => (
                                    <div
                                        key={field.key}
                                        onClick={() => handleFieldClick(field.key)}
                                        className={`py-4 cursor-pointer  transition-all duration-800 ease-in-out bg-gray-100 rounded-md px-8 ${editingField === field.key ? 'bg-blue-50 mt-12' : 'mt-4'
                                            }`}
                                    >
                                        {editingField === field.key ? (
                                            <div className="relative">
                                                <label className="absolute -top-12 bg-white text-md font-medium text-gray-600 transition-all duration-800 ease-in-out">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={employeeData.personalDetails[field.key as keyof typeof employeeData.personalDetails]}
                                                    className="w-full pt-2"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600 transition-all duration-800 ease-in-out">
                                                    {field.label}
                                                </span>
                                                <span className=" transition-all duration-800 ease-in-out">
                                                    {employeeData.personalDetails[field.key as keyof typeof employeeData.personalDetails]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Third Row: Employment Details Dropdown */}
                    <div className="bg-white rounded-[20px] shadow-sm mb-6 overflow-hidden">
                        <button
                            onClick={() => setEmploymentDetailsOpen(!employmentDetailsOpen)}
                            className="w-full p-6 flex items-center justify-between "
                        >
                            <span className="text-lg font-medium text-gray-900">Employment Details</span>
                            <div className="flex items-center">
                                {employmentDetailsOpen && (
                                    <img src={edit_icon} alt="Edit" className="w-5 h-5 mr-3" />
                                )}
                                <img
                                    src={dropdown_icon}
                                    alt="Dropdown"
                                    className={`w-5 h-5 transform transition-transform ${employmentDetailsOpen ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </button>

                        {employmentDetailsOpen && (
                            <div className="px-6 pb-6">
                                {employmentFields.map((field) => (
                                    <div
                                        key={field.key}
                                        onClick={() => handleFieldClick(`emp_${field.key}`)}
                                        className={`py-4 cursor-pointer transition-all duration-800 ease-in-out bg-gray-100 rounded-md px-8 ${editingField === `emp_${field.key}` ? 'bg-blue-50 mt-12' : 'mt-4'
                                            }`}
                                    >
                                        {editingField === `emp_${field.key}` ? (
                                            <div className="relative">
                                                <label className="absolute -top-12 left-0 bg-white transition-all duration-800 ease-in-out text-md font-medium text-gray-600">
                                                    {field.label}
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={employeeData.employmentDetails[field.key as keyof typeof employeeData.employmentDetails]}
                                                    className="w-full pt-2"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {field.label}
                                                </span>
                                                <span className="text-gray-900">
                                                    {employeeData.employmentDetails[field.key as keyof typeof employeeData.employmentDetails]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Fourth Row: Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                        {/* Card 1: Total Working Days */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                             <div className="text-lg font-semibold text-gray-600 mb-6">Total Working Days</div>
                            <div className="text-3xl font-semibold text-gray-900 mb-2">{employeeData.stats.totalWorkingDays}
                            </div>
                        </div>

                        {/* Card 2: Absent */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="text-lg font-semibold text-gray-600 mb-6">Absent</div>

                            <div className="text-3xl font-semibold text-gray-900 mb-2">{employeeData.stats.absent}</div>
                        </div>

                        {/* Card 3: Late Arrivals */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="text-lg font-semibold text-gray-600 mb-6">Late Arrivals</div>

                            <div className="text-3xl font-semibold text-gray-900 mb-2">{employeeData.stats.lateArrivals}</div>
                        </div>

                        {/* Card 4: Present */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="text-lg font-semibold text-gray-600 mb-6">Present</div>

                            <div className="text-3xl font-semibold text-gray-900 mb-2">{employeeData.stats.present}</div>
                        </div>
                    </div>

                    {/* Fourth Row: Last Sync */}
                    <div className="bg-white rounded-full shadow-sm p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-md text-[#0088FF] font-semibold px-4">Last sync</span>
                            <span className="text-md font-medium text-[#0088FF] border rounded-full border-[#0088FF] py-2 px-4" >{employeeData.lastSync}</span>
                        </div>
                    </div>

                    {/* Fifth Row: Attendance Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {employeeData.attendance.map((record, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                                                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}