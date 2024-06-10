import React,{useEffect, useState} from 'react'

import styles from './DestinationCard.module.css';
import { DestinationCardProps, Value, ValuePiece } from '../../types';
import ModifDeleteModal from '../ModifDeleteModal/ModifDeleteModal';




const DestinationCard:React.FC<DestinationCardProps> = ({destination, handleDeleteDestination, modal, openCloseModal})=> {

 console.log({"DestinationCard : destination":destination});
  const formatDate = (date: ValuePiece) => {
    if(!date || !(date instanceof Date))return "false";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };



  return (
    <div className={styles.card_container}>
      <ModifDeleteModal formatDate={formatDate} modal={modal} openCloseModal={openCloseModal} destination={destination} handleDeleteDestination={handleDeleteDestination}></ModifDeleteModal>
             <div className={styles.card_media}>
           </div>
            <div className={styles.card_infos}>
                <p >{destination.name}</p>
                {destination.dates && Array.isArray(destination.dates) && (
          <>
            <p>{formatDate(destination.dates[0])} au {formatDate(destination.dates[1])}</p>
          </>
        )}
                <div className={styles.button_container}>
                    <button type='button' onClick={openCloseModal}>Supprimer</button>
                </div>
                
  </div>
    </div>
  )
}

export default DestinationCard
