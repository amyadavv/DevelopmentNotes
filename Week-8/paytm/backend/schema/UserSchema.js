const mongoose = require("mongoose");


// const connectDb = async () => {
//     try {
//         const connectDB = mongoose.connect(process.env.MONGO_URI);
//         console.log(`Mongo Db is connected: ${connectDB.connection.host}`);
//     } catch (error) {
//         console.log(`Unable to connect to mongo DB ${error.message}`);
//         process.exit(1);
//     }
// }
// console.log(`Mongo Db is connected: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI)


const UserSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    password:
    {
        type: String,
        minLength: 8,
        required: true,
    },
    firstName:
    {
        type: String,
        maxLength: 50,
        required: true,
        trim: true,
    },
    lastName:
    {
        type: String,
        maxLength: 30,
        trim: true,
        required: true,
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // This insures that I cannot put anything in the accounts table that does not have the corresponding user here. Only user with the certain Id exists then i will able to put something on the accounts table  
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User, Account
}