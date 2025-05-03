import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ShoppingListReport = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    axios.get("http://localhost:4000/api/shoppingList/")
      .then((res) => {
        setShoppingLists(res.data);
        setFilteredLists(res.data);
      })
      .catch((err) => console.error("Error fetching shopping lists:", err));
  }, []);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (!month) {
      setFilteredLists(shoppingLists);
      return;
    }

    const filtered = shoppingLists.filter((list) => {
      const date = new Date(list.dateAdded);
      return date.getMonth() + 1 === parseInt(month);
    });

    setFilteredLists(filtered);
  };

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

  const itemFrequency = {};
  filteredLists.forEach(list => {
    list.items.forEach(item => {
      itemFrequency[item.itemName] = (itemFrequency[item.itemName] || 0) + item.quantity;
    });
  });

  const chartData = {
    labels: Object.keys(itemFrequency),
    datasets: [
      {
        label: 'Most Bought Items',
        data: Object.values(itemFrequency),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary">🛒 Monthly Shopping List Report</h2>

      {/* Month Filter */}
      <div className="mb-4 d-flex justify-content-center">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="form-select w-auto"
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Report Section */}
      <div
        id="report-content"
        style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
      >
        {/* Summary */}
        <div className="mb-4 text-center">
          <h4 className="mb-2 text-success">📋 Report Summary</h4>
          <p className="text-muted">
            Showing data for: <strong>{selectedMonth ? new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' }) : 'All Months'}</strong>
          </p>
          <p><strong>Total Records:</strong> {filteredLists.length}</p>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>No</th>
                <th>Shopping ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredLists.map((list, index) => (
                <tr key={list._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{list.shoppingId}</td>
                  <td>{new Date(list.dateAdded).toLocaleDateString()}</td>
                  <td>{list.status}</td>
                  <td>
                    <ul className="mb-0">
                      {list.items.map((item, i) => (
                        <li key={i}>{item.itemName} - {item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
              {filteredLists.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-danger">No records found for selected month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        {Object.keys(itemFrequency).length > 0 && (
          <div className="mt-5">
            <h5 className="text-center text-info mb-3">📊 Most Bought Items</h5>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Bar data={chartData} />
            </div>
          </div>
        )}
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <button onClick={downloadPdf} className="btn btn-success px-4 py-2">
          ⬇️ Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ShoppingListReport;

