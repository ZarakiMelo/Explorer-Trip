import React, { useState } from 'react';
import styles from './NewTrip.module.css';
import MainNavBar from '../MainNavBar/MainNavBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import Modal from 'react-modal';
import ModalButton from '../ModalButton/ModalButton';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const customStyles: Modal.Styles= {
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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", 
  },
};
type ModalContent = {
  state : boolean,
  message : string
}

const NewTrip: React.FC = () => {
  const [trip, setTrip] = useState<string>("");
  const [date, setDate] = useState<Value>(new Date());
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalContent>({state : false, message : ""});

  //Modal functions
  const openModal = (message:string) => {
    setModal({state:true,message})}
  const closeModal = () => {setModal({state : false, message : ""})}

  //inputs verification
  const handleSubmit = () => {
    if (!trip) {
      openModal("Saisir un nom de voyage");
    } if (!date) {
      openModal("Saisir une date de début");
    } else {
        setSubmitted(true);
        openModal(formatDate())
    }
  };
  


  const formatDate = () => {
    if (!date || date instanceof Array) return "";
    else{
        const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
        return date.toLocaleDateString('fr-FR', options);
    }
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
        <div className={styles.modal_content}>
             <p>{modal.message}</p>
            <ModalButton action={closeModal} text="Compris" color="#5A6E55"></ModalButton>
        </div>
      </Modal>
      
        <p className={styles.text}>L'aventure s'appelera</p>
        <input className={styles.input} type="text" value={trip} onChange={(e) => setTrip(e.target.value)} placeholder="Nom du voyage" maxLength={50}/>
        <p className={styles.text}>et elle débutera le :</p>
        <Calendar onChange={setDate} value={date} />
        <button className={styles.submit_button} type="submit" onClick={handleSubmit}>C'est parti !</button>
       
      </div>
    </div>
  );
};

export default NewTrip;