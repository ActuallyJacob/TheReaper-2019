const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');
const query = new URLSearchParams([['client_id', 'CLIENT_ID_HERE']]);
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'twitch',
            enabled: true,
            runIn: ['text', 'dm'],
            bucket: 1,
            permissionLevel: 0,
            requiredPermissions: ['SEND_MESSAGES'],
            requiredSettings: ['commandChannel'],
            description: 'Gets information about a Twitch Streamer',
            usage: '[streamer:...string]',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [twitchName]) {
		const url = new URL(`https://api.twitch.tv/kraken/channels/${encodeURIComponent(twitchName)}`);
		url.search = query;

		const body = await fetch(url)
			.then(response => response.json())
			.catch(() => { throw 'Unable to find account. Did you spell it correctly?'; });

		const creationDate = this.timestamp.display(body.created_at);
		const embed = new MessageEmbed()
			.setColor(6570406)
			.setThumbnail(body.logo)
			.setAuthor(body.display_name, 'https://i.imgur.com/OQwQ8z0.jpg', body.url)
			.addField('Account ID', body._id, true)
			.addField('Followers', body.followers, true)
			.addField('Created On', creationDate, true)
			.addField('Channel Views', body.views, true);

		return msg.sendEmbed(embed);
	}
};