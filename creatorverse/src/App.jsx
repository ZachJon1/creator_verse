import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
          <Route path="/add" element={<AddCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;