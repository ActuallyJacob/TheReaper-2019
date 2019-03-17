const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'purge',
            enabled: true,
            runIn: ['text'],
            aliases: ['delete'],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Deletes messages in bulk.',
            usage: '[amount:int{1}]',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [amount]) {
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

        const purgeEmbed = new Discord.MessageEmbed()
        .setAuthor("TheReaper Moderation")
        .addField("Purged chat", `${message.channel.name}`)
        .addField("Moderator", `${sender.username} (${sender.tag})`)
        .setFooter("Sent via TheReaper")
        .setThumbnail(sender.displayAvatarURL())
        .setColor(0x9900FF);

        if (amount <= 0) {
            return message.reply('Pick a number. 1-100. *Now try again you fool*')
        }
        if (amount > 100) {
            return message.reply("❌ I can only purge up to 100 messages at a time! **(I'm not GOD)**")
        }
        if (amount >= 1 && amount <= 100) {
            message.channel.bulkDelete(amount)
            message.channel.send(`☑ Purged ${amount} message(s) from ${message.channel.name}`)
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: purgeEmbed
                }).catch(err => console.log(err));
            }
        }
    }
};