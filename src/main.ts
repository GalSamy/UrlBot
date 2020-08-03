import Discord, {MessageEmbed} from "discord.js"
import config from "./config.json"
// @ts-ignore
import generate from "./commands/generate"
// @ts-ignore
import Delete from "./commands/delete"

const Client : Discord.Client = new Discord.Client();

// @ts-ignore
import createUser from "./utils/createUser"
// @ts-ignore
import userSchema from "./models/userSchema"

Client.on("ready", () => {
console.log("ready");
})

Client.on("message", async message => {
    // @ts-ignore
    if(message.content.startsWith('-gen'))
        generate.execute(message)
    if(message.content === '-create') {
        const user = await userSchema.findOne({userId: message.author.id})

        if (!user) {
            createUser.createUser(0, message.author.id, false);
            const embed = new MessageEmbed()
                .setColor("#ecff48")
                .setTitle("user created!")
                .setDescription('you can now use ``-gen [link]`` to create a shorter url!')
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp();
            await message.channel.send(embed)
        }else{
            const embed = new MessageEmbed()
                .setColor("#f30f0f")
                .setTitle("Error : ")
                .setDescription('you are already a user!\n\n *tip :* if you created a user in a different server you don\'t need to create a new one')
            await message.channel.send(embed)
        }
    }
    if(message.content.startsWith("-delete"))
        Delete.execute(message)

})


Client.login(config.token).catch(err => console.log(err))