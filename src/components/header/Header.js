import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import styles from './Header.module.scss';
import { FaBell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";


const Header = () => {
  return (
    <div>
      <AppBar position="static" className={styles.barContainer}>
        <Toolbar>
          <div className={styles.headerContainer}>
          <IconButton edge="start" color="primary">
            <MdMenu color="#fff" />
          </IconButton>
            <h1 className={styles.headerTitle}>Quiz App</h1>
          </div>
          <IconButton edge="end">
            <FaBell color="#fff" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
