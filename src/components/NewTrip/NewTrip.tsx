import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewTrip: React.FC = () => {
  const [trip, setTrip] = useState<string>("");
  const [date, setDate] = useState<Value>(new Date());


  const handleSubmit = () => {
    if(!trip)console.log("Saisir un nom de voyage");
    else
    if(!date) console.log("Saisir une date de début");
    else console.log(`${trip} débutera le ${date} !`);
    }

  return (
    <div className={styles.container}>
      <MainNavBar />
        <div className={styles.form_container} >
            <p className={styles.text}>L'aventure s'appelera</p>
            <input className={styles.input} type="text" value={trip} onChange= {(e)=>{setTrip(e.target.value)}} />
            <p className={styles.text}>et elle débutera le :</p>
            <Calendar onChange={setDate} value={date}/>
            <button className={styles.submit_button} type="submit" onClick={handleSubmit}>C'est parti !</button>
        </div>
    </div>
  );
};

export default NewTrip;
