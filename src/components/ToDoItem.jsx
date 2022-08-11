import React from 'react';




function ToDoItem(props) {


    return ( 
        <div>
            <li 
                className="lineItem"
                style={{flexWrap: "wrap"}}>{props.text}
                <span className="remove" 
                onClick={() => {
                props.onChecked(props.id)}}>X
                </span>
            </li>
        </div>
    )
}

export default ToDoItem;