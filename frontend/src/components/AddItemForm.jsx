import React, { useState } from 'react';

function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !qty) {
      alert('Please enter both item name and quantity');
      return;
    }

    onAddItem({ itemName, qty: Number(qty) });
    setItemName('');
    setQty('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;

