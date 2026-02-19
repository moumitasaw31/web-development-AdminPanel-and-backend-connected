let express = require("express")
const { otpCreation, verifyOtp_AddDetails, resendOtp, userLogin, googleLogin, changeCurrentPassword, updateProfile, googlePasswordUpdate, } = require("../../controller/website/signupController")
const { checkToken } = require("../../middleWare/tokenVerify")
let signupRoutes = express.Router()


signupRoutes.post("/sign-up", otpCreation)
signupRoutes.post("/verify-otp", verifyOtp_AddDetails)
signupRoutes.post("/resend-otp", resendOtp)
signupRoutes.post("/login", userLogin)
signupRoutes.post("/google-login", googleLogin)
signupRoutes.post("/google-password", checkToken, googlePasswordUpdate)
signupRoutes.post("/changeCurrentPass", checkToken, changeCurrentPassword)
signupRoutes.put("/update-profile", checkToken, updateProfile)



// signupRoutes.post("/set-password",  googlePassword)









module.exports = { signupRoutes }