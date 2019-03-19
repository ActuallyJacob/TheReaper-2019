const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'shame',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			description: 'Rings a bell on the server shaming the mentioned person.',
			usage: '<user:user>'
		});
	}

	run(message, [user]) {
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
		//
		if(channel !=(settings.roastMemeChannel)){
            return channel.send(`The Reaper says you can only use this command in ${settings.roastMemeChannel}.`)
		}
		/////////////////////////////////////////

		return message.sendMessage(`🔔 SHAME 🔔 ${user} 🔔 SHAME 🔔`);
	}
};