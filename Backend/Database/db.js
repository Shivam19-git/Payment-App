const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root_shivam:shivam19@cluster0.wifxvfi.mongodb.net/PaymentApp')

// Create a use Schema here
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    lastname : String
})

// Creating new User model
const User = mongoose.model('User', userSchema)

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User Schema model
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const Account = mongoose.model('Account', accountSchema)

module.exports = ({
    User, Account
})