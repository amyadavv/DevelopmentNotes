const express = require("express");
const userRouter = require("./userRouter")
const accountRouter = require("./accountRouter")


const router = express.Router();

router.use("/users", userRouter);
router.use("/account", accountRouter);


module.exports = router;