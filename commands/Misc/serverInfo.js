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
        const sender = message.author.username;
        /////////////////////////////////////////
        if(channel !=(settings.commandChannel)){
            return message.reply(`Please use this command in ${settings.commandChannel}.`)
        }
        else{
        const {
            MessageEmbed
        } = require('discord.js');
        if (server.iconURL = null) {
            var iconURL = "https://newagesoldier.com/wp-content/uploads/2016/12/masbot.png";
        } else {
            var iconURL = server.iconURL;
        }

        const serverEmbed = new MessageEmbed()
            .setTitle(server.name)
            .setColor(0x9900FF)
            .setFooter("Sent via TheReaper")
            .setThumbnail(iconURL)
            .setTimestamp()
            .addField("Server ID", server.id)
            .addField("Region", server.region, true)
            .addField("Owner", server.owner, true)
            .addField("Member Count", `${server.memberCount - server.members.filter(m=>m.user.bot).size} (${server.members.filter(m=>m.user.bot).size} bots)`, true)
            .addField("Roles", server.roles.size, true)
            .addField("Channels", server.channels.size, true)
            .addField('Explicit Filter', this.filterLevels[server.explicitContentFilter], true)
            .addField('Verification Level', this.verificationLevels[server.verificationLevel], true)
            .addField("Created At", server.createdAt)
            .addField("Joined Server At", server.joinedAt)

        message.channel.send({
            embed: serverEmbed
        });
    }}
}; 