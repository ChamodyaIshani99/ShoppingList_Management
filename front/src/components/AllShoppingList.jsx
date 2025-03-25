import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AllShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [updatedList, setUpdatedList] = useState({ status: "", items: [] });

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = () => {
    axios
      .get("http://localhost:4000/api/shoppingList/")
      .then((response) => {
        setShoppingLists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shopping lists:", error);
      });
  };

  const handleUpdateClick = (list) => {
    setSelectedList(list);
    setUpdatedList({ status: list.status, items: [...list.items] });
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (list) => {
    setSelectedList(list);
    setShowDeleteModal(true);
  };

  const handleUpdateChange = (e) => {
    setUpdatedList({ ...updatedList, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, value) => {
    const newItems = [...updatedList.items];
    newItems[index].name = value;
    setUpdatedList({ ...updatedList, items: newItems });
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...updatedList.items];
    newItems[index].quantity = value;
    setUpdatedList({ ...updatedList, items: newItems });
  };

  const handleAddItem = () => {
    setUpdatedList({
      ...updatedList,
      items: [...updatedList.items, { name: "", quantity: 1 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = updatedList.items.filter((_, i) => i !== index);
    setUpdatedList({ ...updatedList, items: newItems });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/shoppingList/update/${selectedList._id}`, updatedList);
      setShowUpdateModal(false);
      fetchShoppingLists();
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/shoppingList/delete/${selectedList._id}`);
      setShowDeleteModal(false);
      fetchShoppingLists();
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Shopping Lists</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th>No</th>
              <th>Shopping ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shoppingLists.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No shopping lists found</td>
              </tr>
            ) : (
              shoppingLists.map((list, index) => (
                <tr key={list._id} className={index % 2 === 0 ? "table-light" : "table-secondary"}>
                  <td>{index + 1}</td>
                  <td>{list.shoppingId}</td>
                  <td>{new Date(list.dateAdded).toLocaleDateString()}</td>
                  <td>{list.status}</td>
                  <td>
  <ul className="list-unstyled mb-0">
    {list.items.map((item, index) => (
      <li key={index}>{item.itemName || "Unknown"} - {item.quantity || 0}</li>
    ))}
  </ul>
</td>

                  <td>
                    <Button variant="primary" onClick={() => handleUpdateClick(list)}>Update</Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(list)} className="ms-2">Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control name="status" value={updatedList.status} onChange={handleUpdateChange} />
            </Form.Group>
            <h5 className="mt-3">Items</h5>
            {updatedList.items.map((item, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control className="me-2" value={item.name} onChange={(e) => handleItemChange(index, e.target.value)} />
                <Form.Control type="number" className="me-2" value={item.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} />
                <Button variant="danger" onClick={() => handleRemoveItem(index)}>-</Button>
              </div>
            ))}
            <Button variant="success" onClick={handleAddItem} className="mt-2">+ Add Item</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this shopping list?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllShoppingList;
