const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'creates a reminder',
			usage: '<when:time> <text:...str>',
			usageDelim: ', '
		});
	}

	async run(message, [when, text]) {
		const reminder = await this.client.schedule.create('reminder', when, {
			data: {
				channel: message.channel.id,
				user: message.author.id,
				text
			}
		});
		return message.sendMessage(`Ok, I created you a reminder with the id: \`${reminder.id}\``);
	}

};