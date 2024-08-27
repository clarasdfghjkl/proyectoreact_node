const { verifyToken } = require('../utils/jwt')
const User = require('../api/models/user.model')

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.json({ message: 'No está autorizado' })
    }
    const token = authorization.split('')[1]
    if (!token) {
        return res.json({ message: 'no hay token' })
    }


}
const isAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.json({ message: 'No está autorizado' })
    }
    const token = authorization.split('')[1]
    if (!token) {
        return res.json({ message: 'no hay token' })
    }


    const tokenVerify = verifyToken(token);

    if (!tokenVerify.id) {
        return res.json({ message: 'no existe el id del usuario' })
    }

    const logged = await User.findById(tokenVerify.id);

    if (logged.role !== 'admin') {
        return res.json({ message: 'No tienes permiso' })
    }
    req.dataUser = logged;
    next()
}

module.exports = { isAuth, isAdmin }