import React, { useState } from 'react';
import './Adminstyles.css';
import axios from "axios";
import { toast } from "react-hot-toast";

const StatePage = () => {

    const [formData, setFormData] = useState({
        stateName: '',
        country: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('Adding State data:', formData);
    
        const stateData = {
            state_name: formData.stateName,
            country: formData.country,
        };
    
        try {
            const res = await axios.post('http://localhost:9000/admin/state', stateData);
            console.log(res.data);
            if (res.data) {
                toast.success('State Added Successfully');
                setFormData({ stateName: '', country: '' });
            }
        } catch (err) {
            console.error(err);
            toast.error('Error: ' + err.response?.data?.message || 'error occures');
        }
    };

    return (
            <div className="form-container">
                <h2>Manage State Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='stateName'>State</label>
                    <input type="text" name="stateName" placeholder="State" value={formData.stateName} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor='country'>Country</label>
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required/>
                    </div>
                    
                    <div className="form-action">
                        <button type="submit" className="btnSubmit">Add State</button>
                    </div>
                    
                </form>
            </div>
    );
};

export default StatePage;
