import {useState, useEffect} from "react";
import "./App.css";
import Listcomp from "./Listcomp";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return []; 
  }
};


function Todo() {
    const [item, setItem] = useState(" ");
    const [newitem, setNewItem] = useState(getLocalItems());
  
    const inputItem = (event) => {
      setItem(event.target.value);
    };
  
    const addItem = () => {
      setNewItem((prevValue) => {
        return [...prevValue, item];
      });
    };
  
    useEffect(() => {
      localStorage.setItem("lists", JSON.stringify(newitem));
    }, [newitem]);
  
    const deleteItem = (id) => {
      const updatedItems = newitem.filter((elem, ind) => {
        return ind !== id;
      });
  
      setItem(updatedItems);
    };
  
    return (
      <div className='main-div'>
        <div className='todo-list-container'>
          <div className='todo-list-heading'>TODO LIST</div>
          <div>
            <form>
              <input
                type='text'
                className='input-field'
                placeholder='Enter todo here'
                onChange={inputItem}
              />
            </form>
            <div onClick={addItem}>ADD</div>
          </div>
          <div className='todo-item'>
            <ol>
              {newitem.map((val, index) => {
                return (
                  <div>
                    <Listcomp key={index} text={val} />
                    <h5
                      onClick={() => {
                        deleteItem(index);
                      }}>
                      remove
                    </h5>
                  </div>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
  
  export default Todo