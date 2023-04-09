import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const Todo = () => {

    const location = useLocation();
    const User = location.state.userInformation;
   
    return (
        <div>
            <h1>Welcome {User.userFirstName}</h1>
        </div>
    );
}

export default Todo;