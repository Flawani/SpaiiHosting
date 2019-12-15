const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["pne", "nadawanie"],
    category: "moderation",
    descripton: "Mówi twój wkład przez bota",
    usage: "<wkład>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("nic do powiedzenia?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}