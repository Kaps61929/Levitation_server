const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const key=process.env.secretKey;

const validatePasswordComplexity = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  };


exports.register=async(req,res)=>{
    try{
const {name,email,password}=req.body;
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res
    .status(400)
    .json({ msg: "User with same email already exists!" });
}
const isValidPassword = validatePasswordComplexity(password);
if (!isValidPassword) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters long and include a combination of uppercase and lowercase letters, at least one numeric digit, and special characters like !, @, #, $, etc.' });

}
const hashedPassword = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashedPassword });
await user.save();
return res.status(200).json(user);
    }
    catch(e){
       return  res.status(500).json({ error: e.message });
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ msg: "Create Account" });
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({ msg: "Enter Correct Password" });
        }
        const token = jwt.sign({ id: user._id },key);
        
       return res.status(200).json({ token, ...user._doc });
            }
            catch(e){
                if (error.name === 'ValidationError') {
                    return res.status(400).json({ error: error.message }); // Validation error response
                  }
               return  res.status(500).json({ error: e.message });
            }
}