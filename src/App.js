import './App.css';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/:userId" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
