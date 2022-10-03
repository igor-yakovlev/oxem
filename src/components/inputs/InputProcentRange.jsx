import { React } from 'react'
import styles from './InputProcentRange.module.scss'
import {
  getBackgroundSize,
  numberWithSpaces,
  checkLimits,
  fromPercentToNumber,
  removePercent,
  removeLetter,
} from '../../utils/functions'
import classNames from 'classnames'

const InputProcentRange = ({
  data,
  min,
  max,
  label,
  onChange,
  value,
  step = 1,
  disabled = false,
}) => {
  const handleBlur = ({ target }) => {
    const { value } = target
    const withoutLetters = removeLetter(value);
    const digVal = fromPercentToNumber(withoutLetters)
    const checkedVal = checkLimits(digVal, min, max)
    const withPercent = removePercent(checkedVal)
    onChange(withPercent)
  }

  const handleChange = ({ target }) => {
    const { value } = target
    const withoutLetters = removeLetter(value);
    const withPercent = removePercent(withoutLetters);
    onChange(withPercent)
  }

  return (
    <div className={styles.box}>
      <label className={classNames(styles.label, disabled && styles.disabled)} htmlFor={data}>
        {label}
      </label>
      <div className={styles.input}>
        <div className={styles.input__text}>
          <span className={classNames(disabled && styles.disabled)}>{numberWithSpaces(data)}</span>
          <input
            className={styles.input__procent}
            id={data}
            type='text'
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
        <div className={styles.container}>
          <input
            type='range'
            step={step}
            min={min}
            max={max}
            className={styles.input__range}
            onChange={handleChange}
            style={getBackgroundSize(fromPercentToNumber(value), min, max)}
            value={fromPercentToNumber(value)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}

export default InputProcentRange
