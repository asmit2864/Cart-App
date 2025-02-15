const { userService, tokenService, authService } = require("../services")
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req,res)=>{
    
   const user = await userService.createUser(req.body);
   const token = await tokenService.generateAuthToken(user);
   res.status(201).send({user,token})
})

const login = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received for:", email);
        
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await tokenService.generateAuthToken(user);

        res.status(200).send({ user, tokens });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports = {
    register,
    login
}