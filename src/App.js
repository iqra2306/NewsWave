import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const  App =()=> {
 
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News pagesize={10} category="" />} />
            <Route exact path="/Sports" element={<News key="Sports" pagesize={10} category="Sports" />} />
            <Route exact path="/Science" element={<News key="Science" pagesize={10} category="Science" />} />
            <Route exact path="/Health" element={<News key="Health" pagesize={10} category="Health" />} />
            <Route exact path="/Technology" element={<News key="Technology" pagesize={10} category="Technology" />} />
            <Route exact path="/Entertainment" element={<News key="Entertainment" pagesize={10} category="Entertainment" />} />
            <Route exact path="/Business" element={<News key="Business" pagesize={10} category="Business" />} />
            <Route exact path="/General" element={<News key="General" pagesize={10} category="General" />} />
          </Routes>
        </Router>
      </div>
    );
  }
export default App
