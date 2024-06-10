import React, { useState, useEffect } from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';
import { Trip, Value,LocationData, ValuePiece } from '../../types';
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
        console.log("Loaded trip from localStorage:", parsedTrip); // Add this line
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

  const handleStartDayChange = (startDay: ValuePiece | [ValuePiece, ValuePiece]) => {
    if (Array.isArray(startDay)) {
      setTrip((prevTrip) => ({ ...prevTrip, startDay: startDay[0] })); // On ne prend que la première date pour startDay
    } else {
      setTrip((prevTrip) => ({ ...prevTrip, startDay }));
    }
  };

  const handleChangeState = (state: boolean) => {
    setTrip((prevTrip) => ({ ...prevTrip, state: !state }));
  };

  const handleAddLocation = (location: LocationData) => {
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

  const sortDestinations = (destinations : LocationData[]) => {
   const sortedData = destinations
  .filter((location) => {
    return Array.isArray(location.dates) && location.dates[0] instanceof Date;
  })
  .sort((a, b) => {
    const dateA = new Date((a.dates as [Date, Date])[0]).getTime();
    const dateB = new Date((b.dates as [Date, Date])[0]).getTime();
    return dateA - dateB; // Trier par date de début (ascendant)
  })
  return sortedData
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
      <AllDestinationsList trip={trip} handleDeleteDestination={handleDeleteDestination} sortDestinations={sortDestinations}/>
      <Divider/>
      <Mapp trip={trip} sortDestinations={sortDestinations}/>
      <Divider/>
      <DeleteTrip handleDeleteTrip={handleDeleteTrip}/>
      </>)}
    </div>
  );
};

export default MyTripPage;
