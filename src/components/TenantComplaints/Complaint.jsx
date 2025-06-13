import React, {useState} from "react";

import './Complaint.css';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/authApi";

const Complaint = () => {
    const [title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (e) =>
    // {
    //     e.preventDefault();

    //     try {
    //         const tenantId = localStorage.getItem('userId'); //fetch from correct source, hardcoded now for testing.
    //         const accessToken = localStorage.getItem('accessToken');
    //         const response = await fetch(`http://localhost:1234/api/tenant/feedback?tenantId=${tenantId}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization' : `Bearer ${accessToken}`
    //             },
    //             body: JSON.stringify({title, text : description}),
    //         });

    //         if (response.ok) {
    //             setStatusMessage('Complaint submitted succesfully!');
    //             setTitle('');
    //             setDescription('');

    //         } else {
    //             const errMsg = 'Failed to submmit complaint. Room not assigned.';
    //             try {
    //                 const respText = await response.text();
    //                 if (respText) {
    //                     errMsg=respText;
    //                 }
    //             } catch(textError) {
    //                 setStatusMessage(errMsg);
    //             }
                
    //             setStatusMessage(errMsg);
    //         }
    //     } catch(error) {
    //         console.error('Error:',error);
    //         setStatusMessage('Something went wrong!');
    //     }

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const tenantId = localStorage.getItem('userId'); // Assuming 'userId' in localStorage is actually the tenantId
    
            const response = await api.post(`/tenant/feedback?tenantId=${tenantId}`, {
                title,
                text: description
            });
    
            setStatusMessage('Complaint submitted successfully!');
            setTitle('');
            setDescription('');
    
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                const errorMessage = error.response.data.message || error.response.data || 'Failed to submit complaint. Room not assigned.';
                setStatusMessage(errorMessage);
            } else if (error.request) {
                // Request was made but no response received
                setStatusMessage('Something went wrong! No response from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setStatusMessage('Something went wrong!');
            }
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
            <form className="complaint-form" onSubmit = {handleSubmit}>
                <label>Title    </label>
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