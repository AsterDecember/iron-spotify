const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
        name: String,
        id: String,
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);


module.exports = mongoose.model("Artist", artistSchema);