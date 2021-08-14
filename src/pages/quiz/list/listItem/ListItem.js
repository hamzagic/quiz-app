import React from 'react';
import styles from './ListItem.module.scss';

const ListItem = (props) => {
    return(
        <div className={styles.container}>{props.children}</div>
    );
}

export default ListItem;