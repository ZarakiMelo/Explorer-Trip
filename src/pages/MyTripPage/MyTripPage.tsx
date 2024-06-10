import React, { useState, useEffect } from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';
import { Trip, Value,Location } from '../../types';
import AddDestination from '../../components/AddDestination/AddDestination';
import Mapp from '../../components/Mapp/Mapp';
import DeleteTrip from '../../components/DeleteTrip/DeleteTrip';
import Divider from '../../components/Divider/Divider';
import AllDestinationsList from '../../components/AllDestinationsList/AllDestinationsList';

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
      return { state: false, name: "", startDay: new Date() ,locations:[]};
    } catch (error) {
      console.error("Error parsing localStorage item 'trip':", error);
      return { state: false, name: "", startDay: new Date() ,locations:[]};
    }
  });
  console.log({"trip":trip});
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

  const handleAddLocation = (location: Location) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      locations: [...prevTrip.locations, location]
    }));
  };

  const handleDeleteTrip = ()=>{
    setTrip( ({ state: false, name: "", startDay: new Date(),locations:[] }));
  }
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

  const handleDeleteDestination = (id: number) => {
    const newDestinations = trip.locations.filter((location) => location.id !== id);
    setTrip((prevTrip) => ({
      ...prevTrip,
      locations: newDestinations
    }));
  };

  
  console.log({"Trip in MyTripPage":trip});
  return (
    <div className={styles.container}>
    <NewTrip 
        trip={trip} 
        handleNameChange={handleNameChange} 
        handleStartDayChange={handleStartDayChange} 
        formatDate={formatDate} 
        handleChangeState={handleChangeState}
  />
      {trip.state && (<>
      <AddDestination handleAddLocation={handleAddLocation} trip={trip}/>
      <Divider/>
      <AllDestinationsList allDestinations={trip.locations} handleDeleteDestination={handleDeleteDestination}/>
      <Divider/>
      <Mapp allDestinations={trip.locations}/>
      <Divider/>
      <DeleteTrip handleDeleteTrip={handleDeleteTrip}/>
      </>)}
    </div>
  );
};

export default MyTripPage;
