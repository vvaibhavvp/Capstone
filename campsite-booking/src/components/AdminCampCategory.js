import React, { useState } from 'react';
import './Adminstyles.css';
import axios from "axios";
import { toast } from "react-hot-toast";

const CampCategoryPage = () => {

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryDescription: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log('Adding Category data:', formData);
    
        const campCategoryData = {
            category_name: formData.categoryName,
            category_description: formData.categoryDescription,
            created_at: new Date().toISOString(),
        };
    
        try {
            const res = await axios.post('http://localhost:9000/admin/category', campCategoryData);
            console.log(res.data);
            if (res.data) {
                toast.success('category Added Successfully');
                setFormData({ categoryName: '', categoryDescription: '' });
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
                        <label htmlFor='categoryName'>Category</label>
                        <input type="text" name="categoryName" placeholder="Camping Category" value={formData.categoryName} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor='categoryDescription'>Category Description</label>
                        <textarea name="categoryDescription" placeholder="Category Description" value={formData.categoryDescription} onChange={handleChange} required/>
                    </div>
                    
                    <div className="form-action">
                        <button type="submit" className="btnSubmit">Add Category</button>
                    </div>
                    
                </form>
            </div>
    );
};

export default CampCategoryPage;
