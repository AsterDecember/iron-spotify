const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    displayName : String,
    email       : String,
    id          : String,
    external_urls : String,
    uri : String,
    country : String,
    product : String,
    refreshToken : String,
    accessToken : String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.statics.findOrCreate = function findOrCreate(profile, cb){
    var userObj = new this();
    this.findOne({id : profile.profile.id},function(err,result){
        if(!result){
            userObj.displayName = profile.profile.displayName;
            userObj.email = profile.profile.email;
            userObj.id = profile.profile.id;
            userObj.external_urls = profile.profile.external_urls;
            userObj.country = profile.profile.country;
            userObj.uri = profile.profile.uri;
            userObj.product = profile.profile.product;
            userObj.accessToken = profile.accessToken
            userObj.refreshToken = profile.refreshToken
            //console.log("producto",profile.profile)
            //console.log("obkj",userObj)
            //....
            userObj.save(cb);
        }else{
            cb(err,result);
        }
    });
};
const User = mongoose.model('User', userSchema);
module.exports = User;
