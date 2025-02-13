import React, { useState } from 'react'
import ListItem from './ListItem';

export default function Home() {

    //Task Object
    class taskItem {
        constructor(id, value) {
            this.id = id;
            this.value = value;
        }
    }

    // AA states
    const [taskList, setTaskList] = useState([]);
    const [taskValue, setTaskValue] = useState("");
    const [error, setError] = useState("");
    const [edit, setEdit] = useState();


    //Add task to list
    const addTask = (value) => {
        if (taskList.length > 0) {
            const lastId = taskList[taskList.length - 1].id + 1;
            const newTask = new taskItem(lastId, value);
            setTaskList([...taskList, newTask]);
        } else {
            const newTask = new taskItem(1, value);
            setTaskList([...taskList, newTask]);
        }
    }


    // Remove task from the list
    const removeTask = (id) => {
        setTaskList(taskList.filter(task => task.id !== id));
    }


    //Edit task value using id
    const handleEdit = (id) => {
        const currentItem = taskList.filter(task => task.id === id)?.[0];
        setEdit(currentItem);
        setTaskValue(currentItem.value);

    }


    //set value
    const handleChange = (e) => {
        setTaskValue(e.target.value);
    }


    //handling validation on submit
    const handleSubmit = (e) => {
        e.preventDefault();
      if (taskList.filter((task => task.value === taskValue)).length > 0) {
            setError("Task already exist!");
            return;
        } else {
            setError(null);
            if (edit) {
                const updatetaskList = taskList.map((task) => {
                    if (task.id === edit.id) {
                        return { ...task, value: taskValue }
                    } else {
                        return task;
                    }
                })
                setTaskList(updatetaskList);
            } else {
                addTask(taskValue);
            }
            setEdit(null);
            setTaskValue("");
        }


    }


    return (
        <>
            <section>
                <div className='card card-lg' style={{ backgroundColor: "white", padding: "10px" }}>

                    <div className='card-body'>
                        <div className='card-title text-center'>Todo Input</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <i className="input-group-text " id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                    </svg>
                                </i>
                                <input type="text" className="form-control" placeholder="Add Task" aria-describedby="basic-addon1" onChange={handleChange} value={taskValue} required/>
                            </div>
                            {error ? <div className="error">{error}</div> : <div className="invalid-tooltip" style={{ color: "red", fontSize: "18px", marginTop: 0 }}>{error}</div>}

                            <button className="btn btn-primary" type="submit">{edit ? "Edit Task" : "Add Task"}</button>

                        </form>
                    </div>
                </div>
            </section>
            <section>
                <div className='d-flex justify-content-center my-5' style={{ width: "100%" }}>
                    <h1 style={{ color: "white" }}>TODO LIST</h1>
                </div>
                <div>
                    {
                        taskList.length === 0 ?
                            <p className='d-flex justify-content-center' style={{ color: "white" }}>Make a todo list by adding Tasks...</p>
                            :
                            <ul className="list-group gap-1">
                                {taskList.map((item) => { return <ListItem key={item.id} task={item} remove={removeTask} handleEdit={handleEdit} /> })}
                            </ul>
                    }

                </div>

            </section>

        </>
    )
}
