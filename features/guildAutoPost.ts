import { Client } from "discord.js";
import guildModel from "../models/guild";


//! NOTES / TO DO: 
//todo FIX SPAGHETTI CODE
//todo ADD ERROR HANDLING IF DOC DOSEN'T EXIST
//todo ADD LOGIC FOR IF THE BOT WENT OFFLINE IN THE MIDDLE OF AN INTERVAL



export default async (client: Client) => {
	function loop() {
		// Loop through the list of all guilds
		client.guilds.cache.forEach(async (guild) => {
			
			const doc = await guildModel.findOne({ GUILD_ID: guild.id });
			const interval = doc.SEND_INTERVAL;
			
			function post() {
				console.log(`Checking guild ${guild.name}`);
				// Get the list of enabled channels
				const enabledChannels = doc?.ENABLED_TEXT_CHANNEL_IDS;
				// Loop through the list of enabled channels
				enabledChannels.forEach(async (channelId: string) => {
					// Get the channel
					const channel = guild.channels.cache.get(channelId);
					// If the channel is not found, then return
					if (!channel) return;
					// If the channel is not a text channel, then return
					if (channel.type !== "GUILD_TEXT") return;
					// Send a message in the channel
					channel.send("Hello World");

					//! Update the db with the date and time of last send so when the bot reboots, it knows when to start sending again
				});
				setTimeout(post, interval * 1000);
			};
			post();
		});
	}
	loop();
};

export const config = {
	dbName: "GUILD_AUTO_POST",
	displayName: "Guild Auto Post",
};

// // Get the doc for the guild
// const doc = await guildModel.findOne({ GUILD_ID: guild.id});

// // get the list of channel id's, and if there are none, then just return
// let enabledChannels = [];
// if (doc?.ENABLED_TEXT_CHANNEL_IDS.length > 0) {
//     enabledChannels = doc.ENABLED_TEXT_CHANNEL_IDS;
// } else return;

// // Get the SEND_INTERVAL field from the doc
// let interval = doc?.SEND_INTERVAL;
