import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import Modal from 'react-modal';
import ModalButton from '../ModalButton/ModalButton';

/**
 * Represents a fragment of a value for a date.
 */
type ValuePiece = Date | null;

/**
 * Represents a value for a date, which can be either a complete date or a pair of date values (start and end).
 */
type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * Represents the content of a modal.
 */
type ModalContent = {
  /** State of the modal */
  state: boolean,
  /** Message to be displayed in the modal */
  message: string
}

/**
 * Represents a trip.
 */
type Trip = {
  /** State of the trip */
  state: boolean,
  /** Name of the trip */
  name: string,
  /** Start date of the trip */
  startDay: Value,
}

/**
 * Custom styles for the modal.
 */
const customStyles: Modal.Styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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
const NewTrip: React.FC = () => {
  const [trip, setTrip] = useState<Trip>({
    state: false,
    name: "",
    startDay: new Date(),
  });
  const [modal, setModal] = useState<ModalContent>({ state: false, message: "" });

  // Modal functions
  /**
   * Opens the modal with a specified message.
   * @param message - Message to be displayed in the modal.
   */
  const openModal = (message: string) => {
    setModal({ state: true, message })
  }

  /**
   * Closes the modal.
   */
  const closeModal = () => { setModal({ state: false, message: "" }) }

  // User inputs verification
  /**
   * Handles the submission of the trip creation form.
   * Checks user inputs and triggers modal display in case of errors.
   */
  const handleSubmit = () => {
    if (!validateTrip()) return;
    setTrip({ ...trip, state: true });
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

  /**
   * Handles the change of trip name based on user input.
   * @param name - New trip name.
   */
  const handleNameChange = (name: string) => {
    setTrip({ ...trip, name })
  }

  /**
   * Handles the change of trip start date based on user selection.
   * @param startDay - New start date of the trip.
   */
  const handleStartDayChange = (startDay: Value) => {
    setTrip({ ...trip, startDay })
  }

  /**
   * Formats a date into a string in "dd/MM/YYYY" format.
   * @param date - Date to format.
   * @returns Formatted date as a string.
   */
  const formatDate = (date: Value) => {
    if (!date || date instanceof Array) return "";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('en-US', options);
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
          <p>{modal.message}</p>
          <ModalButton action={closeModal} text="Compris" color="#5A6E55"></ModalButton>
        </Modal>

        {!trip.state && (
          <>
            <p className={styles.text}>L'aventure s'appelera :</p>
            <input className={styles.input} type="text" value={trip.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Nom du voyage" maxLength={50} />
            <p className={styles.text}>et elle commencera le : {formatDate(trip.startDay)}</p>
            <Calendar onChange={handleStartDayChange} value={trip.startDay} minDate={new Date()} />
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