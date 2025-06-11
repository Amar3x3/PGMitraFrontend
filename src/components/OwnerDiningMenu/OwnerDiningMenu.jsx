import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OwnerDiningMenu.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function OwnerDiningMenu() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [menu, setMenu] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        breakfast: '',
        lunch: '',
        dinner: '',
    });
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode
    const ownerId = 1;
    const navigate = useNavigate();


    useEffect(() => {
        fetchMenu(selectedDate);
    }, [selectedDate]);

    const handleBack = () => {
        //navigate('/tenant-dashboard');
    };

    const fetchMenu = async (date) => {
        try {
            const res = await axios.get(`http://localhost:1234/api/Dining/owner/1?date=${date}`);
            setMenu(res.data);
            // When fetching, if a menu exists, populate formData for potential editing
            setFormData({
                breakfast: res.data.breakfast,
                lunch: res.data.lunch,
                dinner: res.data.dinner,
            });
            setMessage('');
            setIsEditing(false); // Reset editing mode when a new menu is fetched
        } catch (err) {
            setMenu(null);
            setMessage('No menu available for this date.');
            setFormData({ breakfast: '', lunch: '', dinner: '' }); // Clear formData if no menu
            setIsEditing(false); // Ensure editing mode is off
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdate = async () => {
        try {
            if (menu && menu.id) { // If menu exists, it's an update
                await axios.post(`http://localhost:1234/api/Dining/edit`, { // Assuming your update endpoint is /api/Dining/update/:id
                    id : menu.id, // Include ownerId if required by your backend for updates
                    date: selectedDate, // Include date if required
                    ...formData,
                });
                setMessage('Menu updated successfully!');
            } else { // No menu exists, so it's a create
                await axios.post('http://localhost:1234/api/Dining/create', {
                    ownerId,
                    date: selectedDate,
                    ...formData,
                });
                setMessage('Menu added successfully!');
            }
            setShowModal(false);
            setIsEditing(false); // Exit editing mode after submit
            fetchMenu(selectedDate); // Refresh the menu
        } catch (err) {
            setShowModal(false);
            setMessage(`Error ${menu ? 'updating' : 'adding'} menu.`);
            console.error(err);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        // Pre-fill formData with current menu values if they exist
        if (menu) {
            setFormData({
                breakfast: menu.breakfast,
                lunch: menu.lunch,
                dinner: menu.dinner,
            });
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Optionally reset formData to the current menu values if the user cancels
        if (menu) {
            setFormData({
                breakfast: menu.breakfast,
                lunch: menu.lunch,
                dinner: menu.dinner,
            });
        }
    };


    return (
        <div className="dining-container">
            <button className='back-button' onClick={handleBack}>
                <FaArrowLeft size={24}/>    
            </button> 
            <h2>Dining Menu</h2>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
            />

            {menu ? (
                <div className="menu-display">
                    <div className="meal">
                        <h3>🍳 Breakfast <span>7:00 - 9:00 AM</span></h3>
                        {isEditing ? (
                            <textarea
                                name="breakfast"
                                value={formData.breakfast}
                                onChange={handleFormChange}
                            />
                        ) : (
                            <p>{menu.breakfast}</p>
                        )}
                    </div>
                    <div className="meal">
                        <h3>🍛 Lunch <span>12:30 - 2:30 PM</span></h3>
                        {isEditing ? (
                            <textarea
                                name="lunch"
                                value={formData.lunch}
                                onChange={handleFormChange}
                            />
                        ) : (
                            <p>{menu.lunch}</p>
                        )}
                    </div>
                    <div className="meal">
                        <h3>🍽️ Dinner <span>8:00 - 10:00 PM</span></h3>
                        {isEditing ? (
                            <textarea
                                name="dinner"
                                value={formData.dinner}
                                onChange={handleFormChange}
                            />
                        ) : (
                            <p>{menu.dinner}</p>
                        )}
                    </div>
                    {/* Edit and Submit/Cancel buttons for existing menu */}
                    {!isEditing && (
                        <button className="edit-btn" onClick={handleEditClick}>Edit Menu</button>
                    )}
                    {isEditing && (
                        <div className="edit-actions">
                            <button onClick={handleAddOrUpdate}>Update Menu</button>
                            <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="no-menu">{message}</p>
            )}

            {/* Floating button only appears if no menu and not in editing mode */}
            {!menu && !isEditing && (
                <button className="floating-btn" onClick={() => setShowModal(true)}>+</button>
            )}

            {/* Modal for adding a new menu (only if no menu exists) */}
            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>Add Menu for {selectedDate}</h3>
                        <label>Breakfast:</label>
                        <textarea
                            name="breakfast"
                            value={formData.breakfast}
                            onChange={handleFormChange}
                        />
                        <label>Lunch:</label>
                        <textarea
                            name="lunch"
                            value={formData.lunch}
                            onChange={handleFormChange}
                        />
                        <label>Dinner:</label>
                        <textarea
                            name="dinner"
                            value={formData.dinner}
                            onChange={handleFormChange}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleAddOrUpdate}>Submit</button>
                            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OwnerDiningMenu;