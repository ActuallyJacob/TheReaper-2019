const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'list',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Lists everyone in a role.',
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
        const sender = message.author.username;
        /////////////////////////////////////////

        let lRole = message.mentions.roles.first();
        if(!lRole){
            return message.reply ("The Reaper requests a role. **So do it**");
        }
        else{
            const listEmbed = new Discord.MessageEmbed()
            .setTitle(`Members with the ${lRole.name} role:`)
            .setDescription(server.roles.get(lRole.id).members.map(m=>m.user.tag).join('\n'));
            message.channel.send(listEmbed)
            .catch((err) => {
                message.react('❌');
                message.channel.send(err.message);
            });        
        };
    };
};