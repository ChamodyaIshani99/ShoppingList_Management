import React, { useState, useEffect } from 'react';

const AddItem = () => {
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [state, setState] = useState('buy');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!userId || !itemId || !quantity) {
      alert('Please fill all fields');
      return;
    }

    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const newItem = {
      itemId,
      quantity
    };

    setItems([...items, newItem]);
    setItemId('');
    setQuantity('');
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleEdit = (index) => {
    const item = items[index];
    setEditItemId(item.itemId);
    setEditQuantity(item.quantity);
    setEditIndex(index);
    setShowUpdateModal(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    if (!editItemId || !editQuantity) {
      alert('Please fill all fields');
      return;
    }

    if (editQuantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }

    const updatedItems = [...items];
    updatedItems[editIndex] = { itemId: editItemId, quantity: editQuantity };

    setItems(updatedItems);
    setShowUpdateModal(false);
    setEditIndex(null);
  };

  const handleCancelAll = () => {
    setItems([]);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate < today) {
      alert("You can't select a past date!");
    } else {
      setDate(selectedDate);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side Form */}
        <div className="col-md-6">
          <h2>Add New Item</h2>
          <form onSubmit={handleAddItem}>
            <div className="form-group mb-3">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={handleDateChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>State</label>
              <select
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="buy">Buy</option>
                <option value="not buy">Not Buy</option>
              </select>
            </div>

            <hr />

            <div className="form-group mb-3">
              <label>Item ID</label>
              <input
                type="text"
                className="form-control"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter Item ID"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
                min="1"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Add Item
            </button>
          </form>
          <br />
          <input class="btn btn-success" type="submit" value="Submit"></input>
        </div>

        {/* Right Side Item List */}
        <div className="col-md-6">
          <h2>Items List</h2>

          {items.length === 0 ? (
            <p>No items added yet</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Item ID</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemId}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(index)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {items.length > 0 && (
              <button
                type="button"
                className="btn btn-danger float-end"
                onClick={handleCancelAll}
              >
                Cancel All
              </button>
            )}
        </div>
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <form onSubmit={handleUpdateItem}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowUpdateModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label>Item ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editItemId}
                      onChange={(e) => setEditItemId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;

