import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [dis, setDis] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [state, setState] = useState("first");

  const clickButton = (alp) => {
    handleCE(alp);
    if (!isNaN(alp) || alp === '.') {
      handleNumber(alp);
    } else {
      handleOperator(alp);
    }
  };

  const handleCE = (alp) => {
    if (alp === "C") {
      resetCalculator();
    }
  };

  const resetCalculator = () => {
    setDis("0");
    setFirstValue(null);
    setSecondValue(null);
    setOperator(null);
    setState("first");
  };

  const handleNumber = (alp) => {
    // Prevent leading zeros
    if (alp === '0' && dis === '0') return;

    if (state === "first") {
      setFirstValue((prev) => (prev === null ? alp : String(prev) + alp));
      setDis((prev) => (prev === '0' ? alp : prev + alp));
    } else if (state === "second") {
      setSecondValue((prev) => (prev === null ? alp : String(prev) + alp));
      setDis((prev) => (prev === '0' ? alp : prev + alp));
    }
  };

  const handleOperator = (alp) => {
    if (["+", "-", "*", "/"].includes(alp)) {
      if (firstValue !== null) {
        setOperator(alp);
        setState("second");
        setDis("0"); // Clear display for second number
      }
    } else if (alp === "=") {
      if (firstValue !== null && secondValue !== null) {
        calculateResult();
      }
    }
  };

  const calculateResult = () => {
    let result;
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setDis(String(result)); // Show result in display
    setFirstValue(result); // Store result for potential chaining
    setSecondValue(null); // Reset second value
    setOperator(null); // Reset operator
    setState("first"); // Reset to first state
  };

  const buttonRows = [
    ['MC', 'MR', 'M+', 'M-', 'C'],
    ['7', '8', '9', '/', 'SQRT'],
    ['4', '5', '6', '*', '%'],
    ['1', '2', '3', '-', '1/X'],
    ['0', '.', '+/-', '+', '=']
  ];

  return (
    <div id="calculator-container">
      <input
        id="calculator-display"
        type="text"
        disabled
        value={dis}
      />
      <div id="calculator-buttons">
        {buttonRows.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => clickButton(btn)}
                className="btn btn-secondary btn-cal"
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
