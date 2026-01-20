import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateStock } from '../inventorySlice';

export const StockAdjustmentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.inventory);
  const [adjustment, setAdjustment] = useState({
    productId: '',
    type: 'IN' as 'IN' | 'OUT' | 'ADJUSTMENT',
    quantity: 0,
    reason: '',
    reference: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adjustment.productId && adjustment.quantity > 0 && adjustment.reason.trim()) {
      dispatch(updateStock({
        ...adjustment,
        performedBy: 'Current User',
      }));
      setAdjustment({
        productId: '',
        type: 'IN',
        quantity: 0,
        reason: '',
        reference: '',
      });
      alert('Stock adjusted successfully!');
    }
  };

  const selectedProduct = products.find(p => p.id === adjustment.productId);

  return (
    <div>
      <h1>Stock Adjustment</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select 
            value={adjustment.productId}
            onChange={(e) => setAdjustment({...adjustment, productId: e.target.value})}
            required
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Current: {product.stockQuantity})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Adjustment Type:</label>
          <select 
            value={adjustment.type}
            onChange={(e) => setAdjustment({...adjustment, type: e.target.value as any})}
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
            <option value="ADJUSTMENT">Set Quantity</option>
          </select>
        </div>

        <div>
          <label>Quantity:</label>
          <input 
            type="number" 
            min="1"
            value={adjustment.quantity || ''}
            onChange={(e) => setAdjustment({...adjustment, quantity: parseInt(e.target.value) || 0})}
            required
          />
        </div>

        <div>
          <label>Reason:</label>
          <input 
            type="text" 
            placeholder="e.g., Restock, Sale, Damage, etc."
            value={adjustment.reason}
            onChange={(e) => setAdjustment({...adjustment, reason: e.target.value})}
            required
          />
        </div>

        <div>
          <label>Reference (Optional):</label>
          <input 
            type="text" 
            placeholder="e.g., PO-001, SO-001"
            value={adjustment.reference}
            onChange={(e) => setAdjustment({...adjustment, reference: e.target.value})}
          />
        </div>

        {selectedProduct && (
          <div>
            <p>Current Stock: {selectedProduct.stockQuantity}</p>
            <p>After Adjustment: {
              adjustment.type === 'IN' ? selectedProduct.stockQuantity + adjustment.quantity :
              adjustment.type === 'OUT' ? selectedProduct.stockQuantity - adjustment.quantity :
              adjustment.quantity
            }</p>
          </div>
        )}

        <button type="submit">Submit Adjustment</button>
      </form>
    </div>
  );
};

export default StockAdjustmentPage;