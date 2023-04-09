import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleUserEmail = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPassword = (event) => {
        setUserPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userEmail === '' || userPassword === '') {
            alert("Please fill all the fields to login");
        }
        else {
            try {
                const response = await fetch('http://localhost:8000/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail, userPassword
                    })
                });

                if (!response.ok) {
                    alert('Invalid user email or password');
                }
                else {
                    const user = await response.json();
                    alert(`${user.user.userFirstName} logged in sucessfully`);
                    navigate(`/create-task/${user.user.userId}`, {
                        state: {
                            userInformation: user.user
                        }
                    });
                }
            }
            catch (error) {
                console.log(error);
            }

            setUserEmail('');
            setUserPassword('');
        }
    }



    return (
        <div className='loginContainer'>
            <div className='loginHeading'>
                <h1 className='display-3'>Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={handleUserEmail} value={userEmail} type="email" className="form-control" id="emailId" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div style={{ marginTop: '1rem' }} className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleUserPassword} value={userPassword} type="password" className="form-control" id="passwordId" placeholder="Password" />
                </div>

                <button style={{ marginTop: '1rem' }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;