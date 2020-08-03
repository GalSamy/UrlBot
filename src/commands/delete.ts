import mongoose from "mongoose"
// @ts-ignore
import {Message, MessageEmbed} from "discord.js";
// @ts-ignore
import userSchema from "../models/userSchema"
// @ts-ignore
import urlSchema from "../models/urlSchema"

mongoose.connect("mongodb://localhost:27017/urlBot",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to mongoDB")
}).catch(err => console.log(err))

module.exports = {
    async execute(message : Message){
        const user = await userSchema.findOne({userId : message.author.id})
        if(user) {
            const args: string[] = message.content.slice("-delete".length).split(' ');
            console.log(args[1])
            const url = await urlSchema.findOne({pointerUrl: args[1]})
            if (url) {
                if (url.user === user.userId) {
                    user.codesAmount--;
                    const embed = new MessageEmbed()
                        .setColor("#ecff48")
                        .setTitle("Url deleted successfully!")
                        .setDescription(`${url.pointerUrl} **t ox** ${url.baseUrl}`)
                        .setTimestamp();
                    await message.channel.send(embed)
                    url.delete();
                } else {
                    const embed = new MessageEmbed()
                        .setColor("#f30f0f")
                        .setTitle("Error : ")
                        .setDescription('seems like you didn\'t create this link')
                    await message.channel.send(embed)
                }
            } else{
                const embed = new MessageEmbed()
                    .setColor("#f30f0f")
                    .setTitle("Error : ")
                    .setDescription('url is not valid!')
                await message.channel.send(embed)
            }
            }else {
            const embed = new MessageEmbed()
                .setColor("#f30f0f")
                .setTitle("Error : ")
                .setDescription('you are not defined as a user! please type -create')
            await message.channel.send(embed)
        }
    }
}