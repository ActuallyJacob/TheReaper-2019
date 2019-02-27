const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'chucknorris',
            enabled: true,
            runIn: ['text', 'dm'],
            bucket: 1,
            aliases: ['cn', 'cuck', 'norris'],
            permissionLevel: 0,
            requiredSettings: ['roastMemeChannel'],
            description: 'Get a 100% true Cuck Norris fact!',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...params]) {
    /*
    *Pre-requisits
    */
    /////////////////////////////////////////
    var server = message.guild;
    //
    var channel = message.channel.id
    //
    const settings = server.settings;
    //
    const Discord = require ("discord.js");
    //
    const MessageEmbed = require("discord.js");
    //
    const MessageAttachment = require("discord.js");
	//
    const sender = message.author.username;
    /////////////////////////////////////////
    if(channel !=(settings.roastMemeChannel)){
        return channel.send(`The Reaper says you can only use this command in ${settings.roastMemeChannel}.`)
    }
        
        const fetch = require('node-fetch')

        function checkStatus(res) {
            if (res.ok) { // res.status >= 200 && res.status < 300
                return res;
            } else {
                return message.reply('the Chuck Norris 100% true fact database seems to not be accessible at the moment.')
            }
        }

        fetch(`https://api.chucknorris.io/jokes/random`)
        .then(checkStatus)
        .then(res => res.json())
        .then(cn => {
        message.channel.send("**Chuck Norris Fact:** " + cn.value);
        })
    }
};