const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../schema/UserSchema");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware")

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateUserDetails = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body);

    //     const obj = signupSchema.safeParse(req.body);
    // if (!obj.success) {
    //     return res.status(411).json({
    //         message: "Incorrect inputs"
    //     })
    // }

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: ""
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        res.json({ token: token })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateUserDetails.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.userId }, req.body)

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } }, // regex is method to do LIKE searches in the mongoDB. (Substring search)
            { lastName: { "$regex": filter } }
        ]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    }) // this is done because we dont need to return the password
})

module.exports = router;