import React from 'react'
import styles from './Button.module.scss';
import {noop} from '../utils/functions';
import { Spinner } from 'react-bootstrap';

const Button = ({
  disabled = false,
  children,
  onClick = noop,
  isLoading = false,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={styles.button}
    >

      {isLoading ? <Spinner animation={'border'}/> : children}
    </button>
  )
}

export default Button;
