const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
UserSchema.statics.signup = async function (email,password)  {
    
    // validation
    if(!email || !password)
    {
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    // if(!validator.isStrongPassword(password)){
    //     throw Error("Password not strong enough");
    // }
    
    //saving the email and password in the database after validation
    const exists = await this.findOne({ email })
    if(exists)
    {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(password,salt);

    const user = await this.create({email, password:hash})

    return user;
}

//static login method
UserSchema.statics.login = async function(email,password) {
    if(!email || !password)
    {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email })
    if(!user)
    {
        throw Error("Incorrect Email");
    }
    //comparing the password
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error("Incorrect Password");
    }

    return user;
}

module.exports = mongoose.model('User', UserSchema);