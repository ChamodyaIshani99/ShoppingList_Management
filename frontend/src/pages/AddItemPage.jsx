import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '../components/AddItemForm.jsx';

function AddItemPage() {
  const navigate = useNavigate();

  const handleAddItem = async (item) => {
    try {
      await axios.post('http://localhost:4000/api/shoppingList/add', item);
      navigate('/'); // Redirect to item list after adding
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <AddItemForm onAddItem={handleAddItem} />
  );
}

export default AddItemPage;
