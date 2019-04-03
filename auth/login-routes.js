const bcrypt = require('bcryptjs');
const router = require('express').Router()
const Users= require('../users/users-model')


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findBy({ username }).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({ message: `Welcome ${user.username}, heres a cookie!` })
        } else {
            res.status(401).json({ message: "You shall not pass" })
        }    
    } catch(err) {
        res.status(400).json({ error: "error in logging in"})
    } 
})

module.exports = router;