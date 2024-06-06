import React from 'react';
import styles from './ConfirmCancelButton.module.css';
import {ConfirmCancelButtonProps } from '../../types';


const ConfirmCancelButton : React.FC<ConfirmCancelButtonProps> = ({color,text,action}) => {

  return (
    <button type='button' onClick={action} className={styles.button} style={color===1?{backgroundColor:'var(--color1)'}:{backgroundColor:'var(--color3)'}}>{text}</button>
  )
}

export default ConfirmCancelButton
