import React, {useState} from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';
import { Trip, Value} from '../../types';



const MyTripPage: React.FC = () => {
  const [trip, setTrip] = useState<Trip>({
    state: false,
    name: "",
    startDay: new Date(),
  });


  const handleNameChange = (name: string) => {
    setTrip({ ...trip, name })
  }
  
  const handleStartDayChange = (startDay: Value) => {
    setTrip({ ...trip, startDay })
  }

   const handleChangeState = (state : boolean) => {
    setTrip({ ...trip, state: !state})
  }
   /**
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: Value) => {
    if (!date || date instanceof Array) return "";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <div className={styles.container}>
      <NewTrip trip={trip} handleNameChange={handleNameChange} handleStartDayChange={handleStartDayChange} formatDate={formatDate} handleChangeState={handleChangeState}/>
    </div>
  );
};

export default MyTripPage;