const jwt = require('jsonwebtoken')
const kunci = 'qwertyuiop12345'

module.exports = {
    isAllowed: (req, res, next) => {
        const auth = req.headers.authorization;
        if(auth) {
            const token = auth.split(' ')[1]
            const valid = jwt.verify(token, kunci, {
                algorithms: 'HS512'
            })

            if(valid['id'] && valid['id'] !== '') {
                req.id_user = valid['id']
                
                next()
            } else {
                res.status(200).send({
                    'pesan': 'Token invalid'
                })
            }
        } else {
            res.status(200).send({
                'pesan': 'Unauthenticated'
            })
        }
    }
}