import React, {useState} from "react";

function App() {


const [item, setItem] = useState("")

const [newItem, setNewItem] = useState([]);

function handleChange(event) {
  const newValue = event.target.value;
  setItem(newValue)
}

function handleClick() {
  setNewItem((prevValues) => {
    return [...prevValues, item];
  })
  setItem("")
}


  return (
    // <form onChange={handleClick}>

    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
      <input onChange={handleChange} type="text" placeholder="Enter Item Here" value={item}
      />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {newItem.map(todoItems => <li>{todoItems}</li>)}
        </ul>
      </div>
    </div>
    // </form>
  );
}

export default App;
