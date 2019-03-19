const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'catfact',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			aliases: ['kittenfact'],
			description: 'Let me tell you a mysterious cat fact.'
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
            return message.channel.send(`The Reaper says you can only use this command in ${settings.roastMemeChannel}.`)
		}
		/////////////////////////////////////////

		const fact = await fetch('https://catfact.ninja/fact')
			.then(response => response.json())
			.then(body => body.fact);
		return message.sendMessage(`📢 **Catfact:** *${fact}*`);
	}

};