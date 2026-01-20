import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
// import { Supplier } from '../../../types/inventory';

export const SupplierPage: React.FC = () => {
  const { suppliers } = useAppSelector((state) => state.inventory);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleAddSupplier = () => {
    if (newSupplier.name.trim()) {
      // Add supplier logic here
      console.log('Adding supplier:', newSupplier);
      setNewSupplier({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  };

  return (
    <div>
      <h1>Suppliers</h1>
      
      <div>
        <h2>Add New Supplier</h2>
        <input 
          type="text" 
          placeholder="Supplier Name" 
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Contact Person" 
          value={newSupplier.contactPerson}
          onChange={(e) => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newSupplier.email}
          onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
        />
        <input 
          type="tel" 
          placeholder="Phone" 
          value={newSupplier.phone}
          onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
        />
        <textarea 
          placeholder="Address" 
          value={newSupplier.address}
          onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
        />
        <button onClick={handleAddSupplier}>Add Supplier</button>
      </div>

      <div>
        <h2>Supplier List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contactPerson}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.productCount}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierPage;