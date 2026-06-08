import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('SECRET:', process.env.JWT_SECRET_KEY)
    console.log('HEADER:', JSON.stringify(req.headers.authorization))
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded  // { id, role } now available in every route
        next()
    } catch (err) {
        console.log('JWT ERROR:', err.message)
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' })
        }
        next()
    }
}