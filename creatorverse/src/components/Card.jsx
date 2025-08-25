import { Link } from 'react-router-dom';

export default function Card({ creator }) {
  return (
    <article className="card">
      <img 
        src={creator.imageURL || 'https://placehold.co/600x400?text=No+Image'} 
        alt={creator.name} 
        className="creator-image"
      />
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p>{creator.description?.substring(0, 100)}...</p>
        <div className="grid card-actions">
          <Link to={`/creator/${creator.id}`} role="button">View Details</Link>
          <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="secondary">Visit Channel</a>
        </div>
      </div>
    </article>
  );
}