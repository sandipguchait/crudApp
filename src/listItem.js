import React from 'react';

const ListItem = (props) => {
    return (
        <li className="list-group-item">
               <button 
                  className="btn-sm btn btn-info mr-5"
                  onClick={props.editTodo}
                >U</button>
               {props.item.name}
               <button 
                  className="btn-sm btn btn-danger ml-5"
                  onClick={props.deleteTodo}
                >X</button>
               </li>
    )
};

export default ListItem;