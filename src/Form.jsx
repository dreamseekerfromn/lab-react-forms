import React from "react";
import "./Form.css";
import { useState } from "react"

function Form() {
  const numberRegex = /^-?[0-9]*$/;
  const [intResult, setResult] = useState();
  const [strOperation, setOperation] = useState("");
  const [isValid, setIsValid] = useState("valid");
  let boolNaN = false;
  let numbers = [];

  function sumNumbers(){
    (!boolNaN) ? setResult(numbers.reduce((total,elem)=>total+elem,0)) : setResult("Invalid input.");
  }

  function averageNumbers(){
    (!boolNaN) ? setResult(numbers.reduce((total,elem)=>total+elem,0)/numbers.length) : setResult("Invalid input.");
  }

  function modeNumbers(){
    const occurrences = {};
    numbers.forEach(num=>occurrences[num] = occurrences[num] ? occurrences[num]+1 : 1);
    let maxOccurrences = 0;
    let mode = null;
    for(const num in occurrences){
      if(occurrences[num] > maxOccurrences){
        maxOccurrences = occurrences[num];
        mode = num
      }
    }
    (!boolNaN) ? setResult(mode) : setResult("Invalid input.");
  }

  function inputHandler(str){
    setIsValid('valid');
    setResult(null);
    str = str.split(",");
    for(let element of str){
      if(!element.match(numberRegex)){
        boolNaN = true;
        setIsValid("invalid");
        setResult("Invalid input.");
        continue;
      }
      numbers.push(Number(element));
    }
  }

  function operationHandler(operation){
    setOperation(operation);
  }

  function resetToDefault(){
    const form = document.getElementById('form');
    const selectionBox = document.getElementById('operation');
    setOperation("");
    boolNaN = false;
    form.reset();
    setIsValid("valid");
  }

  function submitHandler(e){
    e.preventDefault();

    let strValues = document.getElementById('values');
    inputHandler(strValues.value);

    switch(strOperation){
      case "sum":
        sumNumbers();
        break;
      case "average":
        averageNumbers();
        break;
      case "mode":
        modeNumbers();
        break;
      default:
        setResult("err");
        break;
    }
    resetToDefault(e);
    
  }

  function textChangeHandler(e){
    numbers = [];
    inputHandler(e.target.value);

  }

  return (
    <>
      <form id="form" onSubmit={(e)=>submitHandler(e)}>
        <input id="values" name="values" type="text" className={isValid} onChange={(e)=>textChangeHandler(e)}/>
        <select id="operation" name="operation" value={ strOperation } onChange={(e)=>operationHandler(e.target.value)} className={ isValid } >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{intResult}</p>
      </section>
    </>
  );
}

export default Form;
