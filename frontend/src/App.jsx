import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your components/pages
import AddItemPage from './pages/AddItemPage.jsx';
import ItemListPage from './pages/ItemListPage.jsx';
import EditItemPage from './pages/EditItemPage.jsx';

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Shopping List App</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Item List</Link>
          <Link to="/add">Add Item</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ItemListPage />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/edit/:id" element={<EditItemPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


