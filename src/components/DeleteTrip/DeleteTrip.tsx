import React,{useState} from 'react';
import styles from './DeleteTrip.module.css'
import { DeleteTripProps, AlertModalContent } from '../../types';
import AlertModal from '../AlertModal/AlertModal';
import { faPen, faStop } from '@fortawesome/free-solid-svg-icons';


const DeleteTrip : React.FC<DeleteTripProps>= ({handleDeleteTrip, openAlertModal,modal ,closeModal})=> {
  
 
const handleDelete=()=>{
  handleDeleteTrip()
  openAlertModal("Voyage annulé", faStop, "#5A6E55");
}

  return (
    <div className={styles.container}>
       <AlertModal modal={modal} closeModal={closeModal} />
      <button type='button' onClick={handleDelete}>SUPPRIMER LE VOYAGE</button>
    </div>
  )
}

export default DeleteTrip
