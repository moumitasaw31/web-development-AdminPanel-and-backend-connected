let jwt = require('jsonwebtoken')
let checkToken = (req, res, next) => {

    let token = req.headers.authorization.split(" ")[1]

    let resObj;
    if (token) {
        let decode = jwt.verify(token, process.env.TOKEN);
        if (decode) {
            let { id } = decode
            req.body.id = id
            return next()
        }

    }
    else {
        resObj = {
            status: 0,
            msg: "Token missing"
        }
    }
    res.send(resObj)
}

module.exports = { checkToken }


