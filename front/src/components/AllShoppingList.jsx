import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);

  // Fetch all shopping lists from the API
  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('/api/shoppingList');
        setShoppingLists(response.data); // Assuming the API returns an array of shopping lists
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };
    fetchShoppingLists();
  }, []);

  // Handle View, Update, Delete actions
  const handleView = (id) => {
    console.log('Viewing item with id:', id);
    // Add your view logic here (e.g., show a modal with details)
  };

  const handleUpdate = (id) => {
    console.log('Updating item with id:', id);
    // Add your update logic here (e.g., navigate to an update form or show a modal)
  };

  const handleDelete = (id) => {
    console.log('Deleting item with id:', id);
    // Call API to delete item
    axios.delete(`/api/shoppingList/${id}`)
      .then(response => {
        // Remove the deleted item from the state
        setShoppingLists(shoppingLists.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div className='container'>
      <h1>All Shopping Lists</h1><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th >#</th>
            <th >User ID</th>
            <th >Date</th>
            <th>Status</th>
            <th >Items</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {shoppingLists.map((list, index) => (
            <tr key={list._id}>
              <td>{index + 1}</td>
              <td>{list.userId}</td>
              <td>{new Date(list.date).toLocaleDateString()}</td>
              <td>{list.status}</td>
              <td>{list.items.join(', ')}</td>
              <td>
                <button className="btn btn-info" onClick={() => handleView(list._id)}>View</button>
                <button className="btn btn-warning" onClick={() => handleUpdate(list._id)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(list._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllShoppingList;

