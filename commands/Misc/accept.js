const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'accept',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            permissionLevel: 0,
            requiredSettings: ['rulesChannel'],
            description: 'Accepts the rules.',
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
        if(channel !=(settings.rulesChannel)){
            return;
        }
        else{
            message.delete().catch(O_o=>{});
            let rMember = message.member.user.id
            var guildMember = message.member;
            var role = message.guild.roles.find("name", "Sorting Room");
            guildMember.addRole(role);
            message.reply("The Reaper welcomes you to the family.")
            message.guild.channels.find("name", "sorting-room")
            .send (`<@${rMember}> Is in the sorting room! The Reaper requests you state your Xbox gamertag and Timezone. Additionally, if you have any questions for the Admin team before completing the sorting process and being removed from this channel, please let us know :smiley:`)
            .catch((err) => {
                message.react('❌');
                message.channel.send(err.message);
            });
        }
    }
};