const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'mixer',
            enabled: true,
            runIn: ['text', 'dm'],
            bucket: 1,
            permissionLevel: 0,
            requiredPermissions: ['SEND_MESSAGES'],
            requiredSettings: [],
            description: 'Gets information about a Mixer Streamer',
            usage: '[streamer:...string]',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [streamer]) {
        const fetch = require('node-fetch')
        function checkStatus(res) {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res;
            } else {
                return message.reply(`I could not find ${streamer} on Mixer! *Try again, you fool...*`)
            }
        }

        fetch(`https://mixer.com/api/v1/channels/${streamer}`)
            .then(checkStatus)
            .then(res => res.json())
            .then(mixerInfo => {

                const mixerStuff = new MessageEmbed()
                    .setColor(0x9900FF)
                    .setTitle(mixerInfo.token)
                    .setFooter("Sent via TheReaper")
                    .setTimestamp()
                    .setThumbnail(mixerInfo.user.avatarUrl)
                    .setURL("http://mixer.com/" + mixerInfo.token)
                    .addField("Online", mixerInfo.online, true)
                    .addField("Followers", mixerInfo.numFollowers, true)
                    .addField("Mixer Level", mixerInfo.user.level, true)
                    .addField("Total Views", mixerInfo.viewersTotal, true)
                    .addField("Joined Mixer", mixerInfo.createdAt, true)
                    .addField("Audience", mixerInfo.audience, true)
                    .addField("Partnered", mixerInfo.partnered, true)
                message.channel.send({
                    embed: mixerStuff
                })

            })
        
    }
};