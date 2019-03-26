const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
            name: 'yomamma',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastChannel'],
            extendedHelp: 'No extended help available.',
			aliases: ['yomama'],
			description: 'Yo momma is so fat, yo.'
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
		if(channel !=(settings.roastChannel)){
            return message.channel.send(`The Reaper says you can only use this command in <#${settings.roastChannel}>.`)
		}
        /////////////////////////////////////////
        
		const joke = await fetch('http://api.yomomma.info')
			.then(response => response.json())
			.then(body => body.joke);
		return message.sendMessage(`📢 **Yomomma joke:** *${joke}*`);
	}
};