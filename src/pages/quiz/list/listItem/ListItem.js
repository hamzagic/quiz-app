import React from 'react';
import styles from './ListItem.module.scss';
import Button from '../../../../components/button/Button';

const ListItem = (props) => {
    const btnStyle = {
        background: '#6622CC',
        color: '#fff',
        border: 'none',
        padding: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px'
    }
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                {props.children}
                <Button title="Details" styles={btnStyle} click={props.details} />
            </div>
        </div>
    );
}

export default ListItem;