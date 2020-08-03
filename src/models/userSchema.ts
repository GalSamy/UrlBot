import mongoose from 'mongoose'

// @ts-ignore
const userSchema : mongoose.Schema = mongoose.Schema({
    codesAmount : Number,
    userId : String,
    premium : Boolean
});

module.exports = mongoose.model("userDocs", userSchema);