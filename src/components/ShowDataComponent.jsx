import React from 'react';
import styles from './ShowDataComponent.module.scss';
import { getBackgroundSize, numberWithSpaces, toPlainString, checkLimits } from '../utils/functions'

const ShowDataComponent = ({label, data}) => {
  return (
    <div>
      <span className={styles.data__label}>
        {label}
      </span>
      <h2 className={styles.data__text}>
        {`${numberWithSpaces(data)} ₽`}
      </h2>
    </div>
  )
} 

export default ShowDataComponent;