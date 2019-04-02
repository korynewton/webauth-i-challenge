const router = require('express').Router()

router.get('/', (req, res) => {
    try {
        if (req.session) {
            req.session.destroy()
            res.status(200).json({  message: "goodbye!" })
        } else {
            res.status(400).json({ message: 'user not logged in '})
        }
    } catch {
        res.status(500).json({ message: 'error in loggin out '})
    }
})

module.exports = router;