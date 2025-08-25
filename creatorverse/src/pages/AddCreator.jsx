import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!formData.name || !formData.url) {
      alert('Name and URL are required!');
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('creators')
        .insert([formData])
        .select();
      
      if (error) {
        throw error;
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error adding creator:', error.message);
      alert('Error adding creator. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Add New Creator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        
        <label htmlFor="url">
          URL
          <input
            id="url"
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://example.com"
          />
        </label>
        
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </label>
        
        <label htmlFor="imageURL">
          Image URL
          <input
            id="imageURL"
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>
        
        <button type="submit" aria-busy={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
      </form>
      <Link to="/" className="secondary">&larr; Cancel</Link>
    </div>
  );
}