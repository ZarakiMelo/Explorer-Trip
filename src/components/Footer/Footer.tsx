import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Explorer Trip Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;