// @ts-ignore
import express from "express"
// @ts-ignore
import urlSchema from "./models/urlSchema"

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/urlBot",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongoDB")
}).catch(err => console.log(err))

const app = express()
app.get('/', function (req : any, res : any) {
    res.send('coming soon')
})

app.get('/:code', async function (req : any, res : any) {
    const code = req.params.code
    console.log(code)
    const url = await urlSchema.findOne({code : code})
    if(url) {
        const target = url.baseUrl;

        res.redirect(target)
        url.views++;
        return;
    }else if (code != "error"){
        console.log("does not exists")
        res.redirect("http://localhost:3000/error/notexists")
        return;
    }
})

app.get('/error/notexists', function (req : any, res : any) {
    res.send("error : url does not exists")
})

app.listen(3000, console.log("listening on port 3000"))