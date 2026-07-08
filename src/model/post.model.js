const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image : {
        type: String,
        required : true
    },
    caption : {
        type: String,
        required : true
    }
})


// collection ka naam "post" hoga aur uska schema postSchema hoga
const postModel = mongoose.model("post", postSchema)

module.exports = postModel ;