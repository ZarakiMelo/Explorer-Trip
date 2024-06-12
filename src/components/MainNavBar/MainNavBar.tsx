import React from 'react'
import styles from './MainNavBar.module.css'
import { Link } from 'react-router-dom'

const MainNavBar = () => {
  return (
    <div className={styles.header}> 
        <Link to="/" className={styles.logo_container}>
          <img className={styles.logo} src='/appLogo.png' alt="app's logo" />
        </Link>
        <nav className={styles.nav_container}>
            <nav className={styles.nav_item}>
                <Link to="/AllTripsPage" className={styles.nav_link} >Mes voyages</Link>
            </nav>
        </nav>
      </div>
  )
}

export default MainNavBar
