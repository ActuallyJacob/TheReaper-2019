const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'meme',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			description: 'Shows a meme image from reddit.'
		});
		this._subreddits = [
			'memes',
			'DeepFriedMemes',
			'bonehurtingjuice',
			'surrealmemes',
			'dankmemes',
			'meirl',
			'me_irl',
			'funny'
		];
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

		const data = await fetch(`https://imgur.com/r/${this._subreddits[Math.floor(Math.random() * this._subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		const selected = data[Math.floor(Math.random() * data.length)];
		return message.send(new MessageEmbed().setImage(`http://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`));
	}
};