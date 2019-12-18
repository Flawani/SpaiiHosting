const { RichEmbed } = require("discord.js");

module.exports = {
    name: "roles",
    aliases: ["roles", "r"],
    category: "info",
    descripton: "Mówi twój wkład przez bota",
    usage: "<wkład>",
    run: async (client, message, args) => {

        await message.delete().catch(O_o=>{});

        const a = message.guild.roles.get('656853661653270567'); // Zweryfikowny
        const b = message.guild.roles.get('619581619614908417'); // ⚡️WIDZ⚡️
        const c = message.guild.roles.get('656854366275371030'); // Role
    
        const filter = (reaction, user) => ['🙌🏻', '👏🏻', '🙏🏻'].includes(reaction.emoji.name) && user.id === message.author.id;
    
        const embed = new RichEmbed()
            .setTitle('Dostępne role')
            .setDescription(`
            
            🙌🏻 ${a.toString()}
            👏🏻 ${b.toString()}
            🙏🏻 ${c.toString()}
    
            `)
            .setColor(0xdd9323)
            .setFooter(`ID: ${message.author.id}`);
            
        message.channel.send(embed).then(async msg => {
    
            await msg.react('🙌🏻');
            await msg.react('👏🏻');
            await msg.react('🙏🏻');
    
            msg.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
    
                const reaction = collected.first();
    
                switch (reaction.emoji.name) {
                    case '🙌🏻':
                        if (message.member.roles.has(a.id)) {
                            msg.delete(2000);
                            return message.channel.send('Jesteś już w tej roli!').then(m => m.delete(3000));
                        }
                        message.member.addRole(a).catch(err => {
                            console.log(err);
                            return message.channel.send(`Błąd podczas dodawania Cię do tej roli: **${err.message}**.`);
                        });
                        message.channel.send(`Dostałeś role: **${a.name}** `).then(m => m.delete(3000));
                        msg.delete();
                        break;
                    case '👏🏻':
                        if (message.member.roles.has(b.id)) {
                            msg.delete(2000);
                            return message.channel.send('Jesteś już w tej roli!').then(m => m.delete(3000));
                        }
                        message.member.addRole(b).catch(err => {
                            console.log(err);
                            return message.channel.send(`Błąd podczas dodawania Cię do tej roli: **${err.message}**.`);
                        });
                        message.channel.send(`Dostałeś role: **${b.name}** `).then(m => m.delete(3000));
                        msg.delete();
                        break;
                    case '🙏🏻':
                        if (message.member.roles.has(c.id)) {
                            msg.delete(2000);
                            return message.channel.send('Jesteś już w tej roli!').then(m => m.delete(3000));
                        }
                        message.member.addRole(c).catch(err => {
                            console.log(err);
                            return message.channel.send(`Błąd podczas dodawania Cię do tej roli: **${err.message}**.`);
                        });
                        message.channel.send(`Dostałeś role: **${c.name}** `).then(m => m.delete(3000));
                        msg.delete();
                        break;
                }
            }).catch(collected => {
                return message.channel.send(`Nie mogłem dodać cię do tej roli!`);
            });
    
        });
    

    }
};