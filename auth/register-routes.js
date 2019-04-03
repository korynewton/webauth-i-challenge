const router = require('express').Router()
const bcrypt = require('bcryptjs');
const Users= require('../users/users-model')


router.post('/', async (req, res) => {
    console.log('here')
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


module.exports = router;