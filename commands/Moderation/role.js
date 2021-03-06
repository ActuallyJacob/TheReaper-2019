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
            requiredPermissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
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
        const sender = message.author;
        /////////////////////////////////////////

        //Get first mentioned member
        let rMember = server.member(message.mentions.users.first())
        server.members.get(rMember);
        if(!rMember) return message.reply("The Reaper could not find that user. `Attempt again.`");
        //this is for the embeds
        const user = message.mentions.users.first();

        //Get first mentioned role
        const gRole = message.mentions.roles.first();
        server.roles.get(gRole);
        if(!gRole) return message.reply("The Reaper could not locate the requested role/one was not established. `Attempt again.`");
        //this is for the embeds

        //My guild only
        let fRole = server.roles.find(role => role.name === "Sorting Room");
        if(rMember.roles.has(fRole.id)){
          await(rMember.roles.remove(fRole.id));
        }
        
        //Remove role from user if they have it already
        if(rMember.roles.has(gRole.id)){
          await(rMember.roles.remove(gRole.id))
          .catch((err) => {
            message.react('❌');
            message.channel.send(err.message);
        });
          
          //Removed role embed
          const rRoleEmbed = new Discord.MessageEmbed()
          .setAuthor("TheReaper Moderation")
          .addField("Un-Roled User", `${user} (${user.tag})`)
          .addField("Moderator", `${sender.username} (${sender.tag})`)
          .addField("Role", `${gRole}`)
          .setFooter("Sent via TheReaper")
          .setThumbnail(user.displayAvatarURL())
          .setColor(0x9900FF);
            
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: rRoleEmbed
                }).catch(err => console.log(err));
            }
        }
        
        //Add role if they don't have it
        else{
          await(rMember.roles.add(gRole.id))
          .catch((err) => {
            message.react('❌');
            message.channel.send(err.message);
        });
        //Add role embed
        const aRoleEmbed = new Discord.MessageEmbed()
          .setAuthor("TheReaper Moderation")
          .addField("Roled User", `${user} (${user.tag})`)
          .addField("Moderator", `${sender.username} (${sender.tag})`)
          .addField("Role", `${gRole}`)
          .setFooter("Sent via TheReaper")
          .setThumbnail(user.displayAvatarURL())
          .setColor(0x9900FF);
            
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: aRoleEmbed
                }).catch(err => console.log(err));
            }
            else{
                message.channel.send({
                    embed: aRoleEmbed
                });
            }
        };
    };
};