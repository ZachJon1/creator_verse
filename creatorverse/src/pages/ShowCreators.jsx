import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Card from '../components/Card';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreators();
  }, []);

  async function getCreators() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setCreators(data);
      }
    } catch (error) {
      console.error('Error fetching creators:', error.message);
      alert('Error fetching creators. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div aria-busy="true">Loading creators...</div>;
  }

  return (
    <div>
      <h1>Content Creators</h1>
      {creators.length === 0 ? (
        <p>No creators found. Add some!</p>
      ) : (
        <div className="creator-grid">
          {creators.map(creator => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}