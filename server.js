const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');

const Users= require('./users/users-model')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors())

server.get('/', (req, res) => {
    res.status(200).json({ message: "great success" })
})

server.post('/api/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    
    user.password = hash;

    const added = await Users.add(user);
    try {
        res.status(200).json(added)
    } catch {
        res.status(400).json( { message: "error" })
    }

})

server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first()
    try {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: "You shall not pass" })
        }    
    } catch(err) {
        res.status(400).json({ error: "error in logging in"})
    } 
})



// server.get('/api/users', (req, res) => {

// })


module.exports = server;