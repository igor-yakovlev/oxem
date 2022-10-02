import { React, useState, useEffect } from 'react'
import styles from './InputProcentRange.module.scss'
import { getBackgroundSize, numberWithSpaces, toPlainString, checkLimits } from '../../utils/functions'
import classNames from 'classnames'

const InputProcentRange = ({ data, min, max, label, onChange, value, step = 1, disabled = false }) => {
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
    <div className={styles.box}>
      <label className={classNames(styles.input__label, disabled && styles.disabled) } htmlFor={data}>
        {label}
      </label>
      <div className={styles.input}>
        <div className={styles.input__text}>
          <span className={classNames(disabled && styles.disabled)} >{numberWithSpaces(data)}</span>
          <input
            className={styles.input__procent}
            id={data}
            type='text'
            value={`${value}`}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
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
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}

export default InputProcentRange
