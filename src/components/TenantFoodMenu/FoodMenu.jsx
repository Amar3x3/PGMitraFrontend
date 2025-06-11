import React, { useEffect, useState } from 'react';
import './FoodMenu.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaFileAlt, FaComments } from 'react-icons/fa';
import BottomNav from '../BottomNav';


const FoodMenu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const bottomNavLinks = [
        {icon:<FaHome/>, label:"Home", path:"/tenant-dashboard"},
        //{icon:<FaFileAlt/>, label:"Payments", path:"/payment-dashboard"},
        {icon:<FaComments/>, label:"Complaints", path:"/raise-request"},
        {icon:<FaHome/>, label:"Profile", path:"/view-personal-info"},

    ]
    useEffect(() => {
        fetch("http://localhost:1234/api/Dining/owner/1?date=2025-06-06")
        .then((res) => res.json())
        .then((data) => {
            setMenu(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const meals = [
        { name: "Breakfast", time: "7:00 AM to 9:00 AM", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80" },
        { name: "Lunch", time: "12:30 PM to 2:30 PM", image: "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Dinner", time: "8:00 PM to 10:00 PM", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" }
    ];

    const handleBack = () => {
        navigate('/tenant-dashboard');
    };

    return (
        
        <div className="food-menu">
            <div>
            <button className='back-button' onClick={handleBack}>
                <FaArrowLeft size={24}/>    
            </button>  

            <h2>Today's Food Menu</h2>
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
                meals.map((meal, index) => (
                <div className="meal-card" key={index}>
                    <img src={meal.image} alt={meal.name} />
                    <h3>🥞 {meal.name}</h3>
                    <p>{meal.time}</p>
                    <p>{menu[meal.name.toLowerCase()]}</p>
                </div>
                ))
            )}
            </div>
            <BottomNav links={bottomNavLinks}/>
        </div>
        
        

    );
};

export default FoodMenu;




