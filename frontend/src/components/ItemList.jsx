import React from 'react';

function ItemList({ items, onDelete, onEdit }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '10px' }}>Item Name</th>
          <th style={{ border: '1px solid #ccc', padding: '10px' }}>Quantity</th>
          <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.itemName}</td>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.qty}</td>
            <td style={{ border: '1px solid #ccc', padding: '10px' }}>
              <button onClick={() => onEdit(item)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemList;
