module.exports = {
    name: "ping",
    category: "info",
    descripton: "Powraca opóźnienie i ping API",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Ping...`);

        msg.edit(`Pong\nCzas oczekiwania **${Math.floor(msg.createdAt - message.createdAt)}**\nOpóźnienie interfejsu API **${Math.round(client.ping)}**ms`);
    }
}