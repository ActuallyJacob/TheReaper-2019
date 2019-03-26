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

const config = require('./config.json');

const fs = require('fs');

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

/*
//Need to get an IdiotKey
const Idiot = require("idiotic-api");
client.idiotAPI = new Idiot.Client(client.config.idiotKey, {
    dev: true
});
*/

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

KlasaClient.defaultGuildSchema.add('modLog', 'TextChannel');
KlasaClient.defaultGuildSchema.add('welcomeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('rulesChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('memeChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('roastChannel', 'TextChannel');
KlasaClient.defaultGuildSchema.add('sortationChannel', 'TextChannel');

KlasaClient.defaultGuildSchema.add('sendRulesMessage', 'Boolean', {default: false});
KlasaClient.defaultGuildSchema.add('sendWelcomeMessage', 'Boolean', {default: true}); 
KlasaClient.defaultGuildSchema.add('memberSorting', 'Boolean', {default: false});

KlasaClient.defaultGuildSchema.add('welcomeMessage', 'String');
KlasaClient.defaultGuildSchema.add('rulesMessage', 'String');

KlasaClient.defaultGuildSchema.add('defaultRole', 'role');
KlasaClient.defaultGuildSchema.add('admin', 'role');
KlasaClient.defaultGuildSchema.add('sortation', 'role');


KlasaClient.defaultUserSchema.add('TODOs', 'any', { array: true });


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
