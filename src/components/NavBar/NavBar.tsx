// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/myTrip">Lancer un trip</Link></li>
        <li><Link to="/allTrips">Mes voyages</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;