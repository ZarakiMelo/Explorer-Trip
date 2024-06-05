import React from 'react';
import {  ModalComponentProps} from '../../types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalComponent.module.css'

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

const ModalComponent:React.FC<ModalComponentProps> = ({closeModal,modal})=> {


  return (
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
  )
}

export default ModalComponent
