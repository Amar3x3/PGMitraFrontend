import React, {useState} from "react";

import './Complaint.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Complaint = () => {
    const [title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try {
            const tenantId = 2;//localStorage.getItem('tenantId'); fetch from correct source, hardcoded now for testing.

            const response = await fetch(`http://localhost:1234/api/tenant/feedback?tenantId=${tenantId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, text : description}),
            });

            if (response.ok) {
                setStatusMessage('Complaint submitted succesfully!');
                setTitle('');
                setDescription('');

            } else {
                setStatusMessage('Failed to submit complaint.');
            }
        } catch(error) {
            console.error('Error:',error);
            setStatusMessage('Something went wrong!');
        }

    };

    const handleBack = () => {
        navigate('/tenant-dashboard');
    };

    return (
        <div className="raise-complaint-container">
            <button className='back-button' onClick={handleBack}>
                <FaArrowLeft size={24}/>    
            </button>  

            <h2>Raise a complaint</h2>
            <form onSubmit = {handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label>Complaint</label>
                <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit">Submit</button>

            </form>
            {statusMessage && <p className="status">{statusMessage}</p>}

        </div>
    );
};
export default Complaint;