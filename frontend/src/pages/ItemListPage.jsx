import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList.jsx';
import UpdateItemModal from '../components/UpdateItemModal.jsx';

function ItemListPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/shoppingList/');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/shoppingList/delete/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:4000/api/shoppingList/update/${updatedItem._id}`, updatedItem);
      setModalIsOpen(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h2>Item List</h2>
      <ItemList
        items={items}
        onDelete={handleDeleteItem}
        onEdit={handleOpenModal}
      />
      <UpdateItemModal
        isOpen={modalIsOpen}
        item={selectedItem}
        onRequestClose={() => setModalIsOpen(false)}
        onUpdateItem={handleUpdateItem}
      />
    </div>
  );
}

export default ItemListPage;
