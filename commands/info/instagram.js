const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "info",
    description: "Znajdź fajne statystyki na Instagramie",
    usage: "<name>",
    run: async (client, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.reply("Może warto poszukać kogoś ...!")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        
        let res; 

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.reply("Nie mogłem znaleźć tego konta ... :(")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Informacje o Profilu", stripIndents`**- Nazwa Użytkownika:** ${account.username}
            **- Pełne imię i nazwisko:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? "Żaden" : account.biography}
            **- Posty:** ${account.edge_owner_to_timeline_media.count}
            **- Obserwujący:** ${account.edge_followed_by.count}
            **- Following:** ${account.edge_follow.count}
            **- Prywatne konto:** ${account.is_private ? "Tak 🔐" : "nie 🔓"}`);

        message.channel.send(embed);
    }
}