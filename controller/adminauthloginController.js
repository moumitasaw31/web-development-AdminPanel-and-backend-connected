
const { adminauthLoginModel } = require("../model/adminauthloginModel")

// admin panel login things


let userLogin = async (req, res) => {

    let { userEmail, userPassword } = req.body          //  received

    let loginDeatails = await adminauthLoginModel.findOne({ userEmail, userPassword })  //  model name passed to check values

    if (loginDeatails) {

        let obj = {
            status: 1,
            msg: "Login Succesfully",
            loginDeatails                          // must send this data
        }
        res.send(obj)
    }
    else {
        let obj = {
            status: 0,
            msg: "User Email or Password incorrect"
        }
        res.send(obj)
    }



}


module.exports = { userLogin }