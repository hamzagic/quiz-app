import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import styles from './Header.module.scss';
import { FaBell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Cookies from 'js-cookie';


const Header = () => {
  const cookie = Cookies.get('token');
  return (
    <div>
      <AppBar position="static" className={styles.barContainer}>
        <Toolbar>
          <div className={styles.headerContainer}>
          {cookie && <IconButton edge="start" color="primary">
            <MdMenu color="#fff" />
          </IconButton>}
            <h1 className={styles.headerTitle}>Quiz App</h1>
          </div>
          {cookie && <IconButton edge="end">
            <FaBell color="#fff" />
          </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
