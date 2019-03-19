const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'trumpquote',
			enabled: true,
			aliases: ['trump'],
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			description: 'Returns a random Donald Trump quote.'
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
            return message.channel.send(`The Reaper says you can only use this command in <#${settings.roastMemeChannel}>.`)
		}
		/////////////////////////////////////////

		const quote = await fetch('https://api.tronalddump.io/random/quote')
			.then(response => response.json())
			.then(body => body.value)
			.catch(() => { throw 'There was an error. Please try again.'; });
		return message.sendMessage(quote);
	}
};