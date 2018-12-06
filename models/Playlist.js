const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        name: {
            type:String,
            enum:["peda","workout","tranqui"]
        },
        genres: [String],
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);


module.exports = mongoose.model("Playlist", playlistSchema);