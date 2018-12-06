const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        spotifyId: {
            type:String,
            required:true
        },
        userId:String
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);


module.exports = mongoose.model("Playlist", playlistSchema);