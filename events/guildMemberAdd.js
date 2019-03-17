const {
	Event
} = require('klasa');

module.exports = class extends Event {

	run(member) {
        const Discord = require('discord.js')
		const settings = member.guild.settings

		if (settings.defaultRole != null) {
			// console.log(member)
			member.roles.add(settings.defaultRole);
			return
        }
        if(settings.welcomeChannel !=null && settings.sendWelcomeMessage == true) {
            var welcomeChannel = settings.welcomeChannel
            var memberavatar = member.user.avatarURL
            if(member.guild.id === config.myGuild){
                var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(memberavatar)
                .addField(':bust_in_silhouette: | name: ', `${member}`)
                .addField(':microphone2: | Welcome!', 'Welcome to the Reaper Clan server!\nPlease feel free to tell us about yourself in the <#524619664462970886> tab to introduce yourself to your fellow Reapers!\nTake a look around and dont forget to check out our <#526258822663241741> tab for more information.\nIf your Discord name is different to yur GamerTag please change your nickname to resemble to your Xbox profile, followed by your timezone. IE: GamerTag (timezone). or ask an Admin Enjoy The reaper clan!')
                .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                .setFooter(`Server: ${member.guild.name}`)
                .setTimestamp()
            }
            else{
                if(settings.welcomeMessage !=null)
                var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(memberavatar)
                .addField(':bust_in_silhouette: | name: ', `${member}`)
                .addField(':microphone2: | Welcome!', `Welcome to the ${member.guild.name} server! `, `${settings.welcomeMessage}`)
                .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                .setFooter(`Server: ${member.guild.name}`)
                .setTimestamp()
                else{
                    var embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(memberavatar)
                    .addField(':bust_in_silhouette: | name: ', `${member}`)
                    .addField(':microphone2: | Welcome!', `Welcome to the ${member.guild.name} server!`)
                    .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                    .setFooter(`Server: ${member.guild.name}`)
                    .setTimestamp()
                }
            }
            // console.log(message)
            welcomeChannel.send(embed)
        }
        if(settings.rulesChannel !=null && settings.sendRulesMessage == true) {
            var rulesChannel = settings.rulesChannel
            var memberavatar = member.user.avatarURL
            if(member.guild.id === config.myGuild){
                var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(memberavatar)
                .addField(':bust_in_silhouette: | name: ', `${member}`)
                .addField(':microphone2: | Welcome!', 'Welcome to the Reaper Clan server!\nThank you for your interest in being apart of our community. **To gain full access to the server, we ask you to please read the rules below and accept them.** Once accepted, you will be taken to a sorting room, where the Admin team will be able to help and assist with any questions you may have.')
                .addField(':white_check_mark: | **Rule. 1:**', 'As a first and foremost, to be accepted into this discord you must already be in the clan. This will be verified in the sorting room. ')
                .addField(':white_check_mark: | **Rule. 2:**', 'Do not insult or harass other members of the clan, or outside of the clan. In doing so you will invoke administrative action.')
                .addField(':white_check_mark: | **Rule. 3:**', 'The Admin team has an open door policy. The leaders of Reaper Clan are always available to discuss or answer questions and/or concerns.')
                .addField(':white_check_mark: | **Rule. 4:**', 'Activity in game and in discord is required. If personal issues keep you from being active for 2+ weeks, please allow us to know. Random activity checks happen in form of a Discord roll call, please sign this if you wish to stay in the clan.')
                .addField(':white_check_mark: | **Rule. 5:**', 'There are lots of rooms to talk in this Discord, please try to indulge in them all and use them for their specified purpose. Most of all, have fun with your fellow Reapers!')
                .addField(':smiley: | **Please Note**', 'These are our rules, and need to be adhered to by all. If you have any questions about them, please ask an Admin by simply typing in this channel. If not please type **-accept** to gain full access to the Discord Server, and be put into the sorting room. Thank you!')
                .addField(':family_mwgb: | You are member number:', `${member.guild.memberCount}`)
                .setFooter(`Server: ${member.guild.name}`)
                .setTimestamp()
            }
            else{
                var rules = settings.rulesMessage
                var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail(memberavatar)
                .addField(':bust_in_silhouette: | name: ', `${member}`)
                .addField(':microphone2 | Welcome! Please read through and follow these rules:', `${rules}`)
                .setFooter(`Server: ${member.guild.name}`)
                .setTimestamp()
            }
            rulesChannel.send(embed)
        }
    }
};