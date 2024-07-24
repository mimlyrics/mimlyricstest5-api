const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const testSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        minLength: ['9', ' {VALUES} is too small'],    
        maxLength: ['50', '{VALUES} why so many characters'] 
    },
    phone: {
        type: String,
        /*validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }*/
        required: [true, 'User phone number required']
    }
});

testSchema.methods.generateEmailCode = function () {
    //console.log(this);
    //let token = 123;
    const token = jwt.sign({_id: this._id}, process.env.EMAIL_TOKEN_SECRET, {expiresIn: "1d"});
    console.log(token);
    return token
}


const Test = mongoose.model('Test', testSchema);
module.exports = Test;