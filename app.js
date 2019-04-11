/*#################################################################################################################################################
###################################################################################################################################################
########################################  ____                                         ____            _    #######################################
######################################## |  _ \    ___    __ _   _ __     ___   _ __  | __ )    ___   | |_  #######################################
######################################## | |_) |  / _ \  / _` | | '_ \   / _ \ | '__| |  _ \   / _ \  | __| #######################################
######################################## |  _ <  |  __/ | (_| | | |_) | |  __/ | |    | |_) | | (_) | | |_  #######################################
######################################## |_| \_\  \___|  \__,_| | .__/   \___| |_|    |____/   \___/   \__| #######################################
########################################                        |_|                                         #######################################
###################################################################################################################################################
###################################################################################################################################################
*/

const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const invites = {};
const wait = require('util').promisify(setTimeout);

const { 
    KlasaClient, 
    PermissionLevels, 
    Schema 
} = require('klasa');

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
client.config = config

// activity list
client.on("ready", () => {
    wait(1000);
    
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
    });
});

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

client.on('guildMemberAdd', member => { 
    const settings = member.guild.settings

    member.guild.fetchInvites().then(guildInvites => {

        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        var memberavatar = member.user.avatarURL
        let server = member.guild;

        if (invite.code === settings.communityInvite){
            member.roles.add(settings.communityRole)

            var invEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(memberavatar)
            .addField(':bust_in_silhouette: | Name ', `${member}`)
            .addField(':microphone2: | New Member!', `Say Hello to: ${member}`)
            .addField(':microphone2: | They Used the Invite:', `${invite}`)
            .addField(':microphone2: | This Invite has Been Used:', `${invite.uses} times.`)
            .addField(':family_mwgb: | Invite Creator:', `${inviter} (${inviter.tag})`)
            .setFooter(`Server: ${member.guild.name}`)
            .setTimestamp()

            if(settings.commWelcomeChannel !=null && settings.sendWelcomeMessage == true) {
                const commWelcomeChannel = member.guild.channels.get(settings.commWelcomeChannel);
                var memberavatar = member.user.avatarURL
    
                    var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | Name ', `${member}`)
                    .addField(':microphone2: | Welcome!', `Welcome to the ${member.guild.name} server! `)
                    .addField(':microphone2: | Custom Welcome Message:', `${settings.welcomeMessage}`)
                    .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                    .setFooter(`Server: ${member.guild.name}`)
                    .setTimestamp()
    
                // console.log(message)
                commWelcomeChannel.send(embed)
            }
        }
        else{
            if(settings.welcomeChannel !=null && settings.sendWelcomeMessage == true) {
                const welcomeChannel = member.guild.channels.get(settings.welcomeChannel);
                var memberavatar = member.user.avatarURL
    
                    if(settings.welcomeMessage !=null)
                    var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | Name ', `${member}`)
                    .addField(':microphone2: | Welcome!', `Welcome to the ${member.guild.name} server! `)
                    .addField(':microphone2: | Custom Welcome Message:', `${settings.welcomeMessage}`)
                    .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                    .setFooter(`Server: ${member.guild.name}`)
                    .setTimestamp()
    
                // console.log(message)
                welcomeChannel.send(embed)
            }
            if(settings.rulesChannel !=null && settings.sendRulesMessage == true) {
                const rulesChannel = member.guild.channels.get(settings.rulesChannel);
                var memberavatar = member.user.avatarURL
                if(member.guild.id === config.myGuild){
                    var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | Name ', `${member}`)
                    .addField(':microphone2: | Welcome!', 'Welcome to the Reaper Clan server!\nThank you for your interest in being apart of our community. **To gain full access to the server, we ask you to please read the rules below and accept them.** Once accepted, you will be taken to a sorting room, where the Admin team will be able to help and assist with any questions you may have.')
                    .addField(':white_check_mark: | **Rule. 1:**', 'As a first and foremost, to be accepted into this discord you must already be in the clan. This will be verified in the sorting room. ')
                    .addField(':white_check_mark: | **Rule. 2:**', 'Do not insult or harass other members of the clan, or outside of the clan. In doing so you will invoke administrative action.')
                    .addField(':white_check_mark: | **Rule. 3:**', 'The Admin team has an open door policy. The leaders of Reaper Clan are always available to discuss or answer questions and/or concerns.')
                    .addField(':white_check_mark: | **Rule. 4:**', 'Activity in game and in discord is required. If personal issues keep you from being active for 2+ weeks, please allow us to know. Random activity checks happen in form of a Discord roll call, please sign this if you wish to stay in the clan.')
                    .addField(':white_check_mark: | **Rule. 5:**', 'There are lots of rooms to talk in this Discord, please try to indulge in them all and use them for their specified purpose. Most of all, have fun with your fellow Reapers!')
                    .addField(':smiley: | **Please Note**', 'These are our rules, and need to be adhered to by all. If you have any questions about them, please ask an Admin by simply typing in this channel. If not please type **accept** to gain full access to the Discord Server, and be put into the sorting room. Thank you!')
                    .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                    .setFooter(`Server: ${member.guild.name}`)
                    .setTimestamp()
                }
                else{
                    var rules = settings.rulesMessage
                    var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | Name ', `${member}`)
                    .addField(':microphone2: | Welcome! Please read through and follow these rules:', `${rules}`)
                    .addField(':microphone2: | Accept', 'To accept these rules type: **accept**')
                    .setFooter(`Server: ${member.guild.name}`)
                    .setTimestamp()
                }
                rulesChannel.send(embed)
            }
        }
        if (settings.modLog != null) {
            var modLog = server.channels.get(settings.modLog)
            modLog.send({
                embed: invEmbed
            })
        }
    });
});


/*#################################################################################################################################################
###################################################################################################################################################
#########################  _  __  _                           ____           _                                       ##############################
######################### | |/ / | |   __ _   ___    __ _    / ___|    ___  | |__     ___   _ __ ___     __ _   ___  ##############################
######################### | ' /  | |  / _` | / __|  / _` |   \___ \   / __| | '_ \   / _ \ | '_ ` _ \   / _` | / __| ##############################
######################### | . \  | | | (_| | \__ \ | (_| |    ___) | | (__  | | | | |  __/ | | | | | | | (_| | \__ \ ##############################
######################### |_|\_\ |_|  \__,_| |___/  \__,_|   |____/   \___| |_| |_|  \___| |_| |_| |_|  \__,_| |___/ ##############################
#########################                                                                                            ##############################
###################################################################################################################################################
###################################################################################################################################################
*/

//Channels
KlasaClient.defaultGuildSchema.add('modLog', 'TextChannel');
KlasaClient.defaultGuildSchema.add('welcomeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('commWelcomeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('rulesChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('memeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('roastChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('sortationChannel', 'TextChannel');

//Yes or No's
KlasaClient.defaultGuildSchema.add('sendRulesMessage', 'Boolean', {default: false});
KlasaClient.defaultGuildSchema.add('sendWelcomeMessage', 'Boolean', {default: true}); 
KlasaClient.defaultGuildSchema.add('memberSorting', 'Boolean', {default: false});

//Strings
KlasaClient.defaultGuildSchema.add('welcomeMessage', 'String');
KlasaClient.defaultGuildSchema.add('rulesMessage', 'String');
KlasaClient.defaultGuildSchema.add('communityInvite', 'String');

//Roles
KlasaClient.defaultGuildSchema.add('communityRole', 'role');
KlasaClient.defaultGuildSchema.add('defaultRole', 'role');
KlasaClient.defaultGuildSchema.add('admin', 'role');
KlasaClient.defaultGuildSchema.add('sortation', 'role');

//Arrays
KlasaClient.defaultUserSchema.add('TODOs', 'any', { array: true });

//Bot Permissions
KlasaClient.defaultPermissionLevels
.add(0, () => true)
//Admins are level 6
.add(6, ({ guild, member }) => guild && guild.settings.admin != null && member.roles.has(guild.settings.admin))
//Server owner
.add(7, ({ guild, member }) => guild && member === guild.owner, { fetch: true })
//Bot owner with message
.add(9, ({ author, client }) => author === client.owner, { break: true })
//Bot owner without message
.add(10, ({ author, client }) => author === client.owner);

client.login(client.config.token);
