function restrict(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ message: "you shall not pass"})
    }
}
// async function restrict(req, res, next) {
//     const { username, password } = req.headers;
//     try {
//         const user = await Users.findBy({ username }).first()
//         if (user && bcrypt.compareSync(password, user.password)) {
//             next()
//         }
//         else {
//             res.status(404).json({message: "you shall not pass!"})
//         }
//     } catch {
//         res.status(500).json({ error: "error in looking up user" })
//     }
// }

module.exports = restrict;