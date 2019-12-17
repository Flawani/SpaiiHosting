const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "moderation",
    descripton: "Tworzy Ankiete",
    usage: "<prefiks> pytanie ankiety",
    run: async (client, message, args, tools) => {

        if(!message.member.roles.find(r => r.name === 'Ankieta')) return message.channel.send('wymaga to roli: Ankieta');

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Wymaga to pozwolenia: ADMINISTRATOR');

        if(!args[0]) return message.channel.send('Poprawne użycie: <prefiks> pytanie ankiety');

        const embed = new RichEmbed()
            .setColor(0xffffff)
            .setFooter('Reaguj, aby głosować.')
            .setDescription(args.join(' '))
            .setTitle(`Ankieta Utwórz przez ${message.author.username}`);

        let msg = await message.channel.send(embed);

        await msg.react('✔️');
        await msg.react('❌');

        message.delete({timeout: 1000});

    }
}