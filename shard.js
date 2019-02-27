const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./app.js');
const fetch = require('node-fetch');
const config = require("./config.json");
var shards = 1
Manager.spawn(shards);
Manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));