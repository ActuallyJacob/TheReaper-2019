const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'rollcall',
            enabled: true,
            runIn: ['text'],
            aliases: [],
            bucket: 1,
            permissionLevel: 6,
            requiredSettings: ['admin', 'modLog'],
            description: 'Gives all users the "Roll Call" role and creates a roll-call channel in the category "Reaper Rooms"',
            usage: '',
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
        const sender = message.author;
        /////////////////////////////////////////

        //addRole for roll call role
        let addRole = server.roles.find(role => role.name === 'Roll Call');
        if (!addRole){
            message.channel.send(`**${sender}**, "Roll Call" role not found. Creating now...`);
            addRole = server.roles.create({
                data: {
                    name: 'Roll Call',
                    color: '#36393f',
                },
                reason: 'Missing the required role.'
            })
            .then(console.log)
            .catch(console.error)
            return message.channel.send(`"Roll Call" role created. Try the command again.`)
        };

        //aRole for admin role
        const aRole = server.roles.find(role => role.id === settings.admin);
        if (!aRole){
            console.log(`!! NO '${settings.admin}' ROLE FOUND !!`)
            return message.channel.send(`**FATAL: NO ${settings.admin} ROLE FOUND. PLEASE CORRECT BEFORE CONTINUING.**`);
        }

        //if aRole exists
        else{
            //exlude bots and admins then add role
            server.members.filter(message => !message.user.bot && !server.member.aRole)
            .map(async member => await member.roles.add(addRole));

            await message.channel.send(`${message.author.username}, role **${addRole.name}** was added to all members`);

            /*
            *now that all the roles have been done lets get the channel done.
            */
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            const uChannel = server.channels.find(channel => channel.name === 'roll-call');
            const parentID = server.channels.find(channel => channel.name === 'reaper rooms' && channel.type == 'category');
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            /*
            *What to do if there's no uChannel or parentID

            These are for the permissions
            */
            const serverID = server.id;
            const adminID = server.roles.find(role => role.id === settings.admin);
            let rollCall = server.roles.find(role => role.name === 'Roll Call');
            const rollCallID = rollCall.id;
           
            //no uChannel
            if(!uChannel){
                var chaName = ("roll-call");
                await server.channels.create(chaName, {
                    type: 'text',
                    parent: parentID,
                    permissionOverwrites: [
                        {
                            id: serverID,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: adminID,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: rollCallID,
                            allow: ['VIEW_CHANNEL'],
                        }
                    ]
                })
            };
            await server.channels.find(channel => channel.name === 'roll-call').send(`${rollCall},` + "```" + "\nTime for Roll-Call! Sign here and I'll Remove you from this Channel Automatically, Meaning that you have Signed!" + "\n```");

            //modlog embed
            const rollcallEmbed = new Discord.MessageEmbed()
            .setAuthor("TheReaper Moderation")
            .addField("Roled All users", "?rollcall command.")
            .addField("Moderator", `${sender.username} (${sender.tag})`)
            .addField("Role", addRole.name)
            .setFooter("Sent via TheReaper")
            .setThumbnail(sender.displayAvatarURL())
            .setColor(0x9900FF);
            if (settings.modLog != null) {
                var modLog = server.channels.get(settings.modLog)
                modLog.send({
                    embed: rollcallEmbed
                }).catch((err) => {
                    message.react('❌');
                    message.channel.send(err.message);
                });
            };
        };
    };
};