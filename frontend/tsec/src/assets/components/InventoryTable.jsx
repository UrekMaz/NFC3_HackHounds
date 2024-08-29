import React, { useState } from 'react';
import '../../assets/styles/inventorymanagement.css';
import Header from './Header';

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
    const [reorderQuantity, setReorderQuantity] = useState(0);
    const [decreaseQuantity, setDecreaseQuantity] = useState(0);
    const [modalType, setModalType] = useState(''); // 'reorder' or 'decrease'

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleReorder = (item) => {
        if (selectedItem?.name !== item.name || modalType !== 'reorder') {
            setSelectedItem(item);
            setReorderQuantity(0);
            setModalType('reorder');
            setShowModal(true);
        }
    };

    const handleDecreaseStock = (item) => {
        if (selectedItem?.name !== item.name || modalType !== 'decrease') {
            setSelectedItem(item);
            setDecreaseQuantity(0);
            setModalType('decrease');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setModalType('');
    };

    const handleConfirmReorder = () => {
        if (selectedItem && reorderQuantity > 0) {
            const updatedInventory = inventory.map((invItem) => {
                if (invItem.name === selectedItem.name) {
                    return { ...invItem, stock: invItem.stock + parseInt(reorderQuantity, 10) };
                }
                return invItem;
            });
            setInventory(updatedInventory);
            handleCloseModal();
        }
    };

    const handleConfirmDecrease = () => {
        if (selectedItem && decreaseQuantity > 0) {
            const updatedInventory = inventory.map((invItem) => {
                if (invItem.name === selectedItem.name) {
                    const updatedItem = { ...invItem, stock: invItem.stock - parseInt(decreaseQuantity, 10) };
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
            handleCloseModal();
        }
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
            (filterStatus === '' ||
                (filterStatus === 'below' && item.stock < item.threshold) ||
                (filterStatus === 'in-stock' && item.stock >= item.threshold) ||
                (filterStatus === 'out-of-stock' && item.stock === 0))
        );
    });

    return (
        <>
            <Header />
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

                    <div className="inventory-cards">
                        {filteredInventory.map((item, index) => (
                            <div key={index} className={`inventory-card ${item.stock < item.threshold ? 'below-threshold' : ''}`}>
                                <h3>{item.name}</h3>
                                <p>Category: {item.category}</p>
                                <p>Current Stock: {item.stock}</p>
                                <input
                                    type="number"
                                    value={item.threshold}
                                    onChange={(e) => handleSetThreshold(item, e.target.value)}
                                    className="threshold-input"
                                />
                                <p>Status: {item.stock < item.threshold ? 'Below Threshold' : 'Sufficient'}</p>
                                <div className="actions">
                                    <button onClick={() => handleDecreaseStock(item)} className="decrease-button">Decrease Stock</button>
                                    <button onClick={() => handleReorder(item)} className="reorder-button">Reorder</button>
                                </div>
                            </div>
                        ))}
                    </div>
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
                            <h2>{modalType === 'reorder' ? 'Reorder Item' : 'Decrease Stock'}</h2>
                            <p>Item: {selectedItem?.name}</p>
                            <p>Current Stock: {selectedItem?.stock}</p>
                            <input
                                type="number"
                                placeholder={modalType === 'reorder' ? 'Quantity to reorder' : 'Quantity to decrease'}
                                value={modalType === 'reorder' ? reorderQuantity : decreaseQuantity}
                                onChange={(e) => modalType === 'reorder' ? setReorderQuantity(e.target.value) : setDecreaseQuantity(e.target.value)}
                                className="modal-input"
                            />
                            <button onClick={modalType === 'reorder' ? handleConfirmReorder : handleConfirmDecrease} className="modal-button">
                                {modalType === 'reorder' ? 'Place Order' : 'Confirm'}
                            </button>
                            <button onClick={handleCloseModal} className="modal-button cancel">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default InventoryTable;