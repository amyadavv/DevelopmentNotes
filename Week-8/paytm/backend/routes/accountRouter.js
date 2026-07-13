const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../schema/UserSchema");
const router = express.Router();
const mongoose = require("mongoose")


router.get("/balance", authMiddleware, async function (req, res) {

    const account = await Account.findOne({
        userId: req.userId
    })

    if (!account) {
        return res.json("Account not found")
    }
    res.status(200).json({
        balance: account.balance
    })
})

// Bad Solution

// router.post("/transfer", authMiddleware, async function (req, res) {
//     const { to, amount } = req.body;

//     const account = await Account.findOne({
//         userId: req.userId
//     })
//     if (account.balance < amount) {
//         return res.status(400).json({
//             message: "Balance Low"
//         })
//     }
//     const toAccount = await findOne({
//         userId: to
//     })

//     if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid Account"
//         })
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance: -amount
//         }
//     })

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance: amount
//         }
//     })

//     res.json({
//         message: "Done hai ji"
//     })
// })

// Better Solution using transactions in DB

router.post("/transfer", authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { to, amount } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Low Balance" })
        }

        const account2 = await Account.findOne({ userId: to }).session(session);

        if (!account2) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer failed"
        })
    } finally {
        session.endSession();
    }
})

module.exports = router;





// 1 . Have not apply check that the users have this much of amount (amount). We cannot put if check above because what if two request happens at the same time then the if check will bypass and may succeed so this fail the purpose.
// 2. And the bigger problem is what if I call this function and after first async calls the server dies or database is down, then the second request will never happen so my db is in inconsistent state that we never want we want that the both request should happen together or none of them to happen for which we can do 'Transaction' in database. So we need to wrap this two async call inside the transaction and make sure both of them happen or neither happen.

// 


// Transactions in databases
 
// A lot of times, you want multiple databases transactions to be atomic
// Either all of them should update, or none should. This is super important in the case of a bank

// What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
// What if the Node.js crashes after the first update?

// It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

// If a failure ever happens, the first txn should rollback.

// This is what is called a transaction in a database.