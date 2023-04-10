import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const Todo = () => {
    //Use States:
    const [task, setTask] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const location = useLocation();
    const User = location.state.userInformation;

    //Functions to handle task name, desc and priority:

    const handleTaskName = (event) => {
        setTaskName(event.target.value);
    }

    const handleTaskDescription = (event) => {
        setTaskDescription(event.target.value);
    }

    const handleTaskPriority = (event) => {
        setTaskPriority(event.target.value);
    }

    const fetchTask = () => {
        fetch(`http://localhost:8000/get-task-user/${User.userId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTask(data.task);
                console.log(task);
            });
    }

    const handleSubmitTask = async (event) => {
        event.preventDefault();

        if (taskName === '' || taskDescription === '' || taskPriority === '') {
            alert("Please fill all the fields to enter a Todo");
        }

        try {
            const response = await fetch(`http://localhost:8000/create-task/${User.userId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskName, taskDescription, taskPriority
                })
            })

           if (!response.ok) {
            alert("Unable to store a task");
           }

        }
        catch (error) {
            console.log(error);
        }

        setTaskName('');
        setTaskDescription('');
        setTaskPriority('');
    }





    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <div className="todoContainer">
            <div className="todoSubmitWrapper">
                <form onSubmit={handleSubmitTask}>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input onChange={handleTaskName} value={taskName} type="text" className="form-control" id="taskNameId" placeholder="Enter Task" />
                    </div>
                    <div style={{ marginTop: '1rem' }} className="form-group">
                        <label htmlFor="taskDescription">Task Description</label>
                        <input onChange={handleTaskDescription} value={taskDescription} type="text" className="form-control" id="taskDescriptionId" placeholder="Enter Task Description" />
                    </div>
                    <div style={{ marginTop: '1rem' }} className="form-group">
                        <label htmlFor="taskPriority">Task Priority</label>
                        <input onChange={handleTaskPriority} value={taskPriority} type="text" className="form-control" id="taskPriority Id" placeholder="Enter Task Priority" />
                    </div>
                    <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="renderedTodoWrapper">
                {task && task.length > 0 ? task.map((item) => {
                    return (
                        <>
                            <h5>{item.taskName}</h5>
                            <h5>{item.taskDescription}</h5>
                            <h5>{item.taskPriority}</h5>
                        </>
                    );
                }) : (
                    <>
                        No todo to display, please add 1
                    </>
                )}
            </div>
        </div>
    );
}

export default Todo;