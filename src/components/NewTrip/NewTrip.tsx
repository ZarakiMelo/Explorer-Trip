import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';


const NewTrip: React.FC = () => {
  const [trip, setTrip] = useState("");
  const [startDay,setStartDay] = useState("");


  const handleSubmit = () => {
    if(!trip)console.log("Saisir un nom de voyage");
    else
    if(!startDay) console.log("Saisir une date de début");
    else console.log(`${trip} débutera le ${startDay} !`);
    }

  return (
    <div className={styles.container}>
      <MainNavBar />
      <div className={styles.inputs_container}>
        <div className={styles.form_container} >
            <p className={styles.text}>L'aventure s'appelera</p>
            <input className={styles.input} type="text" value={trip} onChange= {(e)=>{setTrip(e.target.value)}} />
            <p className={styles.text}>et elle débutera le :</p>
          
            <button className={styles.submit_button} type="submit" onClick={handleSubmit}>C'est parti !</button>
        </div>
      </div>
    </div>
  );
};

export default NewTrip;
