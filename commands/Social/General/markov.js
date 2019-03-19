const { Command } = require('klasa');
const MarkovChain = require('markovchain');
const messageLimitHundreds = 1;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'markov',
            enabled: true,
            runIn: ['text'],
            bucket: 1,
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            extendedHelp: 'No extended help available.',
			description: 'Generate a markov chain from the text chat.',
			requiredPermissions: ['READ_MESSAGE_HISTORY']
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

		let messageBank = await message.channel.messages.fetch({ limit: 100 });
		for (let i = 1; i < messageLimitHundreds; i++) {
			messageBank = messageBank.concat(await message.channel.messages.fetch({ limit: 100, before: messageBank.last().id }));
		}

		const quotes = new MarkovChain(messageBank.map(message => message.content).join(' '));
		const chain = quotes.start(this.useUpperCase).end(20).process();
		return message.sendMessage(chain.substring(0, 1999));
	}

	useUpperCase(wordList) {
		const tmpList = Object.keys(wordList).filter((word) => word[0] >= 'A' && word[0] <= 'Z');
		return tmpList[Math.floor(Math.random() * tmpList.length)];
	}
};