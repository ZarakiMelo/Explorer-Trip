import React from 'react';
import styles from './ModalButton.module.css';
import { ModalButtonProps } from '../../types';


const ModalButton : React.FC<ModalButtonProps> = ({color,text,action}) => {

  return (
    <button type='button' onClick={action} className={styles.button} style={{backgroundColor:color}}>{text}</button>
  )
}

export default ModalButton
