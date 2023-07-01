const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY

const authMiddleware = (req, res, next)=>{
    console.log(req.header)
    const token = req.header('Authorization');
    if(!token) {
        res.status(401).json({
            message: 'Authentication denied'
        })
    } else {
        try {
            const decoded = jwt.verify(token, secretkey);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    }
}

module.exports = authMiddleware