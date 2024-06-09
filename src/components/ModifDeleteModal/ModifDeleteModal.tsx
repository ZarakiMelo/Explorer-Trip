import React, { useEffect } from 'react';
import {  ModifDeleteModalProps} from '../../types';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from './ModifDeleteModal.module.css'
import ConfirmCancelButton from '../ModalButton/ConfirmCancelButton';

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

const ModifDeleteModal:React.FC<ModifDeleteModalProps> = ({openCloseModal,destination,modal, formatDate, handleDeleteDestination})=> {

const deleteDestination = () => {
    openCloseModal()
    handleDeleteDestination(destination.id)
}

  return (
    <Modal
    isOpen={modal}
    onRequestClose={openCloseModal}
    style={customStyles}
    contentLabel="Example Modal"
    shouldCloseOnOverlayClick={false}
  >
    <div className={styles.modal_message_container}>
       <p className={styles.message}>{destination.name}</p>
    </div>
    <div className={styles.buttons_container}>
         <ConfirmCancelButton action={openCloseModal} text="Revenir" color={1} ></ConfirmCancelButton>
    <ConfirmCancelButton action={deleteDestination} text="Supprimer" color={2}></ConfirmCancelButton>
    </div>
   
  </Modal>
  )
}

export default ModifDeleteModal
