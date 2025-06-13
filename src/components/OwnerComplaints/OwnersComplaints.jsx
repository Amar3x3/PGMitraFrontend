import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './OwnersComplaints.css';
import { FaExclamationCircle, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import api from '../../services/authApi';


const OwnerComplaints = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingFeedbacks, setPendingFeedbacks] = useState([]);
  const [completeFeedbacks, setCompleteFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate=useNavigate();

  const ownerId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');


  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleBack = () => {
    //navigate('/tenant-dashboard');
  };

  
  const fetchFeedbacks = async (ownerId) => { 
    try {
        
        const response = await api.get(`/vendor/complaints/${ownerId}`);

        const allFeedbacks = response.data; 

        const pending = allFeedbacks.filter(item => item.status.toUpperCase() === 'PENDING');
        const complete = allFeedbacks.filter(item => item.status.toUpperCase() === 'COMPLETE');

        setPendingFeedbacks(pending);
        setCompleteFeedbacks(complete);

        if (allFeedbacks.length === 0) {
            showMessage('No complaints found.', 'info'); 
        }
    } catch (error) {
        console.error('Error fetching complaints:', error);
        
        showMessage('Failed to fetch complaints.', 'error');
        setPendingFeedbacks([]); 
        setCompleteFeedbacks([]); 
    }
};

  const markAsComplete = async (id) => {
    try {
        
        await api.put(`/vendor/complaints/${id}/complete`, {});

        setPendingFeedbacks(prev => prev.filter(item => item.id !== id));
        const completedItem = pendingFeedbacks.find(item => item.id === id);
        if (completedItem) {
            setCompleteFeedbacks(prev => [...prev, { ...completedItem, status: 'COMPLETE' }]);
        }
        showMessage('Complaint marked as complete.', 'success');
    } catch (error) {
        console.error('Error marking complaint as complete:', error);
        showMessage('Failed to mark as complete.', 'error');
    }
};

  return (
    <div className="owner-complaints-container">
      <button className='back-button' onClick={handleBack}>
            <FaArrowLeft size={24}/>    
      </button> 
      <h2>Complaints</h2>

      {message && (
        <div className={`notification ${messageType}`}>
          {message}
        </div>
      )}

      <div className="tab-buttons">
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={activeTab === 'complete' ? 'active' : ''}
          onClick={() => setActiveTab('complete')}
        >
          Complete
        </button>
      </div>

      <div className="complaints-list">
        {activeTab === 'pending' && pendingFeedbacks.length === 0 && (
          <p>No pending complaints.</p>
        )}
        {activeTab === 'pending' &&
          pendingFeedbacks.map((feedback) => (
            <div className="complaint-card" key={feedback.id}>
              <div className="complaint-title">
                <FaExclamationCircle size={18}/>
                <i className="fa fa-exclamation-circle icon" aria-hidden="true"></i>
                {feedback.title}
              </div>
              <div className="complaint-text">{feedback.text}</div>
              <div className='complaint-room'>Room:{feedback.roomNumber}</div>
              <button
                className="complete-button"
                onClick={() => markAsComplete(feedback.id)}
              >
                Mark as Complete
              </button>
            </div>
          ))}

        {activeTab === 'complete' && completeFeedbacks.length === 0 && (
          <p>No completed complaints.</p>
        )}
        {activeTab === 'complete' &&
          completeFeedbacks.map((feedback) => (
            <div className="complaint-card complete" key={feedback.id}>
              <div className="complaint-title">
                <FaCheckCircle size={20}/>
                <i className="fa fa-check-circle icon" aria-hidden="true"></i>
                {feedback.title}
              </div>
              <div className="complaint-text">{feedback.text}</div>
              <div className='complaint-room'>Room:{feedback.roomNumber}</div>

            </div>
          ))}
      </div>
    </div>
  );
};

export default OwnerComplaints;




