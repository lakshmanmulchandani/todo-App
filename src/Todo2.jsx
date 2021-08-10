import React,{useState,useEffect} from 'react'
import "./todo2.css"

const getLocalItems = () =>
{
    let list = localStorage.getItem("todolist")

    if(list)
    return JSON.parse(list)
    else{
        return []
    }
}



const Todo2 = () => {
    const [input, setInput] = useState("");
    const [item,setItem] = useState (getLocalItems)

    useEffect(() => {
    localStorage.setItem("todolist",JSON.stringify(item))
    }, [item])

    const addItem = () => {
        setItem((prevValue) => {
          return [...prevValue,input];
    
        });
      };

    const inputItem = (event) =>
    {
   setInput(event.target.value)
    }

   
    const deleteItem = (id) => {
        const updatedItems = item.filter((elem, ind) => {
          return ind !== id;
        });
    
        setItem(updatedItems);
      };
    

    return (
        <>
<div className="todo-block">
    <div className = " todo-main">
        <div className = "Title"> </div>
        <div className = "screen"> <input  placeholder = "Add item here" onChange = {inputItem} className = "input" /> <div className = "add" onClick = {addItem}  > add</div> </div>
        <div className = "todo-list"> <div className = "todo">
            <ul> {item.map( (todo,id)=>{return <li>{todo} <div className="trash" onClick = {() => deleteItem(id)}>trash</div> </li>} )}</ul>
            </div> <div className="trash">trash</div></div>
    </div>
</div>
        </>
    )
}

export default Todo2
