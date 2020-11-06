import React, { useState } from "react";

import "./calculator.css";

const Calculator = () => {
  const [result, setResult] = useState("");

  const addOperatorToRes = char => {
    if (
      result.length !== 0 &&
      result[result.length - 1] !== "(" &&
      result.substr(result.length - 2, result.length) !== "(-"
    ) {
      if (
        result[result.length - 1] == "-" ||
        result[result.length - 1] == "/" ||
        result[result.length - 1] == "*" ||
        result[result.length - 1] == "+"
      ) {
        let subRes = result.substr(0, result.length - 1);
        if (subRes.length !== 0) {
          setResult(() => subRes + char);
        }
      } else {
        setResult(prevState => prevState + char);
      }
    }
  };

  const addMinussOperator = char => {
    if (
      result[result.length - 1] == "-" ||
      result[result.length - 1] == "/" ||
      result[result.length - 1] == "*" ||
      result[result.length - 1] == "+"
    ) {
      let subRes = result.substr(0, result.length - 1);
      setResult(() => subRes + char);
    } else {
      setResult(prevState => prevState + char);
    }
  };

  const getValidInput = res => {
    let updateResult = res + "";
    let i = 1;
    let checkResult = "";
    if (
      (updateResult[0] == "0" && updateResult[1] == ".") ||
      updateResult[0] != "0"
    ) {
      checkResult = updateResult[0];
    }
    while (i < updateResult.length - 1) {
      if (
        (updateResult[i] == "0" && updateResult[i + 1] == ".") ||
        updateResult[i] != "0" ||
        (updateResult[i - 1] >= "0" && updateResult[i - 1] <= "9")
      ) {
        if (updateResult[i] == "(") {
          if (
            updateResult[i - 1] != "(" &&
            updateResult[i - 1] != "+" &&
            updateResult[i - 1] != "-" &&
            updateResult[i - 1] != "*" &&
            updateResult[i - 1] != "/"
          ) {
            if (checkResult[checkResult.length - 1] == "*") {
              checkResult += "(";
            } else {
              checkResult += "*(";
            }
          } else {
            checkResult += "(";
          }
        } else if (updateResult[i] == ")") {
          if (
            updateResult[i + 1] != ")" &&
            updateResult[i + 1] != "+" &&
            updateResult[i + 1] != "-" &&
            updateResult[i + 1] != "*" &&
            updateResult[i + 1] != "/"
          ) {
            checkResult += ")*";
          } else {
            checkResult += ")";
          }
        } else {
          checkResult += updateResult[i];
        }
      }
      i++;
    }
    checkResult += updateResult[i];
    return checkResult;
  };

  const clickHandle = e => {
    let button = e.target.name;
    if (button === "=") {
      let openCount = [...result].filter(x => x === "(").length;
      let closeCount = [...result].filter(x => x === ")").length;
      let lastChar = result[result.length - 1];
      let operator =
        lastChar == "+" ||
        lastChar == "-" ||
        lastChar == "*" ||
        lastChar == "/";

      if (operator || lastChar == "(") {
        console.log("add number first");
      } else if (openCount != closeCount) {
        console.log("add parantasis firsst");
      } else if (result.length == 0) {
      } else {
        let checkResult = result;
        if (result.length != 1) {
          checkResult = getValidInput(result);
        }

        const value = eval(checkResult) + "";
        setResult(value);
      }
    } else if (button === "CE") {
      setResult(prevState => prevState.substr(0, prevState.length - 1));
      console.log(button);
    } else if (button === "C") {
      setResult("");
      console.log(button);
    } else if (
      (button >= "0" && button <= "9") ||
      button == "." ||
      button == "("
    ) {
      setResult(prevState => prevState + button);
    } else {
      if (button === "+" || button == "*" || button == "/") {
        addOperatorToRes(button);
      } else if (button === "-") {
        addMinussOperator(button);
      } else {
        let openCount = [...result].filter(x => x === "(").length;
        let closeCount = [...result].filter(x => x === ")").length;
        let lastChar = result[result.length - 1];
        let add =
          lastChar == "+" ||
          lastChar == "-" ||
          lastChar == "*" ||
          lastChar == "/" ||
          lastChar == "(";
        if (openCount > closeCount && add !== true) {
          setResult(prevState => prevState + button);
        }
        console.log(button);
      }
    }
  };

  return (
    <div className="cal-sec">
      <div className="cal-body">
        <h1>Calculator</h1>
        <div className="result">{result}</div>
        <div className="buttons">
          <button name="+" onClick={clickHandle}>
            +
          </button>
          <button name="-" onClick={clickHandle}>
            -
          </button>
          <button name="*" onClick={clickHandle}>
            x
          </button>
          <button name="/" onClick={clickHandle}>
            /
          </button>
          <button name="1" onClick={clickHandle}>
            1
          </button>
          <button name="2" onClick={clickHandle}>
            2
          </button>
          <button name="3" onClick={clickHandle}>
            3
          </button>
          <button name="(" onClick={clickHandle}>
            ({" "}
          </button>
          <button name="4" onClick={clickHandle}>
            4
          </button>
          <button name="5" onClick={clickHandle}>
            5
          </button>
          <button name="6" onClick={clickHandle}>
            6
          </button>
          <button name=")" onClick={clickHandle}>
            )
          </button>
          <button name="7" onClick={clickHandle}>
            7
          </button>
          <button name="8" onClick={clickHandle}>
            8
          </button>
          <button name="9" onClick={clickHandle}>
            9
          </button>
          <button className="total" name="=" onClick={clickHandle}>
            =
          </button>
          <button name="." onClick={clickHandle}>
            .
          </button>
          <button name="0" onClick={clickHandle}>
            0
          </button>
          <button id="c" name="C" onClick={clickHandle}>
            C
          </button>
          <button id="ce" name="CE" onClick={clickHandle}>
            CE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
