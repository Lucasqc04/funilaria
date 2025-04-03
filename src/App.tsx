import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
 
import Appointment from './pages/Appointment';
 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/agendar" element={<Appointment />} />
          
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
