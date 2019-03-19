const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'dogfact',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			description: 'Gives you a random dog fact.'
		});
	}

	async run(message) {
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

		const fact = await fetch(`http://dog-api.kinduff.com/api/facts?number=1`)
			.then(response => response.json())
			.then(body => body.facts[0]);
		return message.sendMessage(`📢 **Dogfact:** *${fact}*`);
	}

};