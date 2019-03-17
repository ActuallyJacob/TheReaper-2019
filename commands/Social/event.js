const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'event',
            enabled: false,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['commandChannel'],
            description: 'Create an event.',
            usage: '?event'
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
        const sender = message.author;
        //
        const memberavatar = message.member.user.avatarURL
        /////////////////////////////////////////

        var setup = new Discord.MessageEmbed()
        .setTitle(":calendar: | Welcome to the event creation wizard.")
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField("Title: ")
        .addField("Description: ")
        .addField("Date and Time:")
        .addField("People required: ")
        .addField(":microphone2: | Please start by telling me the name of your event.")
        .setTimestamp()
        .setFooter("©TheReaper")

    sender.send(setup)

        //TODO: message collector
    }
};