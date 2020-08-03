
import mongoose from 'mongoose'
// @ts-ignore
const urlSchema : mongoose.Schema= mongoose.Schema({
    code : String,
    baseUrl : String,
    pointerUrl : String,
    user : String,
    views : Number
});

module.exports = mongoose.model("urlDocs", urlSchema);