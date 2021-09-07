import React from 'react';
import styles from './ListItem.module.scss';

const ListItem = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                {props.children}
            </div>
        </div>
    );
}

export default ListItem;
