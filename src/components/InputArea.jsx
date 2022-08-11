import React, {useState} from 'react';





function InputArea(props) {
    const[text, setText] = useState("");
    
    function handleChange(event) {
        const newValue = event.target.value;
        setText(newValue);
    }
    
    
    
    //Reads the text input    
    function handleKeyPress(e) {
        if(e.key === "Enter") {
            props.onAdd(text);
            setText("")
        } 
    }
    //Reads the text input

    return(   

    <div className="form">
        <input 
            onChange={handleChange}
            value={text}
            type="text" required 
            placeholder="Enter Item Here" 
            onKeyPress={(e) => 
            handleKeyPress(e)}
        />

        <button
            onClick={() => {
                props.onAdd(text);
                setText("")
            }}
        >

        <span>Add</span>
        </button>
  </div>
    )
}

export default InputArea;