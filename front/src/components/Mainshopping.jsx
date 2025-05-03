import React from 'react'
import { useNavigate } from 'react-router-dom';
import './MainShopping.css'


const Mainshopping = () => {

    const navigate=useNavigate();
    const handleAddItemClick = () => {
        navigate('/addshoppingList'); // This redirects to the AddItem component
      };

      const handleViewAllClick = () => {
        navigate('/allshoppinglist');
      };
       const handleGenerateReportClick = () => {
        navigate('/shoppinglistreport'); // Make sure this matches your route
    };

    return (

        <div className="container">
    <br />
    <div style={{ backgroundColor: "#f9ece3 ", padding: "10px" }} >
    <h1 >Shopping List Management</h1>
    </div><br />
    <div className="row">
        <div className="col">
            <img 
                src="https://img.freepik.com/premium-photo/young-smiling-woman-shopping-supermarket-looking-screen-phone-her-shopping-list-grocery-list-consumerism-choosing-concept_255667-19213.jpg" 
                alt="shopping list" 
                className="img-fluid "
            />
        </div>
        <div className="col d-flex flex-column align-items-center">
            <br />
            <br />
            <br />
            <br />
            <button 
                type="button" 
                className="btn btn-primary btn-lg btn-block mt-4" 
                onClick={handleAddItemClick}
            >
                Add New Shopping List
            </button>
            <button 
                type="button" 
                className="btn btn-secondary btn-lg btn-block mt-3" 
                onClick={handleViewAllClick}
            >
                View All Shopping List
            </button>
            <button 
                        type="button" 
                        className="btn btn-success btn-lg btn-block mt-3" 
                        onClick={handleGenerateReportClick}
                    >
                        Generate Report
                    </button>
        </div>
    </div>
</div>


    )
}

export default Mainshopping
