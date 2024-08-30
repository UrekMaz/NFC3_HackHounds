import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import '../../assets/styles/inventorymanagement.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';
// import TimelineComponent from './TimelineComponent';
import Notification from './Notification';
const InventoryTable = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterOrganization, setFilterOrganization] = useState('');
    const [inventory, setInventory] = useState([
        { name: 'Item 1', organization: 'Abhyudaya', category: 'Category 1', stock: 10, threshold: 15 },
        { name: 'Item 2', organization: 'Nani Pari', category: 'Category 2', stock: 5, threshold: 5 },
        { name: 'Item 3', organization: 'Apnalaya', category: 'Category 3', stock: 2, threshold: 10 },
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
//     const [requests, setRequests] = useState([]);
//    const[rec1,setRec1]=useState([]);
    const [resources, setResources] = useState([
        { organization: 'Abhyudaya', resource: 'Beds', available: 15 },
        { organization: 'Nani Pari', resource: 'Tables', available: 8 },
        { organization: 'Apnalaya', resource: 'Chairs', available: 25 },
        { organization: 'Abhyudaya', resource: 'Wardrobes', available: 5 },
        { organization: 'Nani Pari', resource: 'Kitchen Appliances', available: 12 },
        { organization: 'Apnalaya', resource: 'Computers', available: 3 },
    ]);

    const [rec1, setRec1] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get_request', {
                    params: { userId }
                });
                setRec1(response.data); // Update state with fetched data
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (userId) {
            fetchEvents();
        } else {
            console.error('userId is not defined');
        }
    }, [userId]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getRequestsFrom/${userId}`);
                setRequests(response.data);
                console.log('Requests:', response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        if (userId) {
            fetchRequests();
        } else {
            console.error('userId is not defined');
        }
    }, [userId]);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);
    const handleOrganizationChange = (e) => setFilterOrganization(e.target.value);

    const handleModalAction = (item, type) => {
        setSelectedItem(item);
        setModalType(type);
        setShowModal(true);
        if (type === 'reorder') {
            setReorderQuantity(0);
        } else {
            setDecreaseQuantity(0);
        }
    };

    const handleRequestResource = (resource) => {
        setSelectedResource(resource);
        setRequestQuantity(0);
        setDueDate('');
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

    const updateInventory = (itemName, quantity, isReorder) => {
        setInventory(prevInventory =>
            prevInventory.map(item => {
                if (item.name === itemName) {
                    const newStock = isReorder ? item.stock + quantity : item.stock - quantity;
                    const updatedItem = { ...item, stock: newStock };
                    if (newStock < item.threshold) {
                        setNotifications(prev => [
                            ...prev,
                            { message: `${updatedItem.name} is below threshold!`, item: updatedItem },
                        ]);
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleConfirmAction = () => {
        if (selectedItem) {
            const quantity = modalType === 'reorder' ? parseInt(reorderQuantity, 10) : parseInt(decreaseQuantity, 10);
            if (quantity > 0) {
                updateInventory(selectedItem.name, quantity, modalType === 'reorder');
                handleCloseModal();
            }
        }
    };

    const handleSetThreshold = (item, newThreshold) => {
        setInventory(prevInventory =>
            prevInventory.map(invItem =>
                invItem.name === item.name ? { ...invItem, threshold: parseInt(newThreshold, 10) } : invItem
            )
        );
    };

    const handleSubmitRequest = async () => {
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

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === '' ||
            (filterStatus === 'below' && item.stock < item.threshold) ||
            (filterStatus === 'in-stock' && item.stock >= item.threshold) ||
            (filterStatus === 'out-of-stock' && item.stock === 0)) &&
        (filterOrganization === '' || item.organization === filterOrganization)
    );

    const filteredResources = resources.filter(resource =>
        filterOrganization === '' || resource.organization === filterOrganization
    );

    const handleCancelRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:3000/cancel_request/${requestId}`);
            alert('Request canceled successfully!');
        } catch (error) {
            console.error('Error canceling request:', error.response ? error.response.data : error.message);
            alert('Failed to cancel request. Please try again.');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:3000/accept_request/${requestId}`);
            alert('Request accepted successfully!');
        } catch (error) {
            console.error('Error accepted request:', error.response ? error.response.data : error.message);
            alert('Failed to accepted request. Please try again.');
        }
    };
    const handleAccept = (id) => {
        const updatedRequests = rec1.map((request) =>
            request._id === id ? { ...request, accepted: true } : request
        );
        setRec1(updatedRequests);
        // Optionally, send update to server
        // e.g., axios.post('/api/acceptRequest', { id });
    };



    return (
        <>
            <Header />
            <div className="inventory-management">
                <h1>Inventory Management</h1>
                <div className='main-requests'>
                    <div className="requests-section">
                        <h2>Requests</h2>
                        <div className="requests-grid">
                            {requests.map((request, index) => (
                                <div className={`request-card ${request.stage === "Canceled" ? "canceled" : ""}`} key={index}>
                                    {/* <p><strong>ID:</strong> {request._id}</p> */}
                                    <p><i className="fas fa-user"></i> <strong>To:</strong> {request.to}</p>
                                    <p><i className="fas fa-user"></i> <strong>From:</strong> {request.from}</p>
                                    <p><i className="fas fa-box"></i> <strong>Quantity:</strong> {request.quan}</p>
                                    <p><i className="fas fa-tag"></i> <strong>Product:</strong> {request.prod}</p>
                                    <p><i className="fas fa-clock"></i> <strong>Est. Time:</strong> {request.estimate_time}</p>
                                    <p><i className="fas fa-clock"></i> <strong>Stage:</strong> {request.stage}</p>
                                    {/* <TimelineComponent /> */}
                                    <button onClick={() => handleCancelRequest(request._id)} className="cancel-request-button">Cancel Button</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="requests-section">
                        <h2>Requests Received</h2>
                        <div className="requests-grid">
                            {rec1.map((request, index) => (
                                <div className="request-card" key={index}>
                                    {/* <p><strong>ID:</strong> {request._id}</p> */}
                                    <p><i className="fas fa-user"></i> <strong>To:</strong> {request.to}</p>
                                    <p><i className="fas fa-user"></i> <strong>From:</strong> {request.from}</p>
                                    <p><i className="fas fa-box"></i> <strong>Quantity:</strong> {request.quan}</p>
                                    <p><i className="fas fa-tag"></i> <strong>Product:</strong> {request.prod}</p>
                                    <p><i className="fas fa-clock"></i> <strong>Est. Time:</strong> {request.estimate_time}</p>
                                    <p><i className="fas fa-clock"></i> <strong>Stage:</strong> {request.stage}</p>
                                      <button onClick={() => handleCancelRequest(request._id)} className="cancel-request-button">Cancel </button>
                                      <button onClick={() => handleAcceptRequest(request._id)} className="accept-request-button">Accept </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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
                                    <button onClick={() => handleModalAction(item, 'decrease')} className="decrease-button">Decrease Stock</button>
                                    <button onClick={() => handleModalAction(item, 'reorder')} className="reorder-button">Reorder</button>
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
                                <button onClick={() => handleModalAction(notif.item, 'reorder')}>Reorder</button>
                            </div>
                        ))}
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
                            <button onClick={handleConfirmAction} className="modal-button">
                                {modalType === 'reorder' ? 'Place Order' : 'Confirm'}
                            </button>
                            <button onClick={handleCloseModal} className="modal-button cancel">Cancel</button>
                        </div>
                    </div>
                )}

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
                            <button onClick={handleSubmitRequest} className="modal-button">Submit Request</button>
                            <button onClick={handleCloseResourceModal} className="modal-button cancel">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default InventoryTable;