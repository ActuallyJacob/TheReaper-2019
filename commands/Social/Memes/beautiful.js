const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'beautiful',
            enabled: true,
            runIn: ['text', 'dm'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            description: 'Get a beautiful image.',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
    /*
    *Pre-requisits
    */
    /////////////////////////////////////////
    var server = message.guild;
    //
    var channel = message.channel.id
    //
    const settings = server.settings;
    //
    const Discord = require ("discord.js");
    //
    const MessageEmbed = require("discord.js");
    //
    const MessageAttachment = require("discord.js");
	//
    const sender = message.author.username;
    /////////////////////////////////////////
    if(channel !=(settings.roastMemeChannel)){
        return channel.send(`The Reaper says you can only use this command in ${settings.roastMemeChannel}.`)
    }

        if (message.mentions.users.size >= 1) {
            var target = message.mentions.users.first()
        } else {
            var target = message.author;
        }

        let message
        message = await message.channel.send(`<a:loading:417323455147540490> Wow, **${target.username}** is about to get painted...`);

        await message.channel.send(new MessageAttachment(
            await this.client.idiotAPI.beautiful(target.displayAvatarURL({
                format: "png",
                size: 128
            })),
            "beautiful.png"));


        await message.delete();
    }
};