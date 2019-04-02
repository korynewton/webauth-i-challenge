const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session'); //cookie step #1

const loginRoute = require('./auth/login-routes')
// const logoutRoute = require('./auth/logout-routes')
const registerRoute = require('./auth/register-routes')
const usersRoute = require('./users/usersRoutes')

const server = express();

//cookie step #3
const sessionConfig = {
    name: 'nonDefaultName',
    secret:'this is a secret',
    cookie: {
        maxAge: 1000 * 60 * 5,
        secure: false,
    },
    httpOnly:true,
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(express.json());
server.use(cors())
server.use(session(sessionConfig)) //cookie step #2

server.get('/', (req, res) => {
    res.status(200).json({ message: "great success" })
})

server.use('/api/auth/login', loginRoute)
// server.use('/api/logout', logoutRoute)
server.use('/api/auth/register', registerRoute)
server.use('/api/users', usersRoute)


module.exports = server;