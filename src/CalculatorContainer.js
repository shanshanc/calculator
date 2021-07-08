import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayStr, setSubtotal, setOperator, resetAll } from './store/current.js';

import { OPERATOR } from './constants/index.js';
import { toggleSign, addDecimal, addTwoDecimals, calucateByValue, isNumber } from './utils/index.js';
import './CalculatorContainer.css';

const CalculatorContainer = () => {
  const displayStr = useSelector(state => state.current.displayStr);
  const subtotal = useSelector(state => state.current.subtotal);
  const operator = useSelector(state => state.current.operator);
  const dispatch = useDispatch();

  const handleAddingNumber = value => {
    const needToUpdateSubtotal = displayStr !== '0' && operator !== '' && subtotal === 0

    if (needToUpdateSubtotal) {
      dispatch(setSubtotal(Number(displayStr)));
      dispatch(setDisplayStr(value));
    } else if (displayStr === '0') {
      dispatch(setDisplayStr(value));
    } else {
      const newValue = displayStr + value;
      dispatch(setDisplayStr(newValue));
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
    const params = {
      originalValue: subtotal,
      newInfo: Number(displayStr),
      operator: operator,
    }
    const newValue = calucateByValue(params);
    return newValue;
  }

  const handleAddingOperator = selectedOperator => {
    const isNumberModification = 
      selectedOperator === OPERATOR.CHANGE_SIGN ||
      selectedOperator === OPERATOR.PERCENTAGE ||
      selectedOperator === OPERATOR.DOT;

    if (selectedOperator === OPERATOR.RESET) {
      dispatch(resetAll());
    } else if (isNumberModification) {
      const updatedString = handleNumberModification(displayStr, selectedOperator);
      dispatch(setDisplayStr(updatedString));
    }
    else if (operator === '') {
      dispatch(setOperator(selectedOperator));
    } else if (selectedOperator === OPERATOR.EQUAL) {
      const newValue = calculateCurrentValue();
      // reset operator after user hitting the equal sign
      dispatch(setDisplayStr(String(newValue)));
      dispatch(setSubtotal(0));
      dispatch(setOperator(''));
    } else {
      const newValue = calculateCurrentValue();
      // otherwise update operator
      dispatch(setDisplayStr(String(newValue)));
      dispatch(setOperator(selectedOperator));
      dispatch(setSubtotal(0))
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
          <div className="sum">{displayStr}</div>
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

