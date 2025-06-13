import React, { useEffect, useState } from 'react';
import './FoodMenu.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaFileAlt, FaComments } from 'react-icons/fa';
import BottomNav from '../BottomNav';
import BottomNavBar from '../BottomNavbar/bottomNav';
import api from '../../services/authApi';

const FoodMenu = () => {
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    
    const bottomNavLinks = [
        { icon: <FaHome />, label: "Home", path: "/tenant-dashboard" },
        { icon: <FaComments />, label: "Complaints", path: "/raise-request" },
        { icon: <FaHome />, label: "Profile", path: "/view-personal-info" },
    ];

    // useEffect(() => {
    //     const fetchFoodMenu = async () => {
    //         setLoading(true);  
    //         setError(null); 
    //         const accessToken = localStorage.getItem('accessToken');
    //         const tenantId = localStorage.getItem('userId');
            

    //         if (!accessToken || !tenantId) {
    //             console.error("Authentication token or tenant ID not found.");
    //             setError("Please log in to view the food menu.");
    //             setLoading(false);
                
    //             return;
    //         }

    //         try {
    //             const response = await fetch(`http://localhost:1234/api/Dining/owner/${tenantId}`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}` // Correct header name
    //                 }
    //             });

    //             if (!response.ok) {
    //                 const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    //                 if (response.status === 401 || response.status === 403) {
    //                     setError("Menu not found.");
                        
    //                 } else {
    //                     setError(`Failed to fetch menu: ${errorData.message || response.statusText}`);
    //                 }
    //                 console.error("API Error:", response.status, errorData);
    //                 setMenu({}); 
    //                 return; 
    //             }

    //             const data = await response.json();
    //             if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    //                 setMenu(data);
    //             } else {
    //                 console.warn("API returned no menu data or unexpected format.");
    //                 setMenu({}); 
    //             }

    //         } catch (err) {
    //             console.error("Network or parsing error fetching menu data:", err);
    //             setError("Could not connect to the server or process menu data.");
    //             setMenu({}); 
    //         } finally {
    //             setLoading(false); 
    //         }
    //     };

    //     fetchFoodMenu();
    // }, []); 

    useEffect(() => {
        const fetchFoodMenu = async () => {
            setLoading(true);
            setError(null);
            const tenantId = localStorage.getItem('userId');
    
            if (!tenantId) {
                console.error("Tenant ID not found.");
                setError("Please log in to view the food menu.");
                setLoading(false);
                return;
            }
    
            try {
                const response = await api.get(`/Dining/owner/${tenantId}`);
    
                const data = response.data;
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    setMenu(data);
                } else {
                    console.warn("API returned no menu data or unexpected format.");
                    setMenu({});
                }
    
            } catch (err) {
                console.error("Error fetching menu data:", err);
                
                if (err.response) {
                    if (err.response.status === 404) { 
                        setError("Menu not found for your ID.");
                    } else {
                        setError(`Failed to fetch menu: ${err.response.data?.message || err.response.statusText || 'Server error'}`);
                    }
                } else {
                    setError("Could not connect to the server or process menu data.");
                }
                setMenu({});
            } finally {
                setLoading(false);
            }
        };
    
        fetchFoodMenu();
    }, []);

    const meals = [
        { name: "Breakfast", time: "7:00 AM to 9:00 AM", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80" },
        { name: "Lunch", time: "12:30 PM to 2:30 PM", image: "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?q=80&w=2340&auto=format&fit=fit&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%33D%33D" },
        { name: "Dinner", time: "8:00 PM to 10:00 PM", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" }
    ];

    const handleBack = () => {
        navigate('/tenant-dashboard');
    };

    return (
        <div className="food-menu">
            <div>
                <button className='back-button' onClick={handleBack}>
                    <FaArrowLeft size={24} />
                </button>

                <h2>Today's Food Menu</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}

                {loading ? (
                    meals.map((meal, index) => (
                        <div className="meal-card skeleton" key={index}>
                            <div className="skeleton-img" />
                            <div className="skeleton-text short" />
                            <div className="skeleton-text" />
                            <div className="skeleton-text" />
                        </div>
                    ))
                ) : (
                    meals.map((meal, index) => {
                        const mealKey = meal.name.toLowerCase();
                        const menuContent = menu && menu[mealKey] ? menu[mealKey] : "Menu not created"; 

                        return (
                            <div className="meal-card" key={index}>
                                <img src={meal.image} alt={meal.name} />
                                <h3>🥞 {meal.name}</h3>
                                <p>{meal.time}</p>
                                <p>{menuContent}</p> 
                            </div>
                        );
                    })
                )}
            </div>
            <BottomNavBar links={bottomNavLinks}/>
        </div>
    );
};

export default FoodMenu;