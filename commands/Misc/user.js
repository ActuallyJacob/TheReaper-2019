const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'user',
            enabled: true,
            runIn: ['text', 'dm'],
            aliases: ['me', 'userinfo'],
            permissionLevel: 0,
            requiredSettings: [],
            description: 'Get information on a user.',
            usage: '[Member:member]',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [member = message.member]) {
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
        var statuses = {
            online: '💚 Online',
            idle: '💛 Idle',
            dnd: '❤ Do Not Disturb',
            offline: '💔 Offline'
        };
            
        const meEmbed = new Discord.MessageEmbed()
        .setTitle(member.user.username)
        .setColor(0x9900FF)
        .setFooter("Sent via TheReaper")
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .addField("ID", member.user.id, true)
        .addField('Status', statuses[member.presence.status], true)
        .addField('Playing', member.presence.activity ? member.presence.activity.name : 'N/A', true)
        .addField("Bot", member.user.bot, true)
        .addField("Registered", member.user.createdAt)
        message.channel.send({
            embed: meEmbed
        });
    }
}
