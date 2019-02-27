/*
const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'event',
            enabled: false,
            runIn: ['text'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Create an event.',
            quotedStringSupport: false,
            usage: '?event',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
        const Discord = require('discord.js')
        const memberavatar = message.member.user.avatarURL
        const settings = message.guild.settings
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

    message.author.send(setup)

        //TODO: message collector
    }
};
*/