import React, { useEffect, useState } from 'react';
import './EditPersonalInfo.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const EditPersonalInfo = () => {
  const navigate = useNavigate();
  const tenantId = 2;//localStorage.getItem('tenantId');    change when auth done
  const [tenant, setTenant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    foodPreference: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    occupation: '',
  });

  const [readOnlyData, setReadOnlyData] = useState({
    email: '',
    aadhaarNumber: '',
  });


  useEffect(() => {
    axios.get(`http://localhost:1234/api/tenant/profile/id/${tenantId}`)
      .then(res => {
        const data = res.data;
        setTenant(data);
        setFormData({
          name: data.name,
          phone: data.phone,
          gender: data.gender,
          foodPreference: data.foodPreference,
          emergencyContactName: data.emergencyContactName,
          emergencyContactPhone: data.emergencyContactPhone,
          occupation: data.occupation,
        });
        setReadOnlyData({
          email: data.email,
          aadhaarNumber: data.aadhaarNumber,
        });
      })
      .catch(err => {
        console.error('Error fetching tenant info:', err);
      });
  }, [tenantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate('/view-personal-info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:1234/api/tenant/update/${tenantId}`, formData)
      .then(() => {
        alert('Your information has been updated successfully.');
      })
      .catch(err => {
        console.error('Error updating tenant info:', err);
        alert('Failed to update information.');
      });
  };

  if (!tenant) return <div>Loading...</div>;

  return (
    <div className="edit-info-container">
      <button className='back-button' onClick={handleBack}>
        <FaArrowLeft size={24}/>  
      </button>  
      <h2>Edit Personal Information</h2>
      <form onSubmit={handleSubmit} className="edit-info-form">
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>Food Preference:
          <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Vegetarian">Veg</option>
            <option value="Non-Vegetraian">Non-Veg</option>
          </select>
        </label>

        <label>Emergency Contact Name:
          <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
        </label>

        <label>Emergency Contact Phone:
          <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} />
        </label>

        <label>Occupation:
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required/>
        </label>

        <label>Email (read-only):
          <input type="email" value={readOnlyData.email} readOnly />
        </label>

        <label>Aadhaar Number (read-only):
          <input type="text" value={readOnlyData.aadhaarNumber} readOnly />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPersonalInfo;




