import React, {useState, useEffect} from "react";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import Paper from "@material-ui/core/Paper";

// This function is to get value of todolist titles from todolist(array in local storage)
const getLocalItems = () => {
  let list = localStorage.getItem("todolist");

  if (list) return JSON.parse(list);
  else {
    return [];
  }
};

// This function is to get value of todolistdesc titles from todolistdesc(array in local storage)
const getLocalItemsdesc = () => {
  let listdesc = localStorage.getItem("todolistdesc");

  if (listdesc) return JSON.parse(listdesc);
  else {
    return [];
  }
};

const Todo3 = () => {
  // Input from input field is taken into these hooks (for title)
  const [input, setInput] = useState("");

  // Input from input field is taken into these hooks (for desc)
  const [inputdesc, setInputdesc] = useState("");

  // Each Input is stored in an array here,that input is sent to local storage through setItem and later we get that using getItem
  const [item, setItem] = useState(getLocalItems);
  const [itemdesc, setItemdesc] = useState(getLocalItemsdesc);

  // Use Effect hook is used so that these functions execute after every time something renders or here when add is clicked
  useEffect(() => {
    // creating a file named todolist and todolistdesc in local storage and adding value of item and itemdesc
    localStorage.setItem("todolist", JSON.stringify(item));
    localStorage.setItem("todolistdesc", JSON.stringify(itemdesc));
  }, [item]);

  const addItem = () => {
    // when addItem is called new input taken is added into array of items,spread operator ensures that old input remains as it is while new input is entered
    setItem((prevValue) => {
      return [...prevValue, input];
    });
    setItemdesc((prevValue) => {
      return [...prevValue, inputdesc];
    });

    //   to reset the input fields after adding the previously entered value in items
    setInput("");
    setInputdesc("");
  };

  const inputItem = (event) => {
    // taking data from input field and setting into input variable
    setInput(event.target.value);
  };

  // taking data from input desc field and setting into inputdesc variable
  const inputItemdesc = (event) => {
    setInputdesc(event.target.value);
  };

  const deleteItem = (id) => {
    // Using Filter method to reset the item field and remove the deleted data
    const updatedItems = item.filter((elem, ind) => {
      return ind !== id;
    });

    const updatedItemsdesc = itemdesc.filter((elem, ind) => {
      return ind !== id;
    });

    setItem(updatedItems);
    setItemdesc(updatedItemsdesc);
  };
  const task = () => {
    return item.map((todo, id) => {
      return (
        <>
          <TableRow>
            <TableCell> {id + 1} </TableCell>
            <TableCell> {todo}</TableCell>
            <TableCell
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflow: "hidden",
              }}>
              {" "}
              {itemdesc[id]}
            </TableCell>

            <TableCell>
              {" "}
              <Button
                className='trash'
                onClick={() => deleteItem(id)}
                style={{
                  color: "green",
                  height: "55px",
                  width: "90px",
                  boxShadow: "",
                }}
                variant='contained'>
                {" "}
                Done <DoneIcon />
              </Button>
            </TableCell>
          </TableRow>
        </>
      );
    });
  };

  const clean = () => {
    setItemdesc([]);
    setItem([]);
  };

  return (
    <>
      <div className='todo-block'>
        <div className='todo'>
          <div className='screen'>
            <div className='input-title'>
              <Textfield
                label='Title'
                aria-label=' '
                value={input}
                placeholder='Add item here'
                onChange={inputItem}
                className='input'
                variant='outlined'
                fullWidth
                color='yellow'
              />
            </div>

            <div className='input-desc'>
              {" "}
              <Textfield
                label='Description'
                value={inputdesc}
                type='text'
                placeholder='Add item desc here'
                onChange={inputItemdesc}
                variant='outlined'
                fullWidth
                multiline
                rows={3}
              />{" "}
            </div>

            <div className='add'>
              {" "}
              <Button
                onClick={addItem}
                style={{
                  color: "green",
                  height: "45px",
                  width: "110px",
                  boxShadow: "1px 1px 1px 1px",
                }}
                variant='outlined'>
                {" "}
                <div className='add'> Add Item</div>
              </Button>{" "}
            </div>
          </div>

          <div className='todo-list'>
            {" "}
            <div className='todo-items'>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow style={{fontWeight: "bolder"}}>
                      <TableCell style={{fontWeight: "bolder"}} size='small'>
                        S.No.
                      </TableCell>
                      <TableCell style={{fontWeight: "bolder"}}>Item</TableCell>
                      <TableCell style={{fontWeight: "bolder", width: "70%"}}>
                        Item Description
                      </TableCell>
                      <TableCell style={{fontWeight: "bolder"}}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{task()}</TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className='trash'>
              <Button
                onClick={clean}
                style={{
                  color: "green",
                  height: "45px",
                  width: "110px",
                  boxShadow: "1px 1px 1px 1px",
                }}
                variant='outlined'>
                Clear all
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo3;
