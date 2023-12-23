const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports.signup = async (req,res) => {
    const {name, email, password, confirmPassword} = req.body;
    if (name && email && password && confirmPassword) {
        const userAlreadyExists = await User.findOne({email});
        if(!userAlreadyExists) {
            if (password === confirmPassword){
                const salt = await bcrypt.genSalt(10);
                // encrypting the password
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = await User.create({name,email,password:hashedPassword});
                return res.json({success: true, message:"User registered successfully.Please Login."})
            } return res.json({error:"passwords do not match."})
        } return res.json({error:"User already exists."})
    } return res.json({error:"All fields are required."});
}

module.exports.login = async (req,res) => {
    const {email,password} = req.body;

    if(email && password){
        const foundUser = await User.findOne({email});

        if(foundUser){
            const isValidPass = await bcrypt.compare(password,foundUser.password);

            if(isValidPass){
                // step 1: authentication (creating the jwt token and sending it to the client)
                const token = jwt.sign({userId:foundUser._id},'jwttokensecret',{expiresIn: '2d'});
                return res.json({success: true, message:"Logged in successfully.", token})
            } return res.json({error:"Invalid login credentials."})

        } return res.json({error:"User doesn't exists."})
        
    } return res.json({error:"All fields are required."})
}