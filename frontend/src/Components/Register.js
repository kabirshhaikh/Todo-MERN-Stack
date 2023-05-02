import React, { useState } from "react";
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleFirstName = (event) => {
        setUserFirstName(event.target.value);
    }

    const handleLastName = (event) => {
        setUserLastName(event.target.value);
    }

    const handleEmail = (event) => {
        setUserEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setUserPassword(event.target.value);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (userFirstName === '' || userLastName === '' || userEmail === '' || userPassword === '') {
            alert("Please fill all the inputs  registration");
        }

        try {
            const response = await fetch('https://backend-todo-mern.onrender.com/create-user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userFirstName, userLastName, userEmail, userPassword
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert(`${userFirstName} registered sucessfully`);
                navigate('/');
            }
            else {
                alert('Unable to register the User');
            }
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong, try again later');
        }

        setUserFirstName('');
        setUserLastName('');
        setUserEmail('');
        setUserPassword('');

    }

    return (
        <div className="registerContainer">
            <div className="headingText">
                <h1 className="display-5">Register yourself:</h1>
            </div>
            <form method="POST" onSubmit={handleOnSubmit} >
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleFirstName} value={userFirstName} type="text" className="form-control" id="firstNameId" aria-describedby="firstName" placeholder="Enter First Name" />
                </div>
                <div style={{ marginTop: '1rem' }} className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={handleLastName} value={userLastName} type="text" className="form-control" id="lastNameId" aria-describedby="lastName" placeholder="Enter Last Name" />
                </div>
                <div style={{ marginTop: '1rem' }} className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleEmail} value={userEmail} type="email" className="form-control" id="emailId" aria-describedby="email" placeholder="Enter email" />
                </div>
                <div style={{ marginTop: '1rem' }} className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handlePassword} value={userPassword} type="password" className="form-control" id="passwordId" placeholder="Enter Password" />
                </div>
                {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <div className="loginLink" style={{ marginTop: '1rem' }}>
                    <Link to='/'>Already a user? Login</Link>
                </div>
                <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;