// import React from 'react';

// function OrgHome() {
//   return (
//     <div>
//       <h1>User Home</h1>
//       <p>Welcome to the user home page!</p>
//     </div>
//   );
// }

// export default OrgHome;

import '../../assets/styles/inventorymanagement.css';
import React, { useState } from 'react';

const InventoryTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [inventory, setInventory] = useState([
        { name: 'Item 1', category: 'Category 1', stock: 10, threshold: 15 },
        { name: 'Item 2', category: 'Category 2', stock: 5, threshold: 5 },
        { name: 'Item 3', category: 'Category 3', stock: 2, threshold: 10 },
        // Add more items as needed
    ]);
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleReorder = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleDecreaseStock = (item) => {
        const updatedInventory = inventory.map((invItem) => {
            if (invItem.name === item.name) {
                const updatedItem = { ...invItem, stock: invItem.stock - 1 };
                if (updatedItem.stock < updatedItem.threshold) {
                    setNotifications((prev) => [
                        ...prev,
                        { message: `${updatedItem.name} is below threshold!`, item: updatedItem },
                    ]);
                }
                return updatedItem;
            }
            return invItem;
        });
        setInventory(updatedInventory);
    };

    const handleSetThreshold = (item, newThreshold) => {
        const updatedInventory = inventory.map((invItem) => {
            if (invItem.name === item.name) {
                return { ...invItem, threshold: parseInt(newThreshold, 10) };
            }
            return invItem;
        });
        setInventory(updatedInventory);
    };

    const filteredInventory = inventory.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterStatus === '' || (filterStatus === 'below' && item.stock < item.threshold))
        );
    });

    return (
        <div className="inventory-management">
           

            <div className="inventory-overview">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <select value={filterStatus} onChange={handleFilterChange} className="filter-dropdown">
                        <option value="">All</option>
                        <option value="below">Below Threshold</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                </div>

                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Threshold Level</th>
                            <th>Reorder Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map((item, index) => (
                            <tr key={index} className={item.stock < item.threshold ? 'below-threshold' : ''}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.threshold}
                                        onChange={(e) => handleSetThreshold(item, e.target.value)}
                                    />
                                </td>
                                <td>{item.stock < item.threshold ? 'Below Threshold' : 'Sufficient'}</td>
                                <td>
                                    <button onClick={() => handleDecreaseStock(item)}>Decrease Stock</button>
                                    <button onClick={() => handleReorder(item)}>Reorder</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {notifications.length > 0 && (
                <div className="notification-bar">
                    {notifications.map((notif, index) => (
                        <div key={index} className="notification">
                            <p>{notif.message}</p>
                            <button onClick={() => handleReorder(notif.item)}>Reorder</button>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Reorder Item</h2>
                        <p>Item: {selectedItem?.name}</p>
                        <p>Current Stock: {selectedItem?.stock}</p>
                        <input type="number" placeholder="Quantity to reorder" />
                        <input type="text" placeholder="Supplier details" />
                        <input type="date" placeholder="Expected delivery date" />
                        <button onClick={handleCloseModal}>Place Order</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryTable;