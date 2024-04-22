const { Router } = require("express")
const { User, Account } = require('../Database/db')
const { JWT_SECRET } = require('../Config')
const router = Router()
const jwt = require("jsonwebtoken")
const zod = require('zod')

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

// Admin Routes
router.post('/signup', async (req, res) => {
    // zod verification
    const success = signupBody.safeParse(req.body)
    if(!success){
        return res.json({
            message : "Invalid username or password"
        })
    }
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    // check if a user with this username already exists
    const userExist = await User.findOne({
        username: username
    })
    if (userExist) {
        return res.json({
            message: "User already exist! Please Login"
        })
    }
    const user = await User.create({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    console.log(user)
    const userId = user._id

    // Creating balance account for user
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({ userId }, JWT_SECRET)
    await User.updateOne(
        { _id: userId },
        { $set: { token: token } }
    )
    res.json({
        message: 'User created successfully',
        token: token
    })


})

// Implementing Signin Method 

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body

    const user = await User.findOne({
        username: username,
        password: password
    })
    if (!user) {
        return res.status(411).json({
            message: "User does not Exist. Please Signup."
        })
    }
    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        res.json({
            message: "Login successfull.",
            token: token
        })
    } else {
        res.status(411).json({
            message: "Error while logging."
        })
    }


})


module.exports = router