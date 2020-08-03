// @ts-ignore
import urlSchema from "../models/urlSchema"


import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/urlBot",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongoDB")
}).catch(err => console.log(err))
module.exports = {
   gen : () => {
        'use strict';

        let chars: string = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

            serialLength: number = 5,

            randomSerial: string = "",

            i: number,

            randomNumber: number;

        for (i = 0; i < serialLength; i = i + 1) {

            randomNumber = Math.floor(Math.random() * chars.length);

            randomSerial += chars.substring(randomNumber, randomNumber + 1);

        }

        return randomSerial;
    }
}
