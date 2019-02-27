const {
	Command,
	Duration
} = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'mute',
			enabled: true,
			runIn: ['text'],
			aliases: [],
			bucket: 1,
			permissionLevel: 6,
			requiredSettings: ['admin','muted', 'modLog'],
			description: 'Mutes a mentioned member.',
			extendedHelp: 'Time is how long (such as 2m for 2 min, or 1h for 1 hour). Name is the name of the user. Reason is the reason for their mute.\nTime and reason are both optional.\nIf time is provided, they will be automatically unmuted when the time is up.\nThe muted role must be set in the server config to use the command.',
			usage: '[when:time] <member:member> [reason:...string]',
		});
	}

	async run(message, [when, member, reason]) {
        /*
        *Pre-requisits
        */
        /////////////////////////////////////////
        var server = message.guild;
        //
        const settings = server.settings;
		//
        const Discord = require ("discord.js");
        //
        const MessageEmbed = require("discord.js");
		//
        const sender = message.author.username;
        /////////////////////////////////////////
		
		//Do some member/sender checks
		if (member.id === message.author.id) throw 'Why on **EARTH** would you mute yourself?';
		if (member.id === this.client.user.id) throw "No. I'm The Reaper you cheeky fuck.";

		if (member.roles.highest.position >= message.member.roles.highest.position) throw 'Nuh-uh The Reaper denies it.';

		if (member.roles.has(server.settings.muted)) throw 'Already muted man!';

		if (Duration.toNow(when) == "seconds") throw 'Minimum mute time of 1 min, *get it right, man...*'

		//Add the mute role
		await member.roles.add(server.settings.muted);

		if (when) {
			await this.client.schedule.create('unmute', when, {
				data: {
					guild: server.id,
					user: member.id
				}
			});

			//mute embed
			const muteEmbed = new Discord.MessageEmbed()
				.setAuthor("TheReaper Moderation")
				.addField("Muted User", `${member} (${member.user.tag})`)
				.addField("Moderator", `${sender} (${message.author.tag})`)
				.addField("Time", Duration.toNow(when))
				.addField("Reason", reason)
				.setFooter("Sent via TheReaper")
				.setThumbnail(member.user.displayAvatarURL())
				.setColor(0x9900FF);

			if (settings.modLog != null) {
				server.channels.get(settings.modLog).send({
					embed: muteEmbed
				}).catch(err => console.log(err));
			}

			return message.channel.send({
				embed: muteEmbed
			});
		}
	}
};