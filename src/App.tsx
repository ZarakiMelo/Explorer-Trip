import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MyTrip from './pages/MyTrip/MyTrip';
import AllTrips from './pages/AllTrips/AllTrips';
import NotFound from './pages/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/MyTrip" element={<MyTrip/>} />
        <Route path="/AllTrips" element={<AllTrips/>} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
};

export default App;