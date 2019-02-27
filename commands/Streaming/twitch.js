const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');

const Discord = require ('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'twitch',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ['SEND_MESSAGES'],
            requiredSettings: ['commandChannel'],
            subcommands: false,
            description: 'Gets information about a Twitch Streamer',
            quotedStringSupport: false,
            usage: '[streamer:...string]',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [streamer]) {
        var settings = message.guild.settings
        var channel = message.channel.id
        if(channel !=(settings.commandChannel)){
            return message.reply(`Please make a channel called ${settings.commandChannel} to use this command.`)
        }
        else{
        const fetch = require('node-fetch')

        function checkStatus(res) {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res;
            } else {
                return message.reply(`I could not find ${streamer} on Twitch! *Try again, you fool...*`)
            }
        }

        fetch(`https://api.twitch.tv/kraken/channels/${streamer}?client_id=${this.client.config.twitch_id2}`)
            .then(checkStatus)
            .then(res => res.json())
            .then(twitchInfo => {

                if (twitchInfo.mature == false){
                    var rate = 'Not Mature'
                }
                if (twitchInfo.mature == true){
                    var rate = 'Mature'
                }

                const twitchStuff = new MessageEmbed()
                    .setColor(0x9900FF)
                    .setTitle(twitchInfo.display_name)
                    .setFooter("Sent via TheReaper")
                    .setTimestamp()
                    .setThumbnail(twitchInfo.logo)
                    .setURL("http://twitch.tv/" + twitchInfo.display_name)
                    // .addField("Online", mixerInfo.online, true)
                    .addField("Followers", twitchInfo.followers, true)
                    // .addField("Mixer Level", mixerInfo.user.level, true)
                    .addField("Total Views", twitchInfo.views, true)
                    .addField("Joined Twitch", twitchInfo.created_at, true)
                    .addField("Audience", rate, true)
                    .addField("Partnered", twitchInfo.partner, true)
                message.channel.send({
                    embed: twitchStuff
                })

            })
        }
    }
};