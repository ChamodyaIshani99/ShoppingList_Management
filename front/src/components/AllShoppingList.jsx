import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import './AllShoppingList.css'
import "bootstrap/dist/css/bootstrap.min.css";

const AllShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [updatedList, setUpdatedList] = useState({ status: "", items: [] });

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = () => {
    axios.get("http://localhost:4000/api/shoppingList/")
      .then((response) => {
        setShoppingLists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shopping lists:", error);
      });
  };

  const handleViewClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/shoppingList/${id}`);
      setSelectedList(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching shopping list details:", error);
    }
  };

  const handleUpdateClick = (list) => {
    setSelectedList(list);
    setUpdatedList({
      status: list.status,
      items: list.items.map(item => ({ itemName: item.itemName, quantity: item.quantity }))
    });
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
    newItems[index].itemName = value;
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
  const tableRef = useRef(null);
  const scrollToTable = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div className="container mt-4">
      <h2>All Shopping Lists</h2>

      <div className="row">
  {/* Left side (30%) */}
  <div className="col-4">
    <br /><br /><br /><br /><br />
    
    <div class="card" style={{backgroundColor:'#eff1f2 '}}>
      <div class="card-body">
        <h5 class="card-title">Ready to check your lists?</h5>
        <br />
        <p class="card-text">Click 'All Shopping List' and then you can see the all shopping list previously added!</p>
        <br /><br />
        <button type="scroll-btn" className="btn btn-warning" onClick={scrollToTable}>All Shopping List</button>
      </div>
    </div>
  
  </div>
  
  {/* Right side (70%) */}
  <div className="col-8">
    {/* Scroll Button */}
    <div className="image-container">
      <img 
        src="https://media.istockphoto.com/id/1263103277/photo/man-showing-phone-family-in-supermarket.jpg?s=612x612&w=0&k=20&c=IsiACddv69kknDFS7UNbWR9I29PqnNp2mvhTcyKdf1g=" 
        className="animated-image" 
        alt="Shopping Image"
      />
    </div>
  </div>
</div>

     
      <br />
      <div className="table-responsive" ref={tableRef}>
  <Table striped bordered hover className="text-center">
    <thead class="table table-bordered table-dark">
      <tr>
        <th>No</th>
        <th>Shopping ID</th>
        <th>Date</th>
        <th>Status</th>
        <th>Items</th>
        <th style={{ width: "220px" }}>Actions</th>
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
                {list.items.map((item, i) => (
                  <li key={i}>{item.itemName || "Unknown"} - {item.quantity || 0}</li>
                ))}
              </ul>
            </td>
            <td className="d-flex justify-content-center gap-2">
              <Button variant="btn btn-success"  onClick={() => handleViewClick(list._id)}>View</Button>
              <Button variant="primary" onClick={() => handleUpdateClick(list)}>Update</Button>
              <Button variant="danger" onClick={() => handleDeleteClick(list)}>Delete</Button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
</div>

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

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={updatedList.status} onChange={handleUpdateChange}>
                <option value="not">Not Buy</option>
                <option value="buy">Buy</option>
              </Form.Select>
            </Form.Group>

            <h5 className="mt-3">Items</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {updatedList.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        value={item.itemName}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ⨉
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="success" onClick={handleAddItem} className="mt-2">+ Add Item</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping List Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedList && (
            <>
              <p><strong>Shopping ID:</strong> {selectedList.shoppingId}</p>
              <p><strong>Date Added:</strong> {new Date(selectedList.dateAdded).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedList.status}</p>
              <h5>Items</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedList.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllShoppingList;