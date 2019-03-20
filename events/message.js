/*#################################################################################################################################################
###################################################################################################################################################
################  __  __                      _                       ____                   _             _     _                  ###############
################ |  \/  |   ___   _ __ ___   | |__     ___   _ __    / ___|    ___    _ __  | |_    __ _  | |_  (_)   ___    _ __   ###############
################ | |\/| |  / _ \ | '_ ` _ \  | '_ \   / _ \ | '__|   \___ \   / _ \  | '__| | __|  / _` | | __| | |  / _ \  | '_ \  ###############
################ | |  | | |  __/ | | | | | | | |_) | |  __/ | |       ___) | | (_) | | |    | |_  | (_| | | |_  | | | (_) | | | | | ###############
################ |_|  |_|  \___| |_| |_| |_| |_.__/   \___| |_|      |____/   \___/  |_|     \__|  \__,_|  \__| |_|  \___/  |_| |_| ###############
################                                                                                                                    ###############
###################################################################################################################################################
###################################################################################################################################################                                                                                                                   
*/

const { Event } = require('klasa');

module.exports = class extends Event {

	run(message) {
        if (this.client.ready) this.client.monitors.run(message);
        /////////////////////////////////////////////////////////////////////////////////
        const guildMember = message.member;
        //
        let server = message.guild;
        //
        const settings = server.settings;
        //
        let reaperRole = server.roles.find(role => role.name === "The Reaper");
        //
        const reaperID = reaperRole.id;
        //
        const sender = message.author;
        //
        const Discord = require ("discord.js");
        //
        const config = require('../config.json');
        //
        const channel = message.channel.id;
        //
        const chalk = require('chalk');
        /////////////////////////////////////////////////////////////////////////////////

        if(message.channel.name === "roll-call"){
            if (settings.admin != null){
                if (!guildMember.roles.some(role=>[settings.admin, reaperID].includes(role.id)) ){
                    message.delete().catch(O_o=>{});
                    let rRole = server.roles.find(role => role.name === 'Roll Call');
                    guildMember.roles.remove(rRole)
                    .then(message => console.log(chalk.green(`${message.user.username} Just signed the Roll Call!`)))
                    .catch(console.error(chalk.red));
                }
            }
            else{
                if (!guildMember.roles.some(role=>[reaperID].includes(role.id)) ){
                    message.delete().catch(O_o=>{});
                    let rRole = server.roles.find(role => role.name === 'Roll Call');
                    guildMember.roles.remove(rRole)
                    .then(message => console.log(chalk.green(`${message.user.username} Just signed the Roll Call!`)))
                    .catch(console.error(chalk.red));
                }
            }
        }
        else{
            return;
        }

        //this is really only for my server but can be used anywhere if set up properly
        if(message.channel.name === "about-me"){
            let nRole = server.roles.find(role => role.name === 'About Me');
            if(!guildMember.roles.some(r =>[nRole].includes(r.name)) ){
                guildMember.roles.add(nRole)
                .then(console.log(chalk.blue(`${message.author.username} Wrote in the #about-me. Good man.`)))
                .catch(console.error(chalk.red));
            }
            else{
                return;
            }
        }
        if(channel === settings.rulesChannel){
            message.delete().catch(O_o=>{});
            if(message.content.toLowerCase() === "accept"){
                let rMember = guildMember;
                var role = server.roles.find(role => role.id === settings.sortation);
                rMember.roles.add(role);
                message.reply("The Reaper welcomes you to the family.")
            
                if(server.id === config.myGuild){
                    server.channels.find(channel => channel.id === settings.sortationChannel).send (`<@${rMember}> Is in the sorting room! The Reaper requests you state your Xbox gamertag and Timezone. Additionally, if you have any questions for the Admin team before completing the sorting process and being removed from this channel, please let us know :smiley:`)
                    .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. We grow.`)))
                    .catch(console.error(chalk.red));
                }
            
                else{
                    server.channels.find(channel => channel.id === settings.sortationChannel).send(`${rMember} Is in the sorting room!`)
                    .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. We grow.`)))
                    .catch(console.error(chalk.red));
                }
            
                if(!settings.sortationChannel){
                    if (settings.defaultRole != null) {
                        // console.log(member)
                        rMember.roles.add(settings.defaultRole)
                        .then(console.log(chalk.yellow(`${message.author.username} Just accepted the rules and became a Reaper. They were given the ${settings.defaultRole} role.`)))
                        .catch(console.error(chalk.red));
                    }
                }
            
                else{
                    return message.channel.send("The server owner hasn't set up a default role. **COME ON MAN IDK.**")
                    .catch(console.error(chalk.red));
                }
            
                const accEmbed = new Discord.MessageEmbed()
                .setAuthor("TheReaper Moderation")
                .addField("Accepted Rules", `${sender.username} (${sender.tag})`)
                .setFooter("Sent via TheReaper")
                .setThumbnail(sender.displayAvatarURL())
                .setColor(0x9900FF);
                        
                if (settings.modLog != null) {
                    var modLog = server.channels.get(settings.modLog)
                    modLog.send({
                        embed: accEmbed
                    }).catch(err => console.log(err));
            
                }
                else{
                    return;
                }
            }
        }
	}
};