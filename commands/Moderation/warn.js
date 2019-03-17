const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'warn',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Warns a user in the server.',
            usage: '<member:member> [reason:...string]',
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
        const settings = server.settings;
		//
        const Discord = require ("discord.js");
        //
        const MessageEmbed = require("discord.js");
		//
        const sender = message.author;
        /////////////////////////////////////////

        //start checking if they did the command right
        const person = message.content.replace(settings.prefix, "").split(" ").slice(1)
        var reason = message.content.replace(settings.prefix, "").replace(person[0], "").replace('warn ', "")

        if (message.mentions.users.size == 0) return message.reply("The Reaper requires a specified user. **So do it**");
        const user = message.mentions.users.first();

        if (user === message.member) return message.reply("You're a few fries short of a Happy Meal. You cant warn yourself. Lol *-Reaper*");
        if (user === server.owner) return message.reply("You can't warn the server owner bruh...");

        if (reason == "") {
            reason = 'undefined'
        }

        //do the warn embed
        const warnEmbed = new Discord.MessageEmbed()
            .setAuthor("TheReaper Moderation")
            .addField("Warned User", `${user} (${user.tag})`)
            .addField("Moderator", `${sender.username} (${sender.tag})`)
            .addField("Reason", reason)
            .setFooter("Sent via TheReaper")
            .setThumbnail(user.displayAvatarURL())
            .setColor(0x9900FF);

        message.channel.send({
            embed: warnEmbed
        });

        if (settings.modLog != null) {
            var modLog = server.channels.get(settings.modLog)
            modLog.send({
                embed: warnEmbed
            }).catch(err => console.log(err));
        }
    }
};