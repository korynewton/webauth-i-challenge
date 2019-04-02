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

    try {
        const added = await Users.add(user);
        res.status(200).json(added)
    } catch {
        res.status(400).json( { message: "error" })
    }

})

server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findBy({ username }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: "You shall not pass" })
        }    
    } catch(err) {
        res.status(400).json({ error: "error in logging in"})
    } 
})


async function restrict(req, res, next) {
    const { username, password } = req.headers;
    try {
        const user = await Users.findBy({ username }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            next()
        }
        else {
            res.status(404).json({message: "you shall not pass!"})
        }
    } catch {
        res.status(500).json({ error: "error in looking up user" })
    }
}


server.get('/api/users', restrict, async (req, res) => {
    try {
        const users = await Users.find();
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(404).json({ message: "no users" })
        }
    } catch {
        res.status(500).json({ error: "error in retrieving users" })
    }
})


module.exports = server;