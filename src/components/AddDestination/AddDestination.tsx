import React from 'react';
import styles from './AddDestination.module.css';
import Title from '../Title/Title';


const AddDestination: React.FC = () => {
    const title = "Choisissez votre destination";
  return (
    <div className={styles.container}>
                <Title text={title}/>
                <div className={styles.inputs_container}>
                    <div className={styles.input_container}>
                             <p className={styles.input_name}>Nom :</p>
                            <input className={styles.input}></input>
                   
                    </div>
                    <div className={styles.input_container}>
                        <p className={styles.input_name}>Durée :</p>
                        <input className={styles.input}></input>
                        
                    </div>
                </div>
                <div className={styles.buttons_container}>
                    <button type='button'>Valider</button>
                    <button type='button'>Annuler</button>
                </div>
    </div>
  )
}

export default AddDestination
