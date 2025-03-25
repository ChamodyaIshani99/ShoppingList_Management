import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const AddItem = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shoppingListId, setShoppingListId] = useState("SL01");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("buy");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Generate Shopping List ID
  useEffect(() => {
    setShoppingListId(`SL${Date.now()}`); // Unique timestamp-based ID
}, []);



  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Handle item addition
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName || quantity < 1) return;

    // Prevent duplicate item names
    if (items.some((item) => item.itemName.toLowerCase() === itemName.toLowerCase())) {
      alert("Item already exists in the shopping list!");
      return;
    }

    const newItem = { itemName, quantity };
    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
  };

  // Handle item deletion
  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Handle item update
  const handleEdit = (index) => {
    setEditingIndex(index);
    setItemName(items[index].itemName);
    setQuantity(items[index].quantity);
    setShowModal(true);
  };

  // Save updated item
  const handleSaveChanges = () => {
    const updatedItems = [...items];

    // Prevent duplicate item names in edit mode
    if (
      items.some(
        (item, idx) =>
          idx !== editingIndex && item.itemName.toLowerCase() === itemName.toLowerCase()
      )
    ) {
      alert("Item already exists in the shopping list!");
      return;
    }

    updatedItems[editingIndex] = { itemName, quantity };
    setItems(updatedItems);
    setShowModal(false);
    setEditingIndex(null);
    setItemName("");
    setQuantity("");
  };

  // Handle cancel all items
  const handleCancelAll = () => {
    setItems([]);
  };

  // Handle shopping list submission
  const handleSubmitShoppingList = () => {
    const shoppingList = {
      shoppingId: shoppingListId,  // Ensure this field is included
      dateAdded: date,
      status,
      items,
    };
    

    // Log the shopping list object to inspect its structure
    console.log("Submitting Shopping List:", shoppingList);

    axios
      .post("http://localhost:4000/api/shoppingList/add", shoppingList)
      .then(() => {
        alert("Shopping List Added");
        setItems([]);
        setItemName("");
        setQuantity("");
      })
      .catch((err) => {
        console.error("Error submitting shopping list:", err);
        alert("Error submitting shopping list: " + (err.response ? err.response.data.message : err.message));
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side Form */}
        <div className="col-md-6">
          <h2>Add New Item</h2>
          <form onSubmit={handleAddItem}>
            <div className="form-group mb-3">
              <label>ShoppingList ID</label>
              <input type="text" className="form-control" value={shoppingListId} disabled />
            </div>

            <div className="form-group mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Restrict past dates
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Status</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="buy">Buy</option>
                <option value="not">Not Buy</option>
              </select>
            </div>

            <hr />

            <div className="form-group mb-3">
              <label>Item Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Quantity"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Add Item
            </button>
          </form>

          <br />
          <button className="btn btn-success" type="button" onClick={handleSubmitShoppingList}>
            Submit Shopping List
          </button>
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
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.itemName}</td>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label>Item Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddItem;
