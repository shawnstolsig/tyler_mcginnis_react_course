import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're building an app to see how many times you can click
    a button in 10 seconds. 

    The UI has three parts, a button, a timer counting down from 10,
    and a count of how many times you've clicked the button.

    Once the timer reaches 0, remove the button from the UI.
*/


function CounterGame () {

  const [timer, setTimer] = React.useState(10)
  const [clicks, setClicks] = React.useState(0)
  const intervalRef = React.useRef()

  React.useEffect( () => {

    intervalRef.current = window.setInterval(()=>{
      setTimer((t) => t-1)
    },1000)

    return () => window.clearInterval(intervalRef.current)

  },[])

  React.useEffect( ()=>{
    if(timer<1){
      window.clearInterval(intervalRef.current)
    }
  }, [timer])

  const handleClick = () => {
    setClicks( (c) => c+1)
  }




  return (
    <div className="App">
      <h1>Timer: {timer}</h1>
      <h1>Clicks: {clicks}</h1>
      {timer > 0
      ?  <button onClick={handleClick}>click me!</button>
      : ''}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CounterGame />, rootElement);
