const {
    Command
} = require('klasa');

//DISABLED DUE TO BUGS

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'delTwitch',
            enabled: false,
            runIn: ['text'],
            cooldown: 0,
            bucket: 1,
            permissionLevel: 6, //any one with admin perms
            description: 'Used to remove a Twitch streamer to your server.',
        });
    }

    async run(message, [...params]) {
        const fs = require('fs')
        const fetch = require('node-fetch')

        var prefix = message.guild.settings.prefix
        var args = message.content.toString().toLowerCase().replace(prefix + 'addtwitch', '').split(' ')
        var streamer = args[1]
        var twitchDir = __dirname.replace("commands/Streaming", "streamers/twitch").replace(String.raw `\commands\Streaming`, String.raw `\streamers\twitch`)
        var guildID = message.guild.id
        var twitch_id = this.client.config.twitch_id



        function checkStatus(res) {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res;
            } else {
                return message.reply(`There is no registered Mixer account with the name ${streamer}`)
            }
        }
        fetch(`https://api.twitch.tv/kraken/channels/${streamer}/?client_id=${twitch_id}`)
            .then(checkStatus)
            .then(res => res.json())
            .then(
                twitchInfo => {
                    const name = twitchInfo.name;
                    if (!fs.existsSync(twitchDir + '/' + name + '.json')) { //if they are not in the database
                        return message.reply(`the Twitch streamer ${name} was never added to your server, and thus cannot be removed!`)
                    }
                    if (fs.existsSync(twitchDir + '/' + name + '.json')) { //if they are in the database
                        let rawdata = fs.readFileSync(twitchDir + '/' + name + '.json');
                        let streamerData = JSON.parse(rawdata);

                        if (streamerData.guilds.includes(guildID)) { //if they are already added to that server
                            var oldGuilds = streamerData.guilds
                            var index = oldGuilds.indexOf(guildID)
                            if (index > -1) {
                                oldGuilds.splice(index, 1);
                            }
                            streamerData.guilds = oldGuilds
                            fs.writeFileSync(twitchDir + '/' + name + '.json', JSON.stringify(streamerData));
                            return message.reply(`you have removed the Twitch streamer ${name} from your server!`)
                        }

                        if (!streamerData.guilds.includes(guildID)) { //if they are not already added to that server
                            return message.reply(`the Twitch streamer ${name} was never added to your server, and thus cannot be removed!`)
                        }
                    }
                })
            }
        };