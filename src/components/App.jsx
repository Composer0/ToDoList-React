import React, {useState} from 'react';
import ToDoItem from './ToDoItem';
import InputArea from './InputArea';

function App() {

const[items, setItems] = useState([]);

//Adds creates a list item using the input text.

function addItems(text) {
  setItems(prevValues => {
      return [...prevValues, text];
      })
}

//Adds creates a list item using the input text.


//Removes Items on Button Click
function deleteItem(id) {
  setItems((prevItems) => {
    return prevItems.filter((items, index) => {
      return index !== id;
  })
})
}
//Removes Items on Button Click

    return (
    
        <div className="container">
          
          <div className="heading">
            <h1>To-Do List</h1>
          </div>
          
          <InputArea 
            onAdd={addItems}
          />
          
          <div>
            <ul>

            {items.map((toDoItem, index) => 
            <ToDoItem 
            key={index} 
            id={index} 
            text={toDoItem} 
            onChecked={deleteItem}

            /> )} 

            </ul>
          </div>
        <footer>
          <p>Brought to life by <span><a href="http://www.orionpalmer.com" target="_blank" rel="noopener noreferrer">Orion Palmer</a></span>
          </p>
        </footer>
        </div>
      );
}


export default App;