import React, { useState, useEffect } from 'react';
import './Adminstyles.css';
import axios from "axios";
import { toast } from "react-hot-toast";

const CityPage = () => {

    const [formData, setFormData] = useState({
        cityName: '',
        stateId: '',
    });

    const [states, setStates] = useState([]);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get("http://localhost:9000/admin/state");
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states data:", error);
            }
        };
        fetchStates();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log('Adding City data:', formData);
    
        const cityData = {
            city_name: formData.cityName,
            state_id: formData.stateId,
        };
    
        try {
            const res = await axios.post('http://localhost:9000/admin/city', cityData);
            console.log(res.data);
            if (res.data) {
                toast.success('City Added Successfully');
                setFormData({ cityName: '', stateId: '' });
            }
        } catch (err) {
            console.error(err);
            toast.error('Error: ' + err.response?.data?.message || 'error occures');
        }
    };

    return (
            <div className="form-container">
                <h2>Manage City Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='cityName'>City</label>
                        <input type="text" name="cityName" placeholder="City" value={formData.cityName} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor='stateId'>Select State</label>
                        <select name="stateId" value={formData.stateId} onChange={handleChange} required>
                        <option value="">Select a State</option>
                        {states.map((state) => (
                            <option key={state._id} value={state._id}>
                                {state.state_name}
                            </option>
                        ))}
                        </select>
                    </div>
                    
                    <div className="form-action">
                        <button type="submit" className="btnSubmit">Add City</button>
                    </div>
                    
                </form>
            </div>
    );
};

export default CityPage;
