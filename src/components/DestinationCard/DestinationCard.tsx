import React from 'react'
import styles from './DestinationCard.module.css'

const DestinationCard:React.FC = ()=> {
  return (
    <div className={styles.card_container}>
            <div className={styles.card_media}>

            </div>
            <div className={styles.card_infos}>
                <p >Paris</p>
                <p>14/07/24 au 21/07/24</p>
                <div className={styles.button_container}>
                    <button type='button'>Modifier</button>
                </div>
                
            </div>
    </div>
  )
}

export default DestinationCard
