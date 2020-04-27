import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/
function generateId(){
  return '_' + Math.random().toString(36).substr(2,9)
}


function Todo() {
  const [myInput, setInput] = React.useState("");
  const [items, setItems] = React.useState([]);

  const addItem = () => {
    setItems((items) => items.concat({
      text: myInput,
      id: generateId()
    }));
    setInput('')
  };

  const removeItem = (id) => {
    setItems((items) => 
        items.filter( (x) => x.id !== id  
        ));
  };

  return (
    <div>
      <input 
        type='text' 
        value={myInput} 
        placeholder="new controlled todo" 
        onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addItem}>
        Add item
      </button>
      <ol>
        { items.map( (item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeItem(item.id)}>x</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todo />, rootElement);
