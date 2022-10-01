import { React, useState } from 'react';
import styles from './InputRange.module.scss';

const InputRange = ({ data, min, max, label, onChange, value }) => {

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value === '' || +value < 0) {
      onChange(min);
    } else {
      onChange(value);
    }
  };

  return (
    <>
      <label className={styles.input__label} htmlFor={data}>{label}</label>
      <div className={styles.input}>
        <input
          className={styles.input__text}
          id={data}
          type='number'
          value={value}
          onChange={handleChange}
        />
        <span className={styles.input__data}>
          {data}
        </span>
        <div className={styles.range_container}>
          <input
            type="range"
            min={min}
            max={max}
            className={styles.input__range}
            onChange={handleChange}
            style={getBackgroundSize()}
            value={value}
          />
        </div>
      </div>
    </>

  )
}


export default InputRange;