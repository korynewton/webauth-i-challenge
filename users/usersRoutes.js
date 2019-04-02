const bcrypt = require('bcryptjs');
const router = require('express').Router()
const Users= require('../users/users-model')
const restrict = require('../middleware/restrictMiddleware')


router.get('/', restrict, async (req, res) => {
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


module.exports = router;