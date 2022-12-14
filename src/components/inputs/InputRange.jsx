import { React, useState, useEffect } from 'react';
import styles from './InputRange.module.scss';
import {
  getBackgroundSize,
  numberWithSpaces,
  toPlainString,
  checkLimits,
  removeLetter,
} from '../../utils/functions';
import classNames from 'classnames';

const InputRange = ({ data, id, min, max, label, onChange, value, step = 1, disabled = false }) => {
  const handleBlur = ({ target }) => {
    const { value } = target;
    const withoutLetters = removeLetter(value);
    const digVal = Number(toPlainString(withoutLetters));
    const checkedVal = checkLimits(digVal, min, max);
    onChange(checkedVal);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    const withoutLetters = removeLetter(value);
    const digVal = Number(toPlainString(withoutLetters));
    onChange(digVal);
  };

  return (
    <div className={styles.box}>
      <label className={classNames(styles.label, disabled && styles.disabled)} htmlFor={id}>
        {label}
      </label>
      <div className={styles.input}>
        <input
          className={styles.input__text}
          id={id}
          type='text'
          value={numberWithSpaces(value)}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className={classNames(styles.data, disabled && styles.disabled)}>{data}</span>
        <div className={styles.container}>
          <input
            type='range'
            step={step}
            min={min}
            max={max}
            className={styles.input__range}
            onChange={handleChange}
            style={getBackgroundSize(value, min, max)}
            value={value}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default InputRange;
