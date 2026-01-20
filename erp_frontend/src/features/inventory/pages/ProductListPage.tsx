import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setFilters, deleteProduct, selectProduct } from '../inventorySlice';
import { ProductTable } from '../components/ProductTable';
import { InventoryAlert } from '../components/InventoryAlert';

export const ProductListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.inventory);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    dispatch(setFilters({ search }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id: string) => {
    dispatch(selectProduct(id));
    // Navigate to edit page
  };

  const lowStockProducts = products.filter(p => p.stockQuantity <= p.lowStockThreshold);

  return (
    <div>
      <h1>Products</h1>
      
      <div>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => window.location.href = '/inventory/add'}>
          Add New Product
        </button>
      </div>

      {lowStockProducts.length > 0 && (
        <InventoryAlert products={lowStockProducts} />
      )}

      <ProductTable 
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductListPage;