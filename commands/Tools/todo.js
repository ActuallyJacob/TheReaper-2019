const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['dm', 'text'],
			description: 'add|remove|list user\'s TODOs through DM',
			extendedHelp: 'No extended help available.',
			usage: '<add|remove|list:default> (TODO:string) [content:...string]',
			usageDelim: ' ',
			subcommands: true
		});
		this.createCustomResolver('string', (arg, possible, message, [action]) => {
			if (action === 'list') return arg;
			return this.client.arguments.get('string').run(arg, possible, message);
		});
	}

	async add(message, [TODO, content]) {
		const sender = message.author;
		await sender.settings.update('TODOs', [...sender.settings.TODOs, [TODO, content]], { action: 'overwrite' });
		return message.send(`Added \`${TODO}\` TODO`);
	}

	async remove(message, [TODO]) {
		const sender = message.author;
		const filtered = sender.settings.TODOs.filter(([name]) => name !== TODO);
		await sender.settings.update('TODOs', filtered, { action: 'overwrite' });
		return message.send(`Removed \`${TODO}\` TODO`);
	}

	list(message) {
		const sender = message.author;
		return message.send(`List of TODOs for this user: \`${sender.settings.TODOs.join('`, `')}\``);
	}

};