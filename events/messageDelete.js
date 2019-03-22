const { Event } = require('klasa');

module.exports = class extends Event {

	run(messageDelete) {
        if (this.client.ready) this.client.monitors.run(messageDelete);
        /////////////////////////////////////////////////////////////////////////////////
        const guildMember = messageDelete.member;
        //
        const avatar = messageDelete.member.user.displayAvatarURL();
        //
        let server = messageDelete.guild;
        //
        const settings = server.settings;
        //
        let reaperRole = server.roles.find(role => role.name === "The Reaper");
        //
        const reaperID = reaperRole.id;
        //
        const sender = messageDelete.author;
        //
        const Discord = require ("discord.js");
        //
        const config = require('../config.json');
        //
        const channel = messageDelete.channel.name;
        //
        const chalk = require('chalk');
        /////////////////////////////////////////////////////////////////////////////////
        
        if(!messageDelete.channel.name === 'roll-call'){
            const msgDelEmbed = new Discord.MessageEmbed()
            .setAuthor("TheReaper Moderation")
            .addField("Deleted Message", messageDelete)
            .addField("Sent by", `${sender.username} (${sender.tag})`)
            .addField("From Channel", `${channel}`)
            .setFooter("Sent via TheReaper")
            .setThumbnail(avatar)
            .setColor(0x9900FF)
            .setTimestamp();

            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: msgDelEmbed
                })
            .then(console.log(chalk.green(`${sender.username} Just Deleted a Message in ${server}`)))
            .catch(console.error(chalk.red));
            }
        }
    }
};