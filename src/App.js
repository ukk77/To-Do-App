import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipMove from "react-flip-move";
import EditIcon from '@material-ui/icons/Edit';  

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [isEditing, setIsEditing] = useState([])
  const [editedTask, setEditedTask] = useState("")

  const onNewTaskChange = (e) => {
    setNewTask(e.target.value)
  }

  const onAddNewTask = (e) => {
    if(newTask !== ""){
      setTasks([...tasks, newTask])
      setNewTask("")
      setIsEditing([...isEditing, false])
    }
    else {
      alert("PLeasr enter a task");
    }
  }

  const onKeyPress = (e) => {
    if(e.keyCode === 13){
      onAddNewTask(e)
    }
  }

  const onDeleteIconClick = (task) => {
    var newTasks = [...tasks]
    newTasks.splice(tasks.indexOf(task), 1)
    setTasks(newTasks)

    let arr = [...isEditing]
    let i = 0;
    for(i = 0; i < arr.length; i++){
      if(arr[i]){
        arr[i] = false
      }
    }
    arr.splice(0, 1)
    setIsEditing(arr)
    console.log(arr)
  }

  const onEditIconClick = (index) => {
    let arr = [...isEditing]
    if(arr[index]){
      arr[index] = false
    }
    else{
      arr[index] = true
    }
    setIsEditing(arr)
  }

  const onTaskEditChange = (e) => {
    setEditedTask(e.target.value)
  }

  const onKeyPressEdit = (e, task) => {
    if(e.keyCode === 13){
      if(editedTask !== ""){
        let arr = [...tasks]
        arr.splice(arr.indexOf(task), 1, editedTask)
        setTasks(arr)

        let arr_edits = [...isEditing]
        arr_edits[arr.indexOf(editedTask)] = false
        setIsEditing(arr_edits)
      }
      else{
        alert("PLease enter a task")
        let arr = [...tasks]
        arr.splice(arr.indexOf(task), 1, task)
        setTasks(arr)

        let arr_edits = [...isEditing]
        arr_edits[arr.indexOf(task)] = false
        setIsEditing(arr_edits)
      }
      
    }
  }
  
  return (
    <div className="App">

      <div className="title">
        To-Do App
      </div>

      <div className="user-input-section">
        <div className="input-box">
          <TextField id="outlined-basic" label="new task" variant="outlined" className="add-task-field" 
              value={newTask} onChange={onNewTaskChange} onKeyDown={onKeyPress} />
        </div>
        <div className="add-button">
          <Button variant="contained" onClick={onAddNewTask}>Add</Button>  
        </div>
      </div>

      <div className="task-display-section">
        <div className="task-list">
          <ul className="list">
          <FlipMove duration={250} easing="ease-out">      
            {  
              tasks.map((task, index) => (
                <li key={"" + index}>
                  <div className="each-task">
                    
                    <div className="task-text">
                      { 
                        isEditing[index] ? 
                        <TextField id="outlined-basic" label="edit task" variant="outlined" className={"edit-task-field"} 
                          defaultValue={task} onChange={onTaskEditChange} onKeyDown={(e) => onKeyPressEdit(e, task)}/> 
                        : 
                        task
                        
                      }
                    </div>
                      
                    <div className="buttons">
                      <EditIcon fontSize="small" className={"icon "} onClick={() => onEditIconClick(index)}/>
                      <DeleteIcon fontSize="small" className={"icon"} onClick={() => onDeleteIconClick(task)}/>
                    </div>

                  </div>
                </li>
              ))
          }
          </FlipMove>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
