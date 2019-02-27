const {
    Command
} = require('klasa');

const Discord = require ('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'serverInfo',
            enabled: true,
            runIn: ['text'],
            deletable: false,
            bucket: 1,
            aliases: ['server', 'guild'],
            permissionLevel: 0,
            requiredSettings: ['commandChannel'],
            description: 'Shows information about the server you are in.',
            extendedHelp: 'No extended help available.'
        });
        this.verificationLevels = [
            'None',
            'Low',
            'Medium',
            '(╯°□°）╯︵ ┻━┻',
            '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        ];
        this.filterLevels = [
            'Off',
            'No Role',
            'Everyone'
        ];
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
        const sender = message.author.username;
        /////////////////////////////////////////
        if(channel !=(settings.commandChannel)){
            return message.reply(`Please use this command in ${settings.commandChannel}.`)
        }
        else{
        const {
            MessageEmbed
        } = require('discord.js');
        if (message.guild.iconURL = null) {
            var iconURL = "https://newagesoldier.com/wp-content/uploads/2016/12/masbot.png";
        } else {
            var iconURL = message.guild.iconURL;
        }

        const serverEmbed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setColor(0x9900FF)
            .setFooter("Sent via TheReaper")
            .setThumbnail(iconURL)
            .setTimestamp()
            .addField("Server ID", message.guild.id)
            .addField("Region", message.guild.region, true)
            .addField("Owner", message.guild.owner, true)
            .addField("Member Count", `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
            .addField("Roles", message.guild.roles.size, true)
            .addField("Channels", message.guild.channels.size, true)
            .addField('Explicit Filter', this.filterLevels[message.guild.explicitContentFilter], true)
            .addField('Verification Level', this.verificationLevels[message.guild.verificationLevel], true)
            .addField("Created At", message.guild.createdAt)
            .addField("Joined Server At", message.guild.joinedAt)

        message.channel.send({
            embed: serverEmbed
        });
    }}
}; 