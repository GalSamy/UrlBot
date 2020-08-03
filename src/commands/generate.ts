import mongoose from "mongoose"
// @ts-ignore
import {Message, MessageEmbed} from "discord.js";
// @ts-ignore
import serial from "../utils/serial"
// @ts-ignore
import urlExists from "url-exists"
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

// @ts-ignore
import createUrl from "../utils/createUrl"

// @ts-ignore
exports.default =
    {
        name: 'test',
        description: "test",
        // @ts-ignore
        async execute(message : Message) {

            const user = await userSchema.findOne({userId : message.author.id})
            if(user) {

                const args: string[] = message.content.slice("-gen".length).split(' ');

                // @ts-ignore
                await urlExists(args[1], async (err: any, exists: any) => {
                    if (err)
                        console.log(err)

                    if (exists) {
                        const code: string = serial.gen();
                        const final: string = `localhost:3000/${code}`
                        console.log(code);
                        await createUrl.createUrl(code, args[1], final, message.author.id, 0)
                        const url = await urlSchema.findOne({code: code})
                        user.codesAmount++;
                        const embed = new MessageEmbed()
                            .setColor("#ecff48")
                            .setTitle("Url created successfully!")
                            .setDescription(`${url.pointerUrl} -> ${url.baseUrl}`)
                            .setTimestamp();
                        await message.channel.send(embed)
                    } else {
                        const embed = new MessageEmbed()
                            .setColor("#f30f0f")
                            .setTitle("Error : ")
                            .setDescription('url is not valid!\n\n*tip :* make sure to add "https://" before the link if you haven\'t! )')
                        await message.channel.send(embed)
                    }
                })
            }else{
                const embed = new MessageEmbed()
                    .setColor("#f30f0f")
                    .setTitle("Error : ")
                    .setDescription('you are not defined as a user! please type -create')
                await message.channel.send(embed)
            }
        }
    };