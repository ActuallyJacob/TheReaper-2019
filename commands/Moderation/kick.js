const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'kick',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            requiredPermissions: ['KICK_MEMBERS'],
            description: 'Kicks a user from the server.',
            usage: '<member:@member>',
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
        const sender = message.author.username;
        /////////////////////////////////////////

        //Do the standard user checks
        const person = message.content.replace(settings.prefix, "").split(" ").slice(1)
        var reason = message.content.replace(settings.prefix, "").replace(person[0], "").replace('kick ', "")

        if (message.mentions.users.size == 0) return message.reply("The Reaper requires a specified user. **So do it**");
        const user = message.mentions.users.first();
        if (user === this.client.id) return message.reply("I'm hurt.");
        if (user === message.member) return message.reply("Are you mad? **You can't kick yourself.** *-Reaper*");
        if (user === server.owner) return message.reply("I have stopped you from starting a military uprising, **you can't kick the server owner!**");
        if (user.kickable == false) return message.reply("I can't kick that guy! He's too powerful! *-Reaper*");

        //and then kick
        await server.members.get(user.id).kick(sender.tag + " kicked via TheReaper").catch(err => {
            return message.reply("Can't kick that one. try again?"), console.log(err);
        });

        if (reason == ""){
            reason = 'undefined'
        }

        //kick embed
        const kickEmbed = new Discord.MessageEmbed()
            .setAuthor("TheReaper Moderation")
            .addField("Kicked User", `${user} (${user.tag})`)
            .addField("Moderator", `${sender}`)
            .addField("Reason", reason)
            .setFooter("Sent via TheReaper")
            .setThumbnail(user.displayAvatarURL())
            .setColor(0x9900FF);

        if (settings.modLog != null) {
            var modLog = server.channels.get(settings.modLog)
            modLog.send({
                embed: kickEmbed
            }).catch(err => console.log(err));
        }
    }
};