import React from 'react'
import styles from './DestinationCard.module.css';
import { DestinationCardProps, Value, ValuePiece } from '../../types';




const DestinationCard:React.FC<DestinationCardProps> = ({destination})=> {

 // console.log({"DestinationCard : destination":destination.dates instanceof Date?"false":typeof(destination.dates?.[0])});
  const formatDate = (date: ValuePiece) => {

    if(!date || !(date instanceof Date))return "false";
    const options = { day: '2-digit' as const, month: '2-digit' as const, year: 'numeric' as const };
    return date.toLocaleDateString('fr-FR', options);
  };
  return (
    <div className={styles.card_container}>
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
                    <button type='button'>Modifier</button>
                </div>
                
  </div>
    </div>
  )
}

export default DestinationCard
