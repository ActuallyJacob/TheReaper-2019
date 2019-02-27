const {
	Command
} = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'mute',
			enabled: 'true',
			runIn: ['text'],
			aliases: [],
			bucket: 1,
			permissionLevel: 6,
			requiredSettings: ['admin', 'muted', 'modLog'],
			description: 'Unmutes a mentioned user.',
			usage: '<member:member> [reason:...string]',
			requiredSettings: ['muted', 'modLog'],
		});
	}

	async run(message, [member, reason]) {
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

		//Check role position
		if (member.roles.highest.position >= message.member.roles.highest.position) throw "**You aren't allowed,** *why? because I said so.*";
		if (!member.roles.has(server.settings.muted)) throw "He ain't muted, man. *get your facts straight.*";

		//remove muted role
		await member.roles.remove(server.settings.muted);

		//unmute embed
		const unMuteEmbed = new Discord.MessageEmbed()
			.setAuthor("TheReaper Moderation")
			.addField("Unmuted User", `${member} (${member.user.tag})`)
			.addField("Moderator", `${sender} (${message.author.tag})`)
			.addField("Reason", reason)
			.setFooter("Sent via TheReaper")
			.setThumbnail(member.user.displayAvatarURL())
			.setColor(0x9900FF);

		if (settings.modLog != null) {
			var modLog = server.channels.get(settings.modLog)
			modLog.send({
				embed: unMuteEmbed
			}).catch(err => console.log(err));
		}

		return message.channel.send({
			embed: unMuteEmbed
		});

		// return message.sendMessage(`${member.user.tag} was unmuted.${reason ? ` With reason of: ${reason}` : ''}`);
	}
};