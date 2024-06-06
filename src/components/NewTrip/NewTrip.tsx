import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import { ModalContent, NewTripProps } from '../../types';
import ModalComponent from '../ModalComponent/ModalComponent';
import { faPen, faStop, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';



/**
 * Main component for creating a new trip.
 */
const NewTrip: React.FC<NewTripProps> = (props) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalContent>({ type :"",state: false, message: "",icon : null, iconColor:""});
  const {trip,handleNameChange,handleStartDayChange,handleChangeState,formatDate} = props;

  
  const openModal = (message: string, icon : any, iconColor:string) => {
    setModal({ ...modal,state: true, message, icon, iconColor})
  }

  const closeModal = () => { setModal({ ...modal,state: false, message: "" }) }

  // User inputs verification
  /**
   * Handles the submission of the trip creation form.
   * Checks user inputs and triggers modal display in case of errors.
   */
  const handleSubmit = () => {
    if (!validateTrip()) return;
   handleChangeState(trip.state);
    openModal("Voyage créé !!!!", faGlobe,"#5A6E55")
  };

  /**
   * Validates user inputs.
   * Displays an error modal if any issues.
   * @returns True if inputs are valid, otherwise false.
   */
  const validateTrip = () => {
    if (!trip.name) {
      openModal("Saisir un nom de voyage", faPen,"#845A5A");
      return false;
    } else if (formatDate(trip.startDay) === formatDate(new Date())) {
      openModal("On va peut-être attendre demain pour partir !!^^",faStop,"#845A5A");
      return false;
    }
    return true;
  };



  return (
    <div className={styles.container} style={{height:trip.state?"600px":"1040px"}}>
      <MainNavBar />
      <ModalComponent modal={modal} closeModal={closeModal}></ModalComponent>
        
        {!trip.state && (
          <div className={styles.content}>
          
            <div className={styles.form_container}>
              <div className={styles.input_container}>
                <input className={styles.input} type="text" value={trip.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Saisissez un nom pour ce voyage !" maxLength={50} />
              </div>
              
              <div className={styles.calendar_container}>
                <button className={styles.window_button} type='button' onClick={()=>{setCalendarOpen(!calendarOpen)}}> {calendarOpen ? 'Fermer' : 'Choisir une date'}</button>
                <div className={`${styles.calendar_window} ${calendarOpen ? 'calendar-open' : 'calendar-closed'}`}>
                <Calendar onChange={handleStartDayChange} value={trip.startDay} minDate={new Date()} locale="fr"
        formatShortWeekday={(locale, date) => format(date, 'EEEEEE', { locale: fr })}
        formatMonth={(locale, date) => format(date, 'LLLL', { locale: fr })}
        formatMonthYear={(locale, date) => format(date, 'LLLL yyyy', { locale: fr })}/>
                </div>
              </div>
            </div>
            <div className={styles.button_container}>
              <button className={styles.submit_button} type="submit" onClick={handleSubmit}>Let's go !</button>
            </div>     
            
       </div>
        )}
        {trip.state && (
          <>
          
              <p className={styles.text}>{trip.name}</p>
               <p className={styles.text}>à partir du {formatDate(trip.startDay)}</p>
       
          </>)
        }

     
    </div>
  );
};

export default NewTrip;