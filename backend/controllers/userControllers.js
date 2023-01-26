//Create my functions that will handled in the controllers folders

//@desc Register new user
//@route POST /api/users
//@access public
const registerUser = (req, res)=>{
    res.json({message: 'Register User'})
}



//@desc Authenticate user
//@route POST /api/users/login
//@access public
const loginUser = (req, res)=>{
    res.json({message: 'Login  User'})
}

//@desc Get user data
//@route POST /api/users/me
//@access public
const getMe = (req, res)=>{
    res.json({message: 'Display user Data'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}