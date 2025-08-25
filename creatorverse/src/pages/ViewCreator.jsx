import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) getCreator();
  }, [id]);

  async function getCreator() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator:', error.message);
      alert('Creator not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  async function deleteCreator() {
    if (confirm('Are you sure you want to delete this creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        navigate('/');
      } catch (error) {
        console.error('Error deleting creator:', error.message);
        alert('Error deleting creator');
      }
    }
  }

  if (loading) {
    return <div aria-busy="true">Loading creator details...</div>;
  }

  if (!creator) {
    return <div>Creator not found</div>;
  }

  return (
    <div>
      <h1>{creator.name}</h1>
      <img 
        src={creator.imageURL || 'https://placehold.co/600x400?text=No+Image'} 
        alt={creator.name} 
        style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      <p>{creator.description}</p>
      <div className="grid">
        <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button">Visit Channel</a>
        <Link to={`/edit/${creator.id}`} role="button" className="secondary">Edit Creator</Link>
        <button onClick={deleteCreator} className="contrast">Delete Creator</button>
      </div>
      <Link to="/">&larr; Back to Creators</Link>
    </div>
  );
}