import React from 'react';
import {  AlertModalProps} from '../../types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AlertModal.module.css'

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
      zIndex: 9998, 
    },
  };

const AlertModal:React.FC<AlertModalProps> = (props)=> {
const {closeModal, modal}=props


  return (
    <Modal
    isOpen={modal.state}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
    shouldCloseOnOverlayClick={true}
  >
   <div className={styles.modal_container}>

     <div className={styles.modal_message_container}>
        <FontAwesomeIcon  className={modal.iconColor=="#845A5A"?styles.icon_reject:styles.icon_valid} icon={modal.icon}></FontAwesomeIcon>
       <p className={styles.message}>{modal.message}</p>
    </div>
   </div>
   
  
  </Modal>
  )
}

export default AlertModal
