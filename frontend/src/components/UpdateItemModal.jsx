import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function UpdateItemModal({ isOpen, item, onRequestClose, onUpdateItem }) {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    if (item) {
      setItemName(item.itemName);
      setQty(item.qty);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateItem({ ...item, itemName, qty: Number(qty) });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Update Item">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <button type="submit">Update Item</button>
        <button onClick={onRequestClose} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </Modal>
  );
}

export default UpdateItemModal;
