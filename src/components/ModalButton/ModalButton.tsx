import React from 'react';
import styles from './ModalButton.module.css'

interface ModalButtonProps {
    color : string,
   text : string,
   action : () => void,
}

const ModalButton : React.FC<ModalButtonProps> = ({color,text,action}) => {

  return (
    <button type='button' onClick={action} className={styles.button} style={{backgroundColor:color}}>{text}</button>
  )
}

export default ModalButton
