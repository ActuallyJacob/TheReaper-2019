const {
	Event
} = require('klasa');
const config = require('../config.json');

module.exports = class extends Event {

	run(message) {

        const guildMember = message.member;
        var memberavatar = guildMember.user.avatarURL
        let server = message.guild;
        const settings = server.settings;
        let reaperRole = server.roles.find(role => role.name === "The Reaper");
        const reaperID = reaperRole.id;

        if(message.channel.name === "roll-call"){
            if (!guildMember.roles.some(r=>[settings.admin, reaperID].includes(r.id)) ){
                message.delete().catch(O_o=>{});
                let rRole = server.roles.find(role => role.name === 'Roll Call');
                guildMember.roles.remove(rRole)
                .then(message => console.log(chalk.green(`${message.user.username} Just signed the Roll Call!`)))
                .catch(console.error(chalk.red));
                }
            }

            else{
                return;
            }

            //this is really only for my server
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
        }
    }