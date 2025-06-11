import React, {useState, useEffect} from "react";

import './OwnerAnnouncements.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try {
            const owner_id = 1;//localStorage.getItem('tenantId'); fetch from correct source, hardcoded now for testing.

            const response = await fetch(`http://localhost:1234/api/vendor/announcement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({owner_id,title, text : description}),
            });

            if (response.ok) {
                showMessage('Announcement submitted succesfully!');
                setTitle('');
                setDescription('');
                fetchAnnouncements();


            } else {
                showMessage('Failed to submit announcement.');
            }
        } catch(error) {
            console.error('Error:',error);
            showMessage('Something went wrong!');
        }

    };

    useEffect(() => {

        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:1234/api/announcement/owner/1');
            const data = await response.json();

            if (Array.isArray(data)) {
                setAnnouncements(data);
            }
            else {
                console.warn("No announcements.");
                setAnnouncements([]);
            }
        } catch (err) {
            console.error('Error fetching announcements:', err);
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