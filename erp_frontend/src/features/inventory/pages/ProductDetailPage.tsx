import React, {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectProduct, updateProduct, updateStock } from '../inventorySlice';
import { ProductForm } from '../components/ProductForm';
import { StockMovementTable } from '../components/StockMovementTable';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct, stockMovements } = useAppSelector((state) => state.inventory);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(selectProduct(id));
    }
  }, [id, dispatch]);

  const handleSave = (productData: any) => {
    if (id) {
      dispatch(updateProduct({ id, ...productData }));
      setIsEditing(false);
    }
  };

  const handleAdjustStock = () => {
    const quantity = prompt('Enter stock adjustment quantity:');
    const reason = prompt('Enter reason:');
    if (quantity && reason && id) {
      dispatch(updateStock({
        productId: id,
        quantity: parseInt(quantity),
        type: 'ADJUSTMENT',
        reason,
        performedBy: 'Current User',
      }));
    }
  };

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const productMovements = stockMovements.filter(m => m.productId === id);

  return (
    <div>
      <div>
        <button onClick={() => navigate('/inventory')}>Back</button>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel Edit' : 'Edit'}
        </button>
        <button onClick={handleAdjustStock}>Adjust Stock</button>
      </div>

      {isEditing ? (
        <ProductForm 
          product={selectedProduct}
          onSubmit={handleSave}
        />
      ) : (
        <div>
          <h1>{selectedProduct.name}</h1>
          <p>SKU: {selectedProduct.sku}</p>
          <p>Description: {selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
          <p>Stock: {selectedProduct.stockQuantity} {selectedProduct.unit}</p>
          <p>Status: {selectedProduct.isActive ? 'Active' : 'Inactive'}</p>
        </div>
      )}

      <h2>Stock Movement History</h2>
      <StockMovementTable movements={productMovements} />
    </div>
  );
};

export default ProductDetailPage;