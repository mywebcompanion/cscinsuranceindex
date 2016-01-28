/**
 * Created by ARUN on 28/1/2016.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    local : {
        username : String,
        password : String
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    }
});

//userSchema.methods.generateHash = function(password){
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
//}
//
//userSchema.methods.validPassword  = function(password){
//    return bcrypt.compareSync(password, this.local.password);
//}
mongoose.exports = mongoose.model('User', userSchema);
