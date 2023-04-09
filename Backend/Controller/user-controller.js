const express = require('express');
const User = require('../Model/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    const { userFirstName, userLastName, userEmail, userPassword } = req.body;

    //Hashing the password using bcrypt:
    const password = userPassword;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Checking if the user exists in the database:

    let existingUser;
    try {
        existingUser = await User.findOne({
            where: {
                userEmail: userEmail
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exits, user a different email id" });
    }
    else {
        //Storing new user in the database:
        let user;
        try {
            user = await User.create({
                userFirstName: userFirstName,
                userLastName: userLastName,
                userEmail: userEmail,
                userPassword: hashedPassword
            });
        }
        catch (error) {
            console.log(error);
        }

        if (!user) {
            return res.status(400).json({ message: "Unable to create the user" });
        }
        else {
            return res.status(201).json({ message: "User Created", result: user });
        }
    }
}

const getAllUser = async (req, res, next) => {
    let user;

    try {
        user = await User.findAll();
    }
    catch (error) {
        console.log(error);
    }

    if (!user) {
        return res.status(400).json({ message: "Unable to get user's" });
    }
    else {
        return res.status(200).json({ message: "Found all users", result: user });
    }
}

const getSingleUser = async (req, res, next) => {
    const { userId } = req.params;

    let user;

    try {
        user = await User.findOne({
            where: {
                userId: userId
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (!userId) {
        return res.status(400).json({ message: "Unable to find the user" });
    }
    else {
        return res.status(201).json({ message: "Found the user with id:" + userId, result: user });
    }
}

const login = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    console.log("Email: " + userEmail + ", password: " + userPassword);

    let loginUser;

    try {
        loginUser = await User.findOne({
            where: {
                userEmail: userEmail
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (!loginUser) {
        return res.status(400).json({ message: "User not authorised" });
    }
    else {
        const databasePassword = loginUser.userPassword;
        const encodedPassword = await bcrypt.compare(userPassword, databasePassword);
        if (userEmail == loginUser.userEmail && encodedPassword == true) {
            return res.status(200).json({ message: `${loginUser.userFirstName} is authorised to login` });
        }
    }
}

module.exports = {
    createUser,
    getAllUser,
    getSingleUser,
    login
}

