const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'joindates',
            enabled: true,
            runIn: ['text', 'dm'],
            aliases: [],
            permissionLevel: 6,
            requiredSettings: [],
            description: "Sends a console log to ActuallyJacob#2785 with the server members' join dates.",
            usage: '',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [member = message.member]) {
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
        const sender = message.author.username;
        /////////////////////////////////////////
        message.channel.send("To prevent spam messages and due to restrictions from Discord's API, please contact ActuallyJacob#2785 to view this list.")
        server.members.forEach(member => console.log(member.user.username + ", " + member.joinedAt));

    }
}