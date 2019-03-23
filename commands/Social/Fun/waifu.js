const { Command } = require('klasa');

module.exports = class extends Command {
    
	constructor(...args) {
		super(...args, {
            name: 'waifu',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['memeChannel'],
            extendedHelp: 'No extended help available.',
            description: 'Sends a randomly generated Waifu from thiswaifudoesnotexist.net' 
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
        
		return message.sendMessage(`https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`);
	}
};