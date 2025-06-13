import React, {useState, useEffect} from "react";

import './OwnerAnnouncements.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/authApi";

const Complaint = () => {
    const [title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const showMessage = (msg) => {
        setStatusMessage(msg);
        setTimeout(() => {
          setStatusMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const owner_id = localStorage.getItem('userId');
            
            const response = await api.post(`/vendor/announcement`, {
                owner_id,
                title,
                text: description
            });
    
            showMessage('Announcement submitted successfully!');
            setTitle('');
            setDescription('');
            fetchAnnouncements();
    
        } catch (error) {
            
            console.error('Error:', error);
            showMessage('Something went wrong! Failed to submit announcement.');
        }
    };

    useEffect(() => {

        fetchAnnouncements();
    }, []);


    const fetchAnnouncements = async () => {
        try {
            const ownerId = localStorage.getItem('userId');
            
            const response = await api.get(`/announcement/owner/${ownerId}`);
    
            const data = response.data;
    
            if (Array.isArray(data)) {
                setAnnouncements(data);
            } else {
                console.warn("No announcements or unexpected data format.");
                setAnnouncements([]); 
            }
        } catch (err) {
            console.error('Error fetching announcements:', err);
            
            setAnnouncements([]); 
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        //navigate('/tenant-dashboard');
    };

    return (
        <>
        <div className="create-announcement-container">
            <button className='back-button' onClick={handleBack}>
                <FaArrowLeft size={24}/>    
            </button>  

            <h2>Create Announcement</h2>
            <form onSubmit = {handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label>Description</label>
                <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit">Submit</button>

            </form>
            {statusMessage && <p className="status">{statusMessage}</p>}

        </div>

        <div className="announcements-container">

        <h1 className="announcements-header">📢 Announcements</h1>
        {loading ? (
            <p className="announcement-message">Loading...</p>
        ) : announcements.length === 0 ? (
            <p className="announcement-message">No announcements available.</p>
        ) : (
            <div className="announcement-list">
            {announcements.map((a) => (
                <div key={a.id} className="announcement-card">
                    <h2 className="announcement-title">{a.title}</h2>
                    <p className="announcement-text">{a.text}</p>
                    <p className="announcement-date">
                        📅 {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
            </div>
        )}
        </div>

        </>

        
    );
};
export default Complaint;