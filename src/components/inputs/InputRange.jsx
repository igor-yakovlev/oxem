import { React, useState, useEffect } from 'react'
import styles from './InputRange.module.scss'
import {
  getBackgroundSize,
  numberWithSpaces,
  toPlainString,
  checkLimits,
} from '../../utils/functions'

const InputRange = ({ data, min, max, label, onChange, value, step = 1 }) => {
  const handleBlur = ({ target }) => {
    const { value } = target
    const digVal = Number(toPlainString(value))
    const checkedVal = checkLimits(digVal, min, max)
    onChange(checkedVal)
  }

  const handleChange = ({ target }) => {
    const { value } = target
    onChange(value)
  }

  return (
    <>
      <label className={styles.input__label} htmlFor={data}>
        {label}
      </label>
      <div className={styles.input}>
        <input
          className={styles.input__text}
          id={data}
          type='text'
          value={numberWithSpaces(value)}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <span className={styles.input__data}>{data}</span>
        <div className={styles.range_container}>
          <input
            type='range'
            step={step}
            min={min}
            max={max}
            className={styles.input__range}
            onChange={handleChange}
            style={getBackgroundSize(value, min, max)}
            value={value}
          />
        </div>
      </div>
    </>
  )
}

export default InputRange
