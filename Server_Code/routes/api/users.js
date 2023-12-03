const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require('../../models/User');
const bodyParser = require("body-parser");

// Signup Route
userRouter.post("/signup", async (req, res) => {
    try{
        const {id, email, password, confirmPassword, name, date, workouts} = req.body;
        if (!email || !password || !name || !confirmPassword){
            return res.status(400).json({msg: "Please enter all the fields"});
        }
        if (password.length < 8) {
            return res
            .status(400)
            .json({msg: "Password must have at least 8 characters."});
        }
        if (confirmPassword !== password) {
            return res.status(400).json({ msg: "Both password fields must match."});
        }
        const existingUser = await User.findOne({email});
        if( existingUser){
            return res
            .status(400)
            .json({msg: "This email address is already in use."});
        }
        const hashedPassword = await bcryptjs.hash(password,8);
        const newUser = new User({email, password: hashedPassword, name, date, workouts});
        
        const savedUser = await newUser.save();
        console.log(savedUser.username);
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Login Route
userRouter.post("/login",async (req,res)=> {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({msg: "Please enter all the fields"});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res
            .status(400)
            .send({ msg: "Cannot find account associated with this email. Please try again."});
        }

        const isMatch = await bcryptjs.compare(password,  user.password);
        
        if (!isMatch) {
            return res.status(400).send({ msg: "Password does not match email associated with this account. Please try again."});
        }
        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({ token, user: {id: user._id, email: user.email, name: user.name, date: user.date, workouts: user.workouts} });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// To Check If Token is Valid
userRouter.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token, "passwordKey");
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        console.log("Why")
        res.status(500).json({error: err.message});
    }
});

// to get user credentials
userRouter.get("/", auth, async(req, res)=> {
    const user = await User.findById (req.user);
    res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        date: user.date,
        workouts: user.workouts
    });
});

//To add/remove workout routines
userRouter.put("/routines/:id", (req, res) => {
    console.log(req.body.workouts)
    
    User.findByIdAndUpdate(req.params.id, { workouts: req.body.workouts })
    .then((user) => { console.log("Success.")
        res.json({msg: 'Updated user workouts successfully.'})})
    .catch((err) => res.status(400).json({error: 'Unable to update the databse.'}))

    
   console.log("I'm getting requests.")
})


module.exports =userRouter;