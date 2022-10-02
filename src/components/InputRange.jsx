import { React, useState, useEffect } from 'react'
import styles from './InputRange.module.scss'

const InputRange = ({ data, min, max, label, onChange, value, step = 1 }) => {
  
  const getBackgroundSize = () => {
    value = Number(toPlainString(value))
    value = checkLimits(value, min, max)
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` }
  }

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
            style={getBackgroundSize()}
            value={value}
          />
        </div>
      </div>
    </>
  )
}

function numberWithSpaces(value) {
  const plain = toPlainString(value)
  return plain.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function toPlainString(str) {
  return str.toString().replace(/\s/g, '')
}

function checkLimits(value, min, max) {
  if (value > min && value < max) return value
  if (value <= min) {
    return min
  } else {
    return max
  }
}

export default InputRange
