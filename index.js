const { Client, RichEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");


const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



client.on("ready", () => {
    console.log(`Jestem Gotowy, nazywam się ${client.user.username}`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "Jestem w fazie tworzenia!",
            type: "WATCHING"
        }
    })
});

client.on ("guildMemberAdd", member => {

    var role = member.guild.roles.find ("name", "Test");
    member.addRole (role);
});

client.on ("guildMemberRemove", member => {

});

client.on("message", async message => {
    const prefix = "_";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});


client.login(process.env.TOKEN);