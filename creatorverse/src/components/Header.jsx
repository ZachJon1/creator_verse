import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <ul>
          <li><Link to="/" className="brand-link">Creator UniVerse 🌎🌕☄️🪐🚀</Link></li>
        </ul>
        <ul>
          <li><Link to="/add" role="button">Add Creator</Link></li>
        </ul>
      </div>
    </header>
  );
}