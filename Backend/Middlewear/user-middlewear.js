const bcrypt = require('bcrypt');
const Task = require('../Model/Task');
const User = require('../Model/User');

const userAuthenticaton = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const userEmailFromAuthHeader = auth[0];
        const userPasswordFromAuthHeader = auth[1];
        const { userId } = req.params;
        console.log("User id from params for auth: " + userId);


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

        console.log("User details: " + user.userFirstName + user.userLastName);
        req.userIdFromAuth = user.userId;

        if (!user) {
            return res.status(401).json({ message: "User not found for authentication" });
        }
        else {
            try {
                const hashedPassword = user.userPassword;
                const encodedPassword = await bcrypt.compare(userPasswordFromAuthHeader, hashedPassword);
                console.log("Encoded Password:" + encodedPassword);
                if (!encodedPassword) {
                    return res.status(400).json({ message: "Password does not match" });
                }
                else {
                    if (userEmailFromAuthHeader == user.userEmail && encodedPassword == true) {
                        next();
                    }
                    else {
                        return res.status(400).json({ message: "User not authorised" });
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = userAuthenticaton;

