import React, { useState, useEffect } from 'react';
import './Adminstyles.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CampsiteAddPage = () => {
  const [formData, setFormData] = useState({
    campsite_name: '',
    description: '',
    address: '',
    city_id: '',
    state_id: '',
    amount: '',
    amenities: '',
    image: [],
    availability: '',
    category_id: '',
    tags: [],
    start_date: '',
    end_date: ''
  });

  const [cities, setCities] = useState([]);  
  const [states, setStates] = useState([]);  
  const [categories, setCategories] = useState([]);  

  const tagOptions = ['Pet-Friendly', 'Mountain-View', 'Lake-Side', 'Family-Friendly', 'Romantic'];

  useEffect(() => {
    axios.get('http://localhost:9000/admin/state')
      .then(response => {
        setStates(response.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:9000/admin/category')
      .then(response => setCategories(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFormData({ ...formData, state_id: stateId, city_id: '' }); // Reset city when state changes

    if (stateId) {
      axios.get(`http://localhost:9000/admin/getCitiesByState/${stateId}`)
        .then(response => {
          setCities(response.data); 
        })
        .catch(err => {
          console.error('Error fetching cities:', err);
          setCities([]); 
        });
    } else {
      setCities([]); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleTagChange = (tag) => {
    setFormData((prevFormData) => {
      const tags = prevFormData.tags.includes(tag)
        ? prevFormData.tags.filter((t) => t !== tag)
        : [...prevFormData.tags, tag];
      return { ...prevFormData, tags };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, image: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (key === 'image') {
        formData.image.forEach((img) => formDataToSend.append('image', img));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      await axios.post('http://localhost:9000/admin/campsite', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Campsite added successfully!');
      setFormData({
        campsite_name: '',
        description: '',
        address: '',
        city_id: '',
        state_id: '',
        amount: '',
        amenities: '',
        image: [],
        availability: '',
        category_id: '',
        tags: [],
        start_date: '',
        end_date: ''
      });
    } catch (error) {
      console.error('Error adding campsite:', error);
      toast.error('Error: ' + error.response?.data?.message || 'Error occurred');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Add New Campsite</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="campsite_name">Campsite Name</label>
          <input
            type="text"
            name="campsite_name"
            value={formData.campsite_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state_id">State</label>
          <select
            name="state_id"
            value={formData.state_id}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city_id">City</label>
          <select
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            required
            disabled={cities.length === 0} 
          >
            <option value="">Select City</option>
            {cities.length > 0 ? (
              cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.city_name}
                </option>
              ))
            ) : (
              <option value="">No cities available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amenities">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tag-checkboxes">
            {tagOptions.map((tag) => (
              <label key={tag}>
                <input type="checkbox" checked={formData.tags.includes(tag)} onChange={() => handleTagChange(tag)} />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date</label>
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} min={formData.start_date || new Date().toISOString().split('T')[0]} required />
        </div>

        <div className="form-group">
          <label htmlFor="image">Images</label>
          <input
            type="file"
            name="image"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit">Add Campsite</button>
      </form>
    </div>
  );
};

export default CampsiteAddPage;
