const {
	Event
} = require('klasa');
const config = require('../config.json');
const Discord = require('discord.js');

module.exports = class extends Event {

	run(member) {
        /////////////////////////////////////////////////////////////////////////////////
        const avatar = member.user.displayAvatarURL();
        //
        let server = member.guild;
        //
        const settings = server.settings;
        //
        const Discord = require ("discord.js");
        /////////////////////////////////////////////////////////////////////////////////
        var memberRemoveEmbed = new Discord.MessageEmbed()
        .setAuthor("TheReaper Moderation")
        .addField("Member Left the Server", `${member}`)
        .setFooter("Sent via TheReaper")
        .setThumbnail(avatar)
        .setColor(0x9900FF)
        .setTimestamp();
        
        if (settings.modLog != null) {
            var modLog = server.channels.get(settings.modLog)
            modLog.send({
                embed: memberRemoveEmbed
            })
        }
    }
}