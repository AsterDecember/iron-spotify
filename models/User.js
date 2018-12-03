const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username : String,
  email    : String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.statics.findOrCreate = function findOrCreate(profile, cb){
    var userObj = new this();
    this.findOne({_id : profile.id},function(err,result){
        if(!result){
            userObj.username = profile.displayName;
            //....
            userObj.save(cb);
        }else{
            cb(err,result);
        }
    });
};
const User = mongoose.model('User', userSchema);
module.exports = User;
