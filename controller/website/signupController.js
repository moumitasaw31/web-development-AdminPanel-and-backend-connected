let jwt = require('jsonwebtoken')
const { transporter } = require("../../config/website/mailConfig")
const bcrypt = require('bcrypt');
const { userRegisterModel } = require("../../model/website/userRegisterModel");

const saltRounds = 10;


let storeUserOtp = new Map()

let otpCreation = async (req, res) => {

    let { userEmail } = req.body

    // DB me mail check ho rha hai

    let exitingUser = await userRegisterModel.findOne({ userEmail })

    if (exitingUser) {

        let obj = {
            status: 0,
            msg: "Email address already exits ..."
        }
        return res.send(obj)

    }

    let otp = Number((Math.random() * 9999999).toString().split(".")[0].slice(0, 4))  // after otp

    // save it with a user ka email se => 4821

    storeUserOtp.set(userEmail, otp)

    //call transporter of nodemailer here

    const info = await transporter.sendMail({
        from: '"MONSTA" <moumitasaw31@gmail.com>',
        to: userEmail,
        subject: "Hello ✔| MONSTA OTP",
        text: "OTP?", // Plain-text version of the message
        html: `<b>YOUR OTP - ${otp}</b>`, // HTML version of the message
    });

    let obj = {
        status: 1,
        msg: "otp send",

    }

    return res.send(obj)




}


let verifyOtp_AddDetails = async (req, res) => {

    let { userName, userEmail, userPhone, userPassword, otp } = req.body

    //  to match otp    call get ko

    let myOtp = storeUserOtp.get(userEmail)
    let obj;



    if (myOtp === Number(otp)) {             // if otp match pasword encrypt karo

        try {

            const hash = bcrypt.hashSync(userPassword, saltRounds);

            let createUserObj = {

                userName,
                userEmail,
                userPhone,
                userPassword: hash,
            }

            let userData = await userRegisterModel.create(createUserObj)

            // console.log('user data = > ', userData)

            obj = {
                status: 1,
                msg: "user created",
                user: {
                    userName: userData.userName,
                    userEmail: userData.userEmail,
                    id: userData._id
                }
            }

            storeUserOtp.delete(userEmail) // otp delete


            return res.send(obj)

        }

        catch (err) {

            // console.log(err)

            obj = {
                status: 0,
                msg: "something went wrong",
                err

            }

            if (err.code === "11000") {

                obj.msg = "User Already Exits ..."

            }
            return res.send(obj)


        }

    }
    else {                         // if not match

        obj = {
            status: 0,
            msg: "Enter correct otp",

        }

    }
    res.send(obj)



}

let resendOtp = async (req, res) => {
    let { userEmail } = req.body;

    // new OTP generate
    let otp = Math.floor(1000 + Math.random() * 9000);

    // overwrite old OTP
    storeUserOtp.set(userEmail, otp);

    // auto-expire in 5 min
    setTimeout(() => {
        storeUserOtp.delete(userEmail);
    }, 5 * 60 * 1000);

    // send mail again
    await transporter.sendMail({
        from: '"MONSTA" <moumitasaw31@gmail.com>',
        to: userEmail,
        subject: "MONSTA Resend OTP",
        html: `<b>YOUR NEW OTP - ${otp}</b>`,
    });

    return res.send({
        status: 1,
        msg: "OTP resent successfully",
    });
};

let userLogin = async (req, res) => {

    let { userEmail, userPassword } = req.body


    let emailExits = await userRegisterModel.findOne({ userEmail })
    let obj;

    // ye 1 obj hai email/pass 2no hai

    if (emailExits) {

        let dbPassword = await emailExits.userPassword


        if (await bcrypt.compare(userPassword, dbPassword)) {
            let token = jwt.sign({ id: emailExits._id }, process.env.TOKEN); // token created

            obj = {

                status: 1,
                msg: "Successfully Login",
                // email: emailExits.userEmail
                // don't send password to frontend / send only email
                user: {
                    id: emailExits._id,
                    userName: emailExits.userName,
                    userEmail: emailExits.userEmail,
                    userPhone: emailExits.userPhone,
                    userAddress: emailExits.userAddress,
                    userTitle: emailExits.userTitle,
                    userPassword: emailExits.userPassword

                },
                token

            }

            return res.send(obj)



        }
        else {
            obj = {

                status: 0,
                msg: "Incorrect password"

            }

            return res.send(obj)
        }


    }
    else {
        obj = {

            status: 0,
            msg: "Email does not exist"

        }

        return res.send(obj)
    }

}


let googleLogin = async (req, res) => {

    let { userEmail, userName } = req.body

    try {

        let emailExits = await userRegisterModel.findOne({ userEmail })
        let obj


        if (emailExits) {

            let token = jwt.sign({ id: emailExits._id }, process.env.TOKEN); // token created

            obj = {

                status: 1,
                msg: "Already Exists..! ",
                user: {
                    id: emailExits._id,
                    userName: emailExits.userName,
                    userPassword: emailExits.userPassword

                },
                token
            }
        }

        else {
            let insertObj = {
                userEmail,
                userName,

            }
            let newUser = await userRegisterModel.create(insertObj)
            let token = jwt.sign({ id: newUser._id }, process.env.TOKEN); // token created



            obj = {

                status: 1,
                msg: "New user..! ",
                user: {
                    id: newUser._id,                 // id, name, password jo ki nhi hai
                    userName: newUser.userName,
                    userPassword: newUser.userPassword
                    // hasPassword: !!newUser.userPassword
                },
                token
            }

        }

        return res.send(obj)
    }

    catch (err) {
        console.log(err); // terminal me dikhega

        return res.send({
            status: 0,
            msg: "Server error"
        });

    }

}

let googlePasswordUpdate = async (req, res) => {

    let { id, newPassword, confirmPassword } = req.body

    let obj;


    if (!newPassword) {
        obj = {
            status: 0,
            msg: "fill the new password"
        }
        return res.send(obj)
    }
    if (!confirmPassword) {     // == '' || undefined || null   same meaning
        obj = {
            status: 0,
            msg: "Fill the confirm password"
        }
        return res.send(obj)
    }
    if (newPassword == confirmPassword) {

        let hash = bcrypt.hashSync(newPassword, saltRounds)

        let updatePass = await userRegisterModel.updateOne(

            { _id: id },
            { $set: { userPassword: hash } }
        )


        obj = {
            status: 1,
            msg: "Password created Successfully",
            updatePass,
            pass: hash

        }

    }

    res.send(obj)

}




let changeCurrentPassword = async (req, res) => {

    try{
          let { id, currentPassword, newPassword, confirmPassword } = req.body

    console.log(id);

    let user = await userRegisterModel.findOne({ _id: id }).select('userPassword')
    let obj;

    if (!user) {
        obj = {

            status: 0,
            msg: "User not found",


        }
        return res.send(obj)
    }
    else {

        let dbPassword = user.userPassword

        console.log("user pass =>" , currentPassword)
        check =  bcrypt.compare(currentPassword, dbPassword)
        console.log("comparre =>",check)


        if (bcrypt.compareSync(currentPassword, dbPassword)) {

            if (!newPassword) {
                obj = {
                    status: 0,
                    msg: "fill the new password"
                }
                return res.send(obj)
            }
            if (!confirmPassword) {     // == '' || undefined || null   same meaning
                obj = {
                    status: 0,
                    msg: "Fill the confirm password"
                }
                return res.send(obj)
            }


            if (newPassword == confirmPassword) {

                let hash = bcrypt.hashSync(newPassword, saltRounds)

                let updatePass = await userRegisterModel.updateOne(

                    { _id: id },
                    { $set: { userPassword: hash } }
                )

                obj = {
                    status: 1,
                    msg: "Password Changed Successfully",
                    updatePass

                }

            }
            else {

                obj = {
                    status: 0,
                    msg: "New Password and Confirm Password did not matched"
                }
            }
        }
        else {

            obj = {
                status: 0,
                msg: "Current Password is Incorrect"
            }

        }

        res.send(obj)
    }
    }catch(error){
        console.log(error)
    }

  




}

let updateProfile = async (req, res) => {

    let { id, title, userName, userEmail, userPhone, userAddress } = req.body

    let updateUser = {
        userTitle: title,
        userName,
        userEmail,
        userPhone,
        userAddress
    }

    let updateRes = await userRegisterModel.updateOne(
        { _id: id },
        { $set: updateUser }
    )

    let obj = {
        status: 1,
        msg: "Data updated",
        updateRes

    }

    res.send(obj)

}






//     let { userId, userPassword } = req.body

//     if (!userId || !userPassword) return res.send({ status: 0 });


//     const hash = bcrypt.hashSync(userPassword, saltRounds);
//     let obj = {

//         userPassword: hash
//     }

//     let objRes = await userRegisterModel.updateOne(

//         { _id: userId },

//         { $set: obj }

//     )


//     let passwordObj = {

//         status: 1,
//         msg: "Password Set",
//         

//     }



//     return res.send(passwordObj)
// }

// let googlePassword = async (req, res) => {
//     try {
//         let { userId, userPassword } = req.body;

//         if (!userId || !userPassword) {
//             return res.send({ status: 0, msg: "Invalid data" });
//         }

//         const hash = bcrypt.hashSync(userPassword, saltRounds);

//         let objRes = await userRegisterModel.updateOne(
//             { _id: userId },
//             { $set: { userPassword: hash } }
//         );

//         return res.send({
//             status: 1,
//             msg: "Password Set"
//         });

//     } catch (err) {
//         return res.send({
//             status: 0,
//             msg: "Server error"
//         });
//     }
// };






module.exports = { otpCreation, verifyOtp_AddDetails, resendOtp, userLogin, googleLogin, changeCurrentPassword, updateProfile, googlePasswordUpdate }