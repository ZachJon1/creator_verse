import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) getCreator();
  }, [id]);

  async function getCreator() {
    try {
      setLoading(true);
      console.log('Fetching creator with ID:', id);
      
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log('Creator data:', data);
      setFormData(data || {});
    } catch (error) {
      console.error('Error fetching creator:', error);
      setError('Failed to load creator data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

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
      console.log('Updating creator with ID:', id);
      console.log('Update data:', formData);
      
      // Create a clean data object that only includes the fields you want to update
      const updateData = {
        name: formData.name,
        url: formData.url,
        description: formData.description || null,
        imageURL: formData.imageURL || null
      };
      
      const { error } = await supabase
        .from('creators')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      console.log('Update successful');
      navigate(`/creator/${id}`);
    } catch (error) {
      console.error('Error updating creator:', error);
      setError('Failed to update creator: ' + error.message);
      alert('Error updating creator. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error}</p>
        <Link to={`/creator/${id}`} className="secondary">&larr; Back</Link>
      </div>
    );
  }

  if (loading && !formData.name) {
    return <div aria-busy="true">Loading creator data...</div>;
  }

  return (
    <div>
      <h1>Edit Creator: {formData.name}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name || ''}
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
            value={formData.url || ''}
            onChange={handleChange}
            required
          />
        </label>
        
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
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
            value={formData.imageURL || ''}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Creator'}
        </button>
      </form>
      <Link to={`/creator/${id}`} className="secondary">&larr; Cancel</Link>
    </div>
  );
}