import React, {useState} from 'react';

function App() {
 

//Reads the text input    
const[text, setText] = useState("");

function handleChange(event) {
    const newValue = event.target.value;
    setText(newValue);
}
//Reads the text input


//Adds creates a list item using the input text.
const[items, setItems] = useState([]);

function addItems() {
    setItems((prevValues) => {
        return [...prevValues, text];
    })
    setText("")
}
//Adds creates a list item using the input text.


//Removes Items on Button Click
function removeItem() {
    const li = document.querySelectorAll('li');
    const removeInput = document.querySelectorAll(".remove");

    for (var index = 0; index < li.length; index++) {
        removeInput[index].addEventListener("click", function(){
            this.closest(".lineItem").remove();
        })
    }
}
//Removes Items on Button Click

//Allows you to press Enter instead of clicking Add to add another list item. Its a convenience feature :D
function handleKeyPress(e) {
    if(e.key === "Enter") {
        addItems()
    } 
}
//Use enter instead of Add.


    return (
        // <form onChange={handleClick}>
    
        <div className="container">
          <div className="heading">
            <h1>To-Do List</h1>
          </div>
          <div className="form">
            <input 
                onChange={handleChange}
                value={text}
                type="text" required 
                placeholder="Enter Item Here" 
                onKeyPress={(e) => handleKeyPress(e)}

            />
            <button
            onClick={addItems}
            >
              <span>Add</span>
            </button>
          </div>
          <div>
            <ul>
               {items.map(todoItems => 
               
               <li className="lineItem" >{todoItems}
               <button className="remove" onClick={removeItem}>(X)</button>
               </li>)} 
            </ul>
          </div>
        </div>
        // </form>
      );


}

export default App;