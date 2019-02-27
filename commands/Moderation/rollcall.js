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
        const MessageEmbed = require("discord.js");
		//
        const sender = message.author.username;
        /////////////////////////////////////////

        //addRole for roll call role
        const addRole = server.roles.find(role => role.name === 'Roll Call');
        if (!addRole){
            message.channel.send(`**${sender}**, role not found. Creating now...`);
            addRole = server.roles.create({
                data: {
                    name: 'Roll Call',
                    color: '#36393f',
                },
                reason: 'Missing the required role.'
            })
            .then(console.log)
            .catch(console.error)
        }

        //aRole for admin role
        const aRole = server.roles.find(role => role.id === settings.admin);
        if (!aRole){
            console.log(`!! NO '${settings.admin}' ROLE FOUND !!`)
            return message.channel.send(`NO ${settings.admin} ROLE FOUND. PLEASE CORRECT BEFORE CONTINUING.`);
        }
        //if aRole exists
        else{
            //filter bots and then confirm adding roles.
            const filter = server.members.filter(message => !message.user.bot)
            filter.map(async member => await member.roles.add(addRole))
            await message.channel.send(`**${message.author.username}**, role **${addRole.name}** was added to all members`)
                
            /*
            *now that all the roles have been done lets get the channel done.
            */
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            const uChannel = server.channels.find(channel => channel.name === 'roll-call');
            const parentID = server.channels.find(channel => channel.name === 'reaper rooms' && type == 'category');
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            /*
            *What to do if there's no uChannel or parentID
            */
           
            //no uChannel or parentID
            if(!uChannel && !parentID){
                var chaName = ("roll-call");
                server.channels.create(chaName, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: server.id,
                            deny: ['VIEW_CHANNEL'],

                            id: addRole,
                            allow: ['VIEW_CHANNEL'],

                            id: aRole,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ]
                })
            };
            //no uChannel
            if (!uChannel){
                var chaName = ("roll-call");
                server.channels.create(chaName, {
                    type: 'text',
                    parent: parentID,
                    permissionOverwrites: [
                        {
                            id: server.id,
                            deny: ['VIEW_CHANNEL'],

                            id: addRole,
                            allow: ['VIEW_CHANNEL'],

                            id: aRole,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ]
                })
            }
            await server.channels.get(channel => channel.name === chaName).send(`**Roll-Call is now live! Please sign in roll-call to verify that you're still active within the clan and you'll be immediately removed!\n${addRole}\n\nLove --The Reaper**`)
            .then (message.channel.send(`Rollcall Successful.`))

            //modlog embed
            const rollcallEmbed = new Discord.MessageEmbed()
            .setAuthor("TheReaper Moderation")
            .addField("Roled All users")
            .addField("Moderator", `${sender} (${message.member.user.tag})`)
            .addField("Role", gRole)
            .setFooter("Sent via TheReaper")
            .setThumbnail(user.displayAvatarURL())
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