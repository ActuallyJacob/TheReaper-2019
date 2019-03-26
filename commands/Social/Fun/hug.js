const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'hug',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            aliases: ['hugs'],
            permissionLevel: 0,
            description: 'Give someone a nice, big hug!',
            usage: '<user:user>',
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
        const sender = message.author.username;
        /////////////////////////////////////////

        if (message.content.startsWith(settings.prefix + "hugs ")) {
            var who = message.content.replace(settings.prefix + "hugs ", "")
        }
        if (message.content.startsWith(settings.prefix + "hug ")) {
            var who = message.content.replace(settings.prefix + "hug ", "")
        }
        if (who == undefined) {
            return message.reply('Who you wanna hug?')
        } else {
            message.channel.send(`${sender}` + " gave " + who + " a nice, big, hug!");
        }
    }
};