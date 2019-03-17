const { KlasaClient, PermissionLevels, Schema } = require('klasa');
const config = require('./config.json');
const Discord = require ('discord.js');
const fs = require('fs');
const Idiot = require("idiotic-api");

const client = new KlasaClient({
    fetchAllMembers: false,
    commandEditing: true,
    commandLogging: true,
    typing: true,
    ownerID: config.ownerID,
    prefix: config.prefix,
    providers: { default: 'mongodb' },
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
});

// activity list
client.on("ready", () => {
    const activities_list = [
      "Created by ActuallyJacob", 
      "Use ?help (command) for help", 
      "TheReaper.js"
      ];
      setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
      }, 10000); // Runs this every 10 seconds.
});

client.config = require('./config.json');
//client.idiotAPI = new Idiot.Client(client.config.idiotKey, {
//    dev: true
//});

// some message events
client.on("message", message => {
    const guildMember = message.member;
    var server = message.guild;
    const settings = server.settings;
    var reaperRole = server.roles.get(role => role.name === "The Reaper")
    const reaperID = reaperRole.id
    if(message.channel.name === "roll-call"){
        if (!guildMember.roles.some(r=>[settings.admin, reaperID].includes(r.id)) ){
            message.delete().catch(O_o=>{});
            let rRole = message.guild.roles.find(role => role.name === 'Roll Call');
            guildMember.roles.remove(rRole)
            .then(message => console.log(chalk.green(`${message.user.username} Just signed the Roll Call!`)))
            }
        }
        else{
            return;
        }
      if(message.channel.name === "about-me"){
        let nRole = message.guild.roles.find(role => role.name === 'About Me');
        if(!guildMember.roles.some(r =>[nRole].includes(r.name)) ){
          guildMember.roles.add(nRole)
          .then(console.log(chalk.blue(`${message.author.username} Wrote in the #about-me. Good man.`)))
          .catch(console.error(chalk.red));
        }
        else{
            return;
        }
      }
      if(message.channel.name === "code-of-conduct"){
        if(message.content.toLowerCase() === "accept"){
          message.delete().catch(O_o=>{});
          let rMember = guildMember.user.id
          var role = message.guild.roles.find(role => role.name === 'Sorting Room');
          guildMember.roles.add(role);
          message.reply("The Reaper welcomes you to the family.")
          message.guild.channels.find(channel => channel.name === 'sorting-room').send (`<@${rMember}> Is in the sorting room! The Reaper requests you state your Xbox gamertag and Timezone. Additionally, if you have any questions for the Admin team before completing the sorting process and being removed from this channel, please let us know :smiley:`)
          .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. We grow.`)))
          .catch(console.error(chalk.red));
          }
          else{
              return;
          }
        }
    });

KlasaClient.defaultGuildSchema.add('mixerLiveChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('twitchLiveChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('modLog', 'TextChannel');
KlasaClient.defaultGuildSchema.add('welcomeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('commandChannel', 'TextChannel', {default: 'the-reaper'});
KlasaClient.defaultGuildSchema.add('rulesChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('roastMemeChannel', 'TextChannel');

KlasaClient.defaultGuildSchema.add('livePing', 'Boolean', {default: true});
KlasaClient.defaultGuildSchema.add('sendRulesMessage', 'Boolean', {default: false});
KlasaClient.defaultGuildSchema.add('sendWelcomeMessage', 'Boolean', {default: true}); 
KlasaClient.defaultGuildSchema.add('welcomeMessage', 'String');
KlasaClient.defaultGuildSchema.add('rulesMessage', 'String');

KlasaClient.defaultGuildSchema.add('defaultRole', 'role');
KlasaClient.defaultGuildSchema.add('muted', 'role', {default: "Muted"});
KlasaClient.defaultGuildSchema.add('admin', 'role', { default: "Admin"});

KlasaClient.defaultPermissionLevels
.add(0, () => true)
//Admins are level 6
.add(6, ({ guild, member }) => guild && guild.settings.admin != null && member.roles.has(guild.settings.admin))
//Server owner
.add(7, ({ guild, member }) => guild && member === guild.owner, { fetch: true })
//Official bot support team
//.add(8, ({ client, author }) => client.config.botSupportTeam.includes(author.id), { fetch: true })
//Bot owner with message
.add(9, ({ author, client }) => author === client.owner, { break: true })
//Bot owner without message
.add(10, ({ author, client }) => author === client.owner);

client.login(client.config.token);

// console.log(client.shard.id)
const streamerFolderMixer = "./streamers/mixer";
const streamerFolderTwitch = "./streamers/twitch";
const streamerFolder = "./streamers";

const delay = require("delay");
const chalk = require('chalk');
const fetch = require('node-fetch');

var halfHour = 1800000 //30 min in ms

async () => {
    function checkStatus(res) {
        if (res.ok) { // res.status >= 200 && res.status < 300
            return res;
        } else {
        // return message.reply(`There is no registered Twitch account with the name ${streamer}`)
    }
}

    function loadStreamers() {
        fs.readdir(streamerFolderMixer, (err, files) => {
            files.forEach(file => {
                var files = file;
            });
            var fileCount = files.length;
            var allMixer = "";
            for (i = 0; i < fileCount; i++) {
                var name = files[i].replace(".json", ", ");
                var allMixer = allMixer + name;
            }
            //console.log(allMixer)
            fs.writeFileSync(streamerFolder + "/mixerStreamers.txt", allMixer.replace(".DS_Store", ""));
        });
        
        fs.readdir(streamerFolderTwitch, (err, files) => {
            files.forEach(file => {
                var files = file;
            });
            var fileCount = files.length;
            var allTwitch = "";
            for (i = 0; i < fileCount; i++) {
                var name = files[i].replace(".json", ", ");
                var allTwitch = allTwitch + name;
            }
            //console.log(allMixer)
            fs.writeFileSync(streamerFolder + "/twitchStreamers.txt", allTwitch.replace(".DS_Store", ""));
        });
    }


//Start Twitch
var streamersTwitch = fs.readFileSync(streamerFolder + "/twitchStreamers.txt", "utf-8").split(", ");
var streamerCountTwitch = streamersTwitch.length;

for (t = 0; t < streamerCountTwitch; t++) {
    var bootTime = (new Date).getTime(); //get the time the bot booted up
    var halfHourAgo = bootTime - 1800000; //get the time 30min before the boot
    // fs.writeFile("./user_time_twitch/" + streamersTwitch[t] + "_time.txt", halfHourAgo);
    // console.log(chalk.magenta("Now stalking " + streamersTwitch[t] + " on Twitch!"));
}
console.log(chalk.magenta(`Now stalking ${streamerCountTwitch} streamers on Twitch!`));

function twitchCheck() {
    console.log(chalk.magenta("Checking Twitch!"));
    for (tc = 0; tc < streamersTwitch.length; tc++) {
        var liveTime = (new Date).getTime();

        if (streamersTwitch[tc] != "") {
            var rawdata = fs.readFileSync(streamerFolderTwitch + "/" + streamersTwitch[tc] + ".json");
            var streamerData = JSON.parse(rawdata);
            var lastLiveTime = streamerData.liveTime;

            var timeDiff = liveTime - lastLiveTime;
            if (timeDiff >= halfHour) { //if its been 30min or more

                fetch(`https://api.twitch.tv/kraken/streams/${streamersTwitch[tc]}/?client_id=${client.config.twitch_id}`)
                    .then(checkStatus)
                    .then(res => res.json())
                    .then(twitchInfo => {

                        if (twitchInfo.stream == null) {
                            // nothing
                        } else {
                            var liveTime = (new Date).getTime();
                            var streamStartTime = new Date(twitchInfo.stream.created_at);
                            var streamStartMS = streamStartTime.getTime();
                            if (liveTime - streamStartMS < 1800000) {
                                console.log(chalk.magenta(twitchInfo.stream.channel.name + " went live on Twitch, as its been more than 30min!"));

                                if (twitchInfo.stream.game == "") {
                                    var gameName = "[API ERROR]"
                                    var args = [twitchInfo.stream.channel.name, gameName, twitchInfo.stream.channel.status, twitchInfo.stream.channel.logo, twitchInfo.stream.channel.followers, twitchInfo.stream.channel.views]
                                    var v = JSON.stringify(args)

                                    client.shard.broadcastEval(`(${liveTwitch}).apply(this, ${JSON.stringify(args)})`)
                                    streamerData.liveTime = liveTime
                                    fs.writeFileSync(streamerFolderTwitch + '/' + twitchInfo.stream.channel.name + '.json', JSON.stringify(streamerData));

                                } else {
                                    // client.shard.broadcastEval(liveTwitch(twitchInfo.stream.channel.name, twitchInfo.stream.game, twitchInfo.stream.channel.status, twitchInfo.stream.channel.logo, twitchInfo.stream.channel.followers, twitchInfo.stream.channel.views)) //should tell all shards to do the following
                                    var args = [twitchInfo.stream.channel.name, twitchInfo.stream.game, twitchInfo.stream.channel.status, twitchInfo.stream.channel.logo, twitchInfo.stream.channel.followers, twitchInfo.stream.channel.views]
                                    var v = JSON.stringify(args)
                                    client.shard.broadcastEval(`(${liveTwitch}).apply(this, ${JSON.stringify(args)})`)
                                    streamerData.liveTime = liveTime
                                    fs.writeFileSync(streamerFolderTwitch + '/' + twitchInfo.stream.channel.name + '.json', JSON.stringify(streamerData));


                                }
                            }
                        }
                    })
                }
            }
        }
    }
    
function liveTwitch(name, game, status, logo, followers, views) {
        var twitchDir = "./streamers/twitch"
        const Discord = require('discord.js');
        const {
            MessageEmbed
        } = require('discord.js');
        require('discord.js-aliases');
        const fs = require('fs')
        
        const liveEmbed = new Discord.MessageEmbed() //start the embed message template
        .setTitle(name + "\'s Stream")
        .setAuthor(status)
        .setColor(0x9900FF)
        .setDescription("Hey guys, " + name + " is live on Twitch right now! Click above to watch!")
        .setFooter("Sent via TheReaper")
        .setThumbnail(logo)
        .setTimestamp()
        .setURL("http://twitch.tv/" + name)
        .addField("Streaming", game)
        .addField("Followers", followers, true)
        .addField("Total Views", views, true); //end the embed message template
        
        var serversAllowedRaw = fs.readFileSync(twitchDir + "/" + name + ".json");
        var streamerData = JSON.parse(serversAllowedRaw);
        var serversAllowed = streamerData.guilds.toString().split(',')
        
        var i;
        for (i = 0; i < serversAllowed.length; i++) { //run for the total number of servers they are allowed on

            if (this.guilds.map(c => c.id).includes(serversAllowed[i])) {
                
                var guild_id = serversAllowed[i]

                if (this.guilds.get(guild_id) != undefined) {

                    var gSettings = this.guilds.get(guild_id).settings

                    if (gSettings.twitchLiveChannel != undefined) {

                        var channelID = gSettings.twitchLiveChannel

                        if (channelID == null) {

                            var channelID = this.guilds.get(guild_id).channels.find(channel => channel.name === 'general').id;
                            
                            if (channelID == undefined) {

                                return;

                            }
                            
                            var liveMessage = "";

                            if (gSettings.livePing == false) {

                                var liveMessage = liveMessage

                            }

                            if (gSettings.livePing == true) {

                                var liveMessage = liveMessage + "@here, "

                            }

                            var liveMessage = liveMessage + name + " is now live on Twitch!"

                            this.channels.get(channelID).sendEmbed(liveEmbed, liveMessage); //send the live message to servers

                        } else {
                            
                            var liveMessage = "";

                            if (gSettings.livePing == false) {

                                var liveMessage = liveMessage

                            }

                            if (gSettings.livePing == true) {

                                var liveMessage = liveMessage + "@here, "

                            }

                            var liveMessage = liveMessage + name + " is now live on Twitch!"

                            this.channels.get(channelID).sendEmbed(liveEmbed, liveMessage); //send the live message to servers
                        }
                    }
                }
            }
        }
    }

//Start Mixer
var streamersMixer = fs.readFileSync(streamerFolder + "/mixerStreamers.txt", "utf-8").split(", ");
var mixerStreamerCount = streamersMixer.length;
// var halfHour = 1800000; //time in milis that is 30min

const Carina = require("carina").Carina;
const ws = require("ws");

Carina.WebSocket = ws;
const ca = new Carina({
    isBot: true
}).open();

function mixerJSON(id) {

    var rawdata = fs.readFileSync(streamerFolderMixer + "/" + id + ".json");
    this.streamerData = JSON.parse(rawdata);

    // return streamerData;
}

function mixerCheck() {

    for (i = 0; i < mixerStreamerCount; i++) { //Run for the # of streamers
        var halfHour = 1800000; //time in milis that is 30min
        var bootTime = (new Date).getTime(); //get the time the bot booted up
        var halfHourAgo = bootTime - 1800000; //get the time 30min before the boot

        fetch(`https://mixer.com/api/v1/channels/${streamersMixer[i]}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(mixerInfo => {

                var mixerID = mixerInfo.id

                ca.subscribe(`channel:${mixerID}:update`, data => { //subscribing to the streamer
                    if (data.online == true && data.updatedAt != undefined) {
                        var mixerStatus = data.online; //checks if they are online (its a double check just incase the above line miss fires)
                        if (mixerStatus == true) { //if the info JSON says they are live
                            var liveTime = (new Date).getTime(); //time the bot sees they went live
                            // var rawdata = fs.readFileSync(streamerFolderMixer + "/" + streamersMixer[i] + ".json");
                            // var streamerData = JSON.parse(rawdata);
                            var mixer_id = mixerID.toString()
                            var mixerD = new mixerJSON(mixer_id)
                            // console.log(mixerD.streamerData)
                            var lastLiveTime = mixerD.streamerData.liveTime;

                            // var lastLiveTime = fs.readFileSync("./mixer_time/" + mixerInfo.token + "_time.txt", "utf-8"); //checks the last live time
                            // var timeDiff = liveTime - lastLiveTime; //gets the diff of current and last live times


                            var timeDiff = liveTime - lastLiveTime; //gets the diff of current and last live times
                            // console.log(liveTime)
                            // console.log(lastLiveTime)
                            // console.log(timeDiff)


                            if (timeDiff >= halfHour) { //if its been 30min or more
                                // console.log(chalk.cyan(streamerData.name + " went live, as its been more than 30min!" + client.shard.id)); //log that they went live

                                // client.shard.broadcastEval(client.liveMixer(mixerInfo.token)) //should tell all shards to do the following

                                var args = [mixerInfo.token, mixerInfo.type.name, mixerInfo.name, mixerInfo.user.avatarUrl, mixerInfo.numFollowers, mixerInfo.viewersTotal, mixerInfo.user.level, mixerInfo.id]
                                var v = JSON.stringify(args)
                                client.shard.broadcastEval(`(${liveMixer}).apply(this, ${JSON.stringify(args)})`)

                                if (mixerInfo.token == mixerD.streamerData.name) {
                                    mixerD.streamerData.liveTime = liveTime
                                    fs.writeFileSync(streamerFolderMixer + '/' + mixerID + '.json', JSON.stringify(mixerD.streamerData));
                                } else {
                                    mixerD.streamerData.name = mixerInfo.token
                                    mixerD.streamerData.liveTime = liveTime
                                    fs.writeFileSync(streamerFolderMixer + '/' + mixerID + '.json', JSON.stringify(mixerD.streamerData));
                                }

                            }

                            if (timeDiff < halfHour) { //if its been less than 30min
                                // console.log(mixerInfo.token + " attempted to go live, but its been under 30min!"); //log that its been under 30min
                            }


                            // delay(10).then(() => {
                            // fs.writeFile("./mixer_time/" + mixerInfo.token + "_time.txt", liveTime); //update last live time regardless if they went live or not
                            // });
                            // fs.writeFile("./mixer_time/" + mixerInfo.token + "_time.txt", liveTime); //update last live time regardless if they went live or not
                        }
                    }
                });
            })
        }
    console.log(chalk.cyan(`Now stalking ${mixerStreamerCount} streamers on Mixer`)); //logs that the bot is watching for the streamer to go live
}

function liveMixer(name, game, status, logo, followers, views, level, id) {

    var mixerDir = "./streamers/mixer"
    const Discord = require('discord.js');
    const {
        MessageEmbed
    } = require('discord.js');
    require('discord.js-aliases');
    const fs = require('fs')

    const liveEmbed = new Discord.MessageEmbed() //start the embed message template
        .setTitle(name + "\'s Stream")
        .setAuthor(status)
        .setColor(0x9900FF)
        .setDescription("Hey guys, " + name + " is live on Mixer right now! Click above to watch!")
        .setFooter("Sent via TheReaper")
        .setThumbnail(logo)
        .setTimestamp()
        .setURL("http://mixer.com/" + name)
        .addField("Streaming", game)
        .addField("Followers", followers, true)
        .addField("Mixer Level", level, true)
        .addField("Total Views", views, true); //end the embed message template

    var serversAllowedRaw = fs.readFileSync(mixerDir + "/" + id + ".json");
    var streamerData = JSON.parse(serversAllowedRaw);
    var serversAllowed = streamerData.guilds.toString().split(',')

    var mi;
    for (mi = 0; mi < serversAllowed.length; mi++) { //run for the total number of servers they are allowed on

        if (this.guilds.map(c => c.id).includes(serversAllowed[mi])) {

            var guild_id = serversAllowed[mi]

            if (this.guilds.get(guild_id) != undefined) {

                var gSettings = this.guilds.get(guild_id).settings

                if (gSettings.mixerLiveChannel != undefined) {
                    var channelID = gSettings.mixerLiveChannel

                    if (channelID == null) {
                        //  = this.guilds.get(guild_id).channels.find("name", settings.welcomeChannel).send
                        var channelID = this.guilds.get(guild_id).channels.find(channel => channel.name === 'general').id;
                        var liveMessage = "";

                        if (gSettings.livePing == false) {
                            var liveMessage = liveMessage
                        }
                        if (gSettings.livePing == true) {
                            var liveMessage = liveMessage + "@here, "
                        }
                        var liveMessage = liveMessage + name + " is now live on Mixer!"

                        this.channels.get(channelID).sendEmbed(liveEmbed, liveMessage); //send the live message to servers
                    } else {
                        var liveMessage = "";

                        if (gSettings.livePing == false) {
                            var liveMessage = liveMessage
                        }
                        if (gSettings.livePing == true) {
                            var liveMessage = liveMessage + "@here, "
                        }
                        var liveMessage = liveMessage + name + " is now live on Mixer!"

                        this.channels.get(channelID).sendEmbed(liveEmbed, liveMessage); //send the live message to servers
                    }
                }
            }
        }
    }
}

if (client.shard.id == 0) { //only the main/first shard
    loadStreamers()
    
    delay(30000).then(() => {
        mixerCheck();
    })

    delay(60000).then(() => {
        twitchCheck();
    });

    setInterval(twitchCheck, 120000); //run the check every 2min
}}
