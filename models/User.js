const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    displayName : {
        type: String,
        required: true
    },
    email       : String,
    id          : {
        type: String,
        required: true
    },
    external_urls : String,
    uri : String,
    country : String,
    product : String,
    refreshToken : {
        type: String,
        required: true
    },
    accessToken : {
        type: String,
        required: true
    },
    photoUrl : {
        type: String,
        required: true
    },
    playlists:[
        {
            type:Schema.Types.ObjectId,
            ref:'Playlist'
        }
    ]
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
            userObj.photoUrl = profile.profile.photos[0]
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
