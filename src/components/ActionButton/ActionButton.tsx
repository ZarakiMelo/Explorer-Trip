import React from 'react';
import styles from './ActionButton.module.css';
import {ActionButtonProps } from '../../types';


const ActionButton : React.FC<ActionButtonProps> = (props) => {

  const {color,text,action}=props
  
  return (
    <button type='button' onClick={action} className={styles.button} style={color===1?{backgroundColor:'var(--color1)'}:{backgroundColor:'var(--color3)'}}>{text}</button>
  )
}

export default ActionButton
