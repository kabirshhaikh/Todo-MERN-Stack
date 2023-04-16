import React, { useEffect, useState } from "react";
import { json, useLocation } from 'react-router-dom';
import './todo.css';
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdSystemUpdateAlt } from 'react-icons/md';


const Todo = () => {
    //Use States:
    const [task, setTask] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [updateButton, setUpdateButton] = useState(false);
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

    const userId = User.userId;

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (taskName === '' || taskDescription === '' || taskPriority === '') {
            alert("Please fill all the inputs for task registration");
        } else {
            try {
                const response = await fetch(`http://localhost:8000/create-task/${userId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        taskName, taskDescription, taskPriority
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(`Task registered successfully with id : ${data.result.taskId}`);
                    fetchTask();
                    setTaskName('');
                    setTaskDescription('');
                    setTaskPriority('');
                } else {
                    alert('Unable to register the task');
                }
            } catch (error) {
                console.log(error);
                alert('Something went wrong, try again later');
            }
        }


    }

    const handleDeleteTask = async (taskId) => {
        console.log("Delete task id:" + taskId + " and delete user Id is:" + User.userId);
        try {
            const response = await fetch(`http://localhost:8000/delete-task/${User.userId}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                alert("Unable to delete a task");
            }
            else {
                alert("Task deleted sucessfully");
                fetchTask();
            }

        }
        catch (error) {
            console.log(error);
        }

    }

    const handleUpdatePut = async (taskId) => {
        const userId = User.userId;
        console.log("User id: " + userId + " and task Id :" + taskId + " for the update functionailty");
        const taskToUpdate = task.find(t => t.taskId === taskId);
        if (!taskToUpdate) {
            console.log("Task not found with the provided task Id:", taskId);
            return;
        }
        setTaskName(taskToUpdate.taskName);
        setTaskDescription(taskToUpdate.taskDescription);
        setTaskPriority(taskToUpdate.taskPriority);
        console.log("Task Name:" + taskName + ", task description: " + taskDescription + " and task priority is: " + taskPriority);
        try {
            setUpdateButton(true);
            const response = await fetch(`http://localhost:8000/update-task/${userId}/${taskId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    taskName: taskName,
                    taskDescription: taskDescription,
                    taskPriority: taskPriority
                })
            })

            if (!response.ok) {
                alert(`Unable to update the task with taskId: ${taskId}`);
            }
            else {
                alert("Updated the task sucessfully");
                fetchTask();
                setTaskName('');
                setTaskDescription('');
                setTaskPriority('');
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setUpdateButton(false);
        }
    }


    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <div className="todoContainer">
            <div style={{ marginBottom: '1rem' }} className="todoHeadingWrapper">
                <h1 className="display-4">Add a Todo</h1>
            </div>
            <div className="todoSubmitWrapper">
                <form onSubmit={handleOnSubmit}>
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
                    {updateButton === true ? (
                        <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-primary">Update</button>
                    ) : (
                        <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-primary">Submit</button>
                    )}

                </form>
            </div>
            <div className="renderedTodoWrapper">
                {task.length > 0 ? (
                    <div className="taskListHeaing">
                        <h1 className="display-4">Your Todo's</h1>
                    </div>
                ) : (
                    <div className="taskListHeaing">
                        <h1 className="display-4">No Todo's! Add one</h1>
                    </div>
                )}
                <div className="todoListHeading">
                </div>
                {task && task.length > 0 ? task.map((item) => {
                    return (
                        <div key={item.taskId} className="wrapper">
                            <div className="todoListWrapper">
                                <div className="taskNameandPriorityWrapper">
                                    <figure>
                                        <blockquote className="blockquote">
                                            <p>{item.taskName}</p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer">
                                            Priority: <cite title="Source Title">{item.taskPriority}</cite>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="buttonWrapper">
                                    <div className="deleteButtonsWrapper">
                                        <AiTwotoneDelete onClick={() => handleDeleteTask(item.taskId)} size={30} />
                                    </div>
                                    <div className="updateButtonsWrapper">
                                        <MdSystemUpdateAlt onClick={() => handleUpdatePut(item.taskId)} size={30} />
                                    </div>
                                </div>
                            </div>
                            <p>{item.taskDescription}</p>
                        </div>
                    );
                }) : null}
            </div>
        </div>
    );
}

export default Todo;