import React from 'react';

import './CalculatorContainer.css';

const CalculatorContainer = () => {

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="sum">0</div>
        </div>
        <div className="row">
          <span className="general-operator">AC</span>
          <span className="general-operator">+/-</span>
          <span className="general-operator">%</span>
          <span className="operator">÷</span>
        </div>
        <div className="row">
          <span className="number">7</span>
          <span className="number">8</span>
          <span className="number">9</span>
          <span className="operator">x</span>
        </div>
        <div className="row">
          <span className="number">4</span>
          <span className="number">5</span>
          <span className="number">6</span>
          <span className="operator">-</span>
        </div>
        <div className="row">
          <span className="number">1</span>
          <span className="number">2</span>
          <span className="number">3</span>
          <span className="operator">+</span>
        </div>
        <div className="row">
          <span className="number double">0</span>
          <span className="number">.</span>
          <span className="operator">=</span>
        </div>
      </div>
    </div>
  )

}

export default CalculatorContainer;

