const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'role',
            enabled: true,
            runIn: ['text'],
            aliases: ['setrole'],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Give or take a user role.',
            usage: '<member:@member> [role:@role]',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [role]) {
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

        //Get first mentioned member
        let rMember = server.member(message.mentions.users.first())
        server.members.get(rMember);
        if(!rMember) return message.reply("The Reaper could not find that user. `Attempt again.`");
        //this is for the embeds
        const user = message.mentions.users.first();

        //Get first mentioned role
        let gRole = message.mentions.roles.first();
        server.roles.get(gRole);
        if(!gRole) return message.reply("The Reaper could not locate the requested role/one was not established. `Attempt again.`");
        //this is for the embeds
        const role = message.mentions.roles.first();

        //My guild only
        let fRole = server.roles.find("name", "Sorting Room");
        if(rMember.roles.has(fRole.id)){
          await(rMember.removeRole(fRole.id));
        }
        
        //Remove role from user if they have it already
        if(rMember.roles.has(gRole.id)){
          await(rMember.removeRole(gRole.id));
          message.channel.send(`<@${rMember.id}> The Reaper has been sent to tell you that you no longer have the role of ${gRole.name} Contact an admin if you wish to enquire.`)
          //Removed role embed
          const rRoleEmbed = new Discord.MessageEmbed()
          .setAuthor("TheReaper Moderation")
          .addField("Un-Roled User", `${user} (${user.tag})`)
          .addField("Moderator", `${sender} (${message.member.user.tag})`)
          .addField("Role", role)
          .setFooter("Sent via TheReaper")
          .setThumbnail(user.displayAvatarURL())
          .setColor(0x9900FF);
          
          message.channel.send({
              embed: rRoleEmbed
            });
            
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: rRoleEmbed
                }).catch(err => console.log(err));
            }
        }
        
        //Add role if they don't have it
        else{
          await(rMember.addRole(gRole.id));
          var channel = server.channels.find("name", "the-reaper")
          channel.send(`<@${rMember.id}> The Reaper has been sent to tell you that you now have the role of ${gRole.name}. Do not abuse your newfound power.`)
          .catch((err) => {
            message.react('❌');
            message.channel.send(err.message);
        })
        //Add role embed
        const aRoleEmbed = new Discord.MessageEmbed()
          .setAuthor("TheReaper Moderation")
          .addField("Roled User", `${user} (${user.tag})`)
          .addField("Moderator", `${sender} (${message.member.user.tag})`)
          .addField("Role", role)
          .setFooter("Sent via TheReaper")
          .setThumbnail(user.displayAvatarURL())
          .setColor(0x9900FF);
          
          message.channel.send({
              embed: aRoleEmbed
            });
            
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: aRoleEmbed
                }).catch(err => console.log(err));
            }
        };
    };
};