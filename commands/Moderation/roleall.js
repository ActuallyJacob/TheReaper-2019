const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'roleall',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Gives all users a role.',
            usage: '[role:@role]',
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
        const sender = message.author.username;
        /////////////////////////////////////////
        
        //Get the role
        let gRole = message.mentions.roles.first();
        if(!gRole) return message.reply("The Reaper could not locate the requested role/none was established. `Attempt again.`" + `\n**Attempted role:** ${gRole}`);
          
        //Filter out the bots and admins and then add the role
        const aRole = server.roles.find(role => role.name === settings.admin);
        if (!aRole){
            console.log(`!! NO '${settings.admin}' ROLE FOUND !!`)
            return message.channel.send(`NO ${settings.admin} ROLE FOUND. PLEASE CORRECT BEFORE CONTINUING.`);
        }
        server.members.filter(message => !message.user.bot && !message.member.aRole)
        .map(async member => await member.addRole(gRole));

        //Send confirmation
        message.channel.send(`**${sender.username}**, role **${gRole.name}** was added to all members`)
        
        //modlog embed
        const roleallEmbed = new Discord.MessageEmbed()
        .setAuthor("TheReaper Moderation")
        .addField("Roled All users")
        .addField("Moderator", `${sender} (${message.member.user.tag})`)
        .addField("Role", gRole)
        .setFooter("Sent via TheReaper")
        .setThumbnail(user.displayAvatarURL())
        .setColor(0x9900FF);
        
        message.channel.send({
            embed: roleallEmbed
        });
        if (settings.modLog != null) {
            var modLog = server.channels.get(settings.modLog)
            modLog.send({
                embed: roleallEmbed
            }).catch((err) => {
                message.react('❌');
                message.channel.send(err.message);
            });
        };
    };
};