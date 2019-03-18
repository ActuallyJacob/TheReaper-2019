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
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['sortation', 'sortationChannel'],
            description: 'This accepts the rules given to a member when they join.',
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
        const sender = message.author;
        //
        const config = require('../config.json')
        /////////////////////////////////////////

        const rulesChannel = server.channels.get(settings.rulesChannel);
        if(message.channel.id === rulesChannel){
            message.delete().catch(O_o=>{});
            let rMember = guildMember.user.id
            var role = server.roles.find(role => role.id === settings.sortation);
            guildMember.roles.add(role);
            message.reply("The Reaper welcomes you to the family.")
            if(server.id === config.myGuild){
            server.channels.find(channel => channel.id === settings.sortationChannel).send (`<@${rMember}> Is in the sorting room! The Reaper requests you state your Xbox gamertag and Timezone. Additionally, if you have any questions for the Admin team before completing the sorting process and being removed from this channel, please let us know :smiley:`)
            .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. We grow.`)))
            .catch(console.error(chalk.red));
            }
            else(server.channels.find(channel => channel.id === settings.sortationChannel).send (`<@${rMember}> Is in the sorting room!`))
            .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. We grow.`)))
            .catch(console.error(chalk.red));
            }
            else{
                return;
            }
            const accEmbed = new Discord.MessageEmbed()
			.setAuthor("TheReaper Moderation")
			.addField("Accepted Rules", `${sender.username} (${sender.tag})`)
			.setFooter("Sent via TheReaper")
			.setThumbnail(sender.displayAvatarURL())
			.setColor(0x9900FF);
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: accEmbed
                }).catch(err => console.log(err));
            }
            else{
                return;
            }
        }
    }
    
