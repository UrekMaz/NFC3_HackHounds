import React, { useState } from 'react';
import '../../assets/styles/inventorymanagement.css';
import Header from './Header';
import axios from 'axios'
const InventoryTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterOrganization, setFilterOrganization] = useState('');
    const [inventory, setInventory] = useState([
        { name: 'Item 1', organization: 'Abhyudaya', category: 'Category 1', stock: 10, threshold: 15 },
        { name: 'Item 2', organization: 'Nani Pari', category: 'Category 2', stock: 5, threshold: 5 },
        { name: 'Item 3', organization: 'Apnalaya', category: 'Category 3', stock: 2, threshold: 10 },
        // Add more items as needed
    ]);
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reorderQuantity, setReorderQuantity] = useState(0);
    const [decreaseQuantity, setDecreaseQuantity] = useState(0);
    const [modalType, setModalType] = useState('');
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [requestQuantity, setRequestQuantity] = useState(0);
    const [dueDate, setDueDate] = useState('');

    const [resources, setResources] = useState([
        { organization: 'Abhyudaya', resource: 'Beds', available: 15 },
        { organization: 'Nani Pari', resource: 'Tables', available: 8 },
        { organization: 'Apnalaya', resource: 'Chairs', available: 25 },
        { organization: 'Abhyudaya', resource: 'Wardrobes', available: 5 },
        { organization: 'Nani Pari', resource: 'Kitchen Appliances', available: 12 },
        { organization: 'Apnalaya', resource: 'Computers', available: 3 },
        // Add more resources as needed
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleOrganizationChange = (e) => {
        setFilterOrganization(e.target.value);
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

    const handleRequestResource = (resource) => {
        setSelectedResource(resource);
        setRequestQuantity(0);
        setDueDate('');
        setModalType('request');
        setShowResourceModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setModalType('');
    };

    const handleCloseResourceModal = () => {
        setShowResourceModal(false);
        setSelectedResource(null);
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

    const handleSubmitRequest = () => {
        // Implement the request functionality here
        alert(`Request for ${selectedResource.resource} with quantity ${requestQuantity} and due date ${dueDate} submitted.`);
        handleCloseResourceModal();
    };

    const filteredInventory = inventory.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterStatus === '' ||
                (filterStatus === 'below' && item.stock < item.threshold) ||
                (filterStatus === 'in-stock' && item.stock >= item.threshold) ||
                (filterStatus === 'out-of-stock' && item.stock === 0)) &&
            (filterOrganization === '' || item.organization === filterOrganization)
        );
    });

    const filteredResources = resources.filter((resource) => {
        return (
            (filterOrganization === '' || resource.organization === filterOrganization)
        );
    });
    const handle = async () => {
        if (selectedResource && requestQuantity > 0 && dueDate) {
            try {
                await axios.post('http://localhost:3000/resource_requests', {
                    resource: selectedResource.resource,
                    organization: selectedResource.organization,
                    quantity: requestQuantity,
                    dueDate: dueDate
                });
    
                alert('Request submitted successfully!');
                handleCloseResourceModal();
            } catch (error) {
                console.error('Error submitting request:', error.response ? error.response.data : error.message);
                alert('Failed to submit request. Please try again.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    };
    
    

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
                        <select value={filterOrganization} onChange={handleOrganizationChange} className="filter-dropdown">
                            <option value="">All Organizations</option>
                            <option value="Abhyudaya">Abhyudaya</option>
                            <option value="Nani Pari">Nani Pari</option>
                            <option value="Apnalaya">Apnalaya</option>
                        </select>
                    </div>

                    <div className="inventory-cards">
                        {filteredInventory.map((item, index) => (
                            <div key={index} className={`inventory-card ${item.stock < item.threshold ? 'below-threshold' : ''}`}>
                                <h3>{item.name}</h3>
                                <p>Organization: {item.organization}</p>
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

                <div className="resource-cards">
                    {filteredResources.map((resource, index) => (
                        <div key={index} className="resource-card">
                            <h3>{resource.resource}</h3>
                            <p>Organization: {resource.organization}</p>
                            <p>Available: {resource.available}</p>
                            <div className="actions">
                                <button onClick={() => handleRequestResource(resource)} className="view-details-button">Request</button>
                            </div>
                        </div>
                    ))}
                </div>

                {showResourceModal && selectedResource && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Request Resource</h2>
                            <p>Resource: {selectedResource.resource}</p>
                            <p>Organization: {selectedResource.organization}</p>
                            <p>Available: {selectedResource.available}</p>
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={requestQuantity}
                                onChange={(e) => setRequestQuantity(e.target.value)}
                                className="modal-input"
                            />
                            <input
                                type="date"
                                placeholder="Due Date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="modal-input"
                            />
                            <button onClick={handle} className="modal-button">Submit Request</button>
                            <button onClick={handleCloseResourceModal} className="modal-button cancel">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default InventoryTable;