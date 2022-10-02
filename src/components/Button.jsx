import React from 'react'
import styles from './Button.module.scss';
import {noop} from '../utils/functions';

const Button = ({
  disabled = false,
  children,
  onClick = noop,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={styles.button}
    >
      {children}
    </button>
  )
}

export default Button;
