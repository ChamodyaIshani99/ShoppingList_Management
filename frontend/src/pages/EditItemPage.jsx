import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UpdateItemModal from '../components/UpdateItemModal.jsx';

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true); // Open on load

  const fetchItem = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/shoppingList/${id}`);
      setSelectedItem(res.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleUpdateItem = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:4000/api/shoppingList/update/${updatedItem._id}`, updatedItem);
      setModalIsOpen(false);
      navigate('/'); // Redirect after update
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    navigate('/');
  };

  return (
    selectedItem && (
      <UpdateItemModal
        isOpen={modalIsOpen}
        item={selectedItem}
        onRequestClose={handleCloseModal}
        onUpdateItem={handleUpdateItem}
      />
    )
  );
}

export default EditItemPage;
