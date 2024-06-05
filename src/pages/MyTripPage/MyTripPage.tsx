import React, { useState, useEffect } from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';
import { Trip, Value } from '../../types';

const MyTripPage: React.FC = () => {
  const [trip, setTrip] = useState<Trip>(() => {
    try {
      const savedTrip = localStorage.getItem('trip');
      if (savedTrip) {
        const parsedTrip = JSON.parse(savedTrip);
        return {
          ...parsedTrip,
          startDay: parsedTrip.startDay ? new Date(parsedTrip.startDay) : new Date(),
        };
      }
      return { state: false, name: "", startDay: new Date() };
    } catch (error) {
      console.error("Error parsing localStorage item 'trip':", error);
      return { state: false, name: "", startDay: new Date() };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('trip', JSON.stringify(trip));
    } catch (error) {
      console.error("Error setting localStorage item 'trip':", error);
    }
  }, [trip]);

  const handleNameChange = (name: string) => {
    setTrip((prevTrip) => ({ ...prevTrip, name }));
  };

  const handleStartDayChange = (startDay: Value) => {
    setTrip((prevTrip) => ({ ...prevTrip, startDay }));
  };

  const handleChangeState = (state: boolean) => {
    setTrip((prevTrip) => ({ ...prevTrip, state: !state }));
  };

  /**
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: Value) => {
    if (!date || Array.isArray(date)) return "";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className={styles.container}>
      <NewTrip 
        trip={trip} 
        handleNameChange={handleNameChange} 
        handleStartDayChange={handleStartDayChange} 
        formatDate={formatDate} 
        handleChangeState={handleChangeState}
      />
    </div>
  );
};

export default MyTripPage;
