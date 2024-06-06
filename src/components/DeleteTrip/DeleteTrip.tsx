import React from 'react';
import styles from './DeleteTrip.module.css'
import { DeleteTripProps } from '../../types';


const DeleteTrip : React.FC<DeleteTripProps>= ({handleDeleteTrip})=> {
  return (
    <div>
      <button type='button' onClick={handleDeleteTrip}>SUPPRIMER LE VOYAGE</button>
    </div>
  )
}

export default DeleteTrip
