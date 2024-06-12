import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MyTripPage from './pages/MyTripPage/MyTripPage';
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div>
         <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/MyTripPage" element={<MyTripPage/>} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer/>
      </div>
     
    </Router>
  );
};

export default App;