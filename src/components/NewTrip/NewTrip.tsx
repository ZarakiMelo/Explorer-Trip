import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import Modal from 'react-modal';
import ModalButton from '../ModalButton/ModalButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ModalContent, NewTripProps } from '../../types';


/**
 * Custom styles for the modal.
 */
const customStyles: Modal.Styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "200px",
    width: "400px",
    borderRadius: "20px",
    border: "2px solid #5A6E55",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: "#e0ddda",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};


/**
 * Main component for creating a new trip.
 */
const NewTrip: React.FC<NewTripProps> = ({trip,handleNameChange,handleStartDayChange,handleChangeState,formatDate}) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalContent>({ state: false, message: "" });

  
  const openModal = (message: string) => {
    setModal({ state: true, message })
  }


  const closeModal = () => { setModal({ state: false, message: "" }) }

  // User inputs verification
  /**
   * Handles the submission of the trip creation form.
   * Checks user inputs and triggers modal display in case of errors.
   */
  const handleSubmit = () => {
    if (!validateTrip()) return;
   handleChangeState(trip.state);
    openModal("Voyage créé !!!!")
  };

  /**
   * Validates user inputs.
   * Displays an error modal if any issues.
   * @returns True if inputs are valid, otherwise false.
   */
  const validateTrip = () => {
    if (!trip.name) {
      openModal("Saisir un nom de voyage");
      return false;
    } else if (!trip.startDay) {
      openModal("Saisir une date de début");
      return false;
    } else if (formatDate(trip.startDay) === formatDate(new Date())) {
      openModal("On va peut-être attendre demain pour partir !!^^");
      return false;
    }
    return true;
  };



  return (
    <div className={styles.container}>
      <MainNavBar />
      <div className={styles.form_container}>
        <Modal
          isOpen={modal.state}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <div className={styles.close_container}>
            <button className={styles.close_button} type='button' onClick={closeModal}>X</button>
          </div>
          <div className={styles.modal_message_container}>
              <FontAwesomeIcon  className={styles.icon} icon={faPen}></FontAwesomeIcon>
             <p>{modal.message}</p>
          </div>
         
          {/*<ModalButton action={} text="Compris" color="#5A6E55"></ModalButton>*/}
        </Modal>

        {!trip.state && (
          <>
            <p className={styles.text}>L'aventure s'appelera :</p>
            <input className={styles.input} type="text" value={trip.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Nom du voyage" maxLength={50} />
            <p className={styles.text}>et elle commencera le : {formatDate(trip.startDay)}</p>
            <div className={styles.calendar_container}>
               <button className={styles.window_button} type='button' onClick={()=>{setCalendarOpen(!calendarOpen)}}> {calendarOpen ? 'Fermer' : 'Choisir une date'}</button>
              <div className={`${styles.calendar_window} ${calendarOpen ? 'calendar-open' : 'calendar-closed'}`}>
              <Calendar onChange={handleStartDayChange} value={trip.startDay} minDate={new Date()} />
              </div>
             
            </div>
            
            <button className={styles.submit_button} type="submit" onClick={handleSubmit}>Let's go !</button>
          </>
        )}
        {trip.state && (
          <>
            <h1>{trip.name}</h1>
            <p>will start on: {formatDate(trip.startDay)} !</p>
          </>)
        }

      </div>
    </div>
  );
};

export default NewTrip;