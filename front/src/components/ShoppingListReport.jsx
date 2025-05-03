import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ShoppingListReport = () => {
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/shoppingList/")
      .then((res) => setShoppingLists(res.data))
      .catch((err) => console.error("Error fetching shopping lists:", err));
  }, []);

  const downloadPdf = () => {
    const input = document.getElementById("report-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("shopping-list-report.pdf");
    });
  };

  return (
    <div className="container">
      <h2 className="my-4">Shopping List Report</h2>

      {/* Report Content to Convert to PDF */}
      <div id="report-content" style={{ padding: '20px', background: 'white' }}>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Shopping ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {shoppingLists.map((list, index) => (
              <tr key={list._id}>
                <td>{index + 1}</td>
                <td>{list.shoppingId}</td>
                <td>{new Date(list.dateAdded).toLocaleDateString()}</td>
                <td>{list.status}</td>
                <td>
                  <ul>
                    {list.items.map((item, i) => (
                      <li key={i}>{item.itemName} - {item.quantity}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <button onClick={downloadPdf} className="btn btn-primary mt-3">
        Download PDF Report
      </button>
    </div>
  );
};

export default ShoppingListReport;
