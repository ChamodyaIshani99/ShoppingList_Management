import React from 'react'
import { useNavigate } from 'react-router-dom';

const Mainshopping = () => {

    const navigate=useNavigate();
    const handleAddItemClick = () => {
        navigate('/addshoppingList'); // This redirects to the AddItem component
      };

      const handleViewAllClick = () => {
        navigate('/allshoppinglist');
      };

    return (

        <div className="container">

            <br /><h1 >Shopping List Management</h1><br />
            <div className="row">
                <div className="col">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/028/660/992/small_2x/grocery-list-for-shopping-in-the-store-shopping-list-with-marks-shopping-trolley-full-of-food-fruit-products-grocery-goods-buying-food-in-supermarket-illustration-vector.jpg" alt="shopping list" />
                </div>
                <div className="col">
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleAddItemClick} >Add New Shopping List</button>
                <button type="button" className="btn btn-secondary btn-lg btn-block"  onClick={handleViewAllClick}>Veiw All Shopping List</button>
                </div>
            </div>
        </div>

    )
}

export default Mainshopping
