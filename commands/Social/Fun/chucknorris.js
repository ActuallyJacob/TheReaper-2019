const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'chucknorris',
			enabled: true,
			aliases: ['chuck'],
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['memeChannel'],
            extendedHelp: 'No extended help available.',
			aliases: ['chucknorrisjoke'],
			description: 'Chuck Norris has some good jokes.'
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
		if(channel !=(settings.memeChannel)){
            return message.channel.send(`The Reaper says you can only use this command in <#${settings.memeChannel}>.`)
		}
		/////////////////////////////////////////

		const joke = await fetch('http://api.chucknorris.io/jokes/random')
			.then(response => response.json())
			.then(body => body.value);
		return message.sendMessage(`**😁 Chuck Norris Joke:** ${joke}`);
	}

};