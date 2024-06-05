import React from 'react'
import styles from './MainNavBar.module.css'
import { Link } from 'react-router-dom'

const MainNavBar = () => {
  return (
    <div className={styles.header}> 
        <img className={styles.logo} src='/appLogo.png' alt="app's logo" />
        <nav className={styles.nav_container}>
            <nav className={styles.nav_item}>
                <Link to="/" className={styles.nav_link} >Accueil</Link>
            </nav>
            <nav className={styles.nav_item}>
                <Link to="/myTripPage" className={styles.nav_link} >Mes voyages</Link>
            </nav>
        </nav>
      </div>
  )
}

export default MainNavBar
