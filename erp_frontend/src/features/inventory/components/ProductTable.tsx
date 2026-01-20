import React from 'react';
import type { Product } from '../../../types/inventory';
import { useAppSelector } from '../../../app/hooks';

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const { categories, suppliers } = useAppSelector((state) => state.inventory);

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Unknown';
  };

  const getSupplierName = (id: string) => {
    return suppliers.find(s => s.id === id)?.name || 'Unknown';
  };

  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Cost</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{getCategoryName(product.categoryId)}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.cost.toFixed(2)}</td>
            <td>
              {product.stockQuantity} {product.unit}
              {product.stockQuantity <= product.lowStockThreshold && ' ⚠️'}
            </td>
            <td>{product.isActive ? 'Active' : 'Inactive'}</td>
            <td>
              <button onClick={() => onEdit(product.id)}>Edit</button>
              <button onClick={() => onDelete(product.id)}>Delete</button>
              <button onClick={() => window.location.href = `/inventory/${product.id}`}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};