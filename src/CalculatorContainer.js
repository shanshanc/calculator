import React, { useState } from 'react';

import { OPERATOR } from './constants/index.js';
import { toggleSign, addDecimal, addTwoDecimals, calucateByValue, isNumber } from './utils/index.js';
import './CalculatorContainer.css';

const INITIAL_STATE = {
  displayStr: '0',
  operator: '',
  subtotal: 0,
}

const CalculatorContainer = () => {
  const [current, setCurrent] = useState(INITIAL_STATE);

  const handleAddingNumber = value => {
    const {displayStr, operator, subtotal } = current;
    const needToUpdateSubtotal = displayStr !== '0' && operator !== '' && subtotal === 0

    if (needToUpdateSubtotal) {
      setCurrent({
        ...current,
        subtotal: Number(displayStr),
        displayStr: value,
      });
    } else if (displayStr === '0') {
      setCurrent({
        ...current,
        displayStr: value,
      });
    } else {
      setCurrent({
        ...current,
        displayStr: displayStr + value,
      });
    }
  };

  const handleNumberModification = (currentStr, action) => {
    let updatedString = currentStr;

    switch (action) {
      case OPERATOR.CHANGE_SIGN:
        updatedString = toggleSign(currentStr);
        break;
      case OPERATOR.PERCENTAGE:
        updatedString = addTwoDecimals(currentStr)
        break;
      case OPERATOR.DOT:
        updatedString = addDecimal(currentStr)
        break;
      default:
        break
    }

    return updatedString;
  }

  const calculateCurrentValue = () => {
    const { displayStr, subtotal, operator } = current;
    const params = {
      originalValue: subtotal,
      newInfo: Number(displayStr),
      operator: operator,
    }
    const newValue = calucateByValue(params);
    return newValue;
  }

  const handleAddingOperator = selectedOperator => {
    const { displayStr, operator } = current;
    const isNumberModification = 
      selectedOperator === OPERATOR.CHANGE_SIGN ||
      selectedOperator === OPERATOR.PERCENTAGE ||
      selectedOperator === OPERATOR.DOT;

    if (selectedOperator === OPERATOR.RESET) {
      setCurrent(INITIAL_STATE);
    } else if (isNumberModification) {
      const updatedString = handleNumberModification(displayStr, selectedOperator);
      setCurrent({
        ...current,
        displayStr: updatedString,
      });
    } else if (operator === '') {
      setCurrent({
        ...current,
        operator: selectedOperator,
      });
    } else if (selectedOperator === OPERATOR.EQUAL) {
      const newValue = calculateCurrentValue();
      // reset operator after user hitting the equal sign
      setCurrent({
        displayStr: String(newValue),
        operator: '',
        subtotal: 0,
      });
    } else {
      const newValue = calculateCurrentValue();
      // otherwise update operator
      setCurrent({
        displayStr: String(newValue),
        operator: selectedOperator,
        subtotal: 0,
      });
    }
  }

  const handleClick = evt => {
    const value = evt.target.innerText;
    const valueType = isNumber(value) ? 'number' : 'operator';

    switch (valueType) {
      case 'number':
        handleAddingNumber(value);
        break;
      case 'operator':
        handleAddingOperator(value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="sum">{current.displayStr}</div>
        </div>
        <div className="row">
          <span className="general-operator" onClick={handleClick}>AC</span>
          <span className="general-operator" onClick={handleClick}>+/-</span>
          <span className="general-operator" onClick={handleClick}>%</span>
          <span className="operator" onClick={handleClick}>÷</span>
        </div>
        <div className="row">
          <span className="number" onClick={handleClick}>7</span>
          <span className="number" onClick={handleClick}>8</span>
          <span className="number" onClick={handleClick}>9</span>
          <span className="operator" onClick={handleClick}>x</span>
        </div>
        <div className="row">
          <span className="number" onClick={handleClick}>4</span>
          <span className="number" onClick={handleClick}>5</span>
          <span className="number" onClick={handleClick}>6</span>
          <span className="operator" onClick={handleClick}>-</span>
        </div>
        <div className="row">
          <span className="number" onClick={handleClick}>1</span>
          <span className="number" onClick={handleClick}>2</span>
          <span className="number" onClick={handleClick}>3</span>
          <span className="operator" onClick={handleClick}>+</span>
        </div>
        <div className="row">
          <span className="number double" onClick={handleClick}>0</span>
          <span className="number" onClick={handleClick}>.</span>
          <span className="operator" onClick={handleClick}>=</span>
        </div>
      </div>
    </div>
  )

}

export default CalculatorContainer;

