import { Client } from "discord.js";
import guildModel from "../models/guild";
import chalk from "chalk";
import { createGuildDoc } from "../functions/guildDocOps";
import { guildJoin as notifyOwner } from "../functions/ownerNotify";

export default (client: Client): void => {
	//actions to run when the bot joins a server
	client.on("guildCreate", async (guild) => {
		// Check if guild is available before running code
		if (guild.available) {
			// Find the guild's document
			const doc = await guildModel.findOne({ GUILD_ID: guild.id }); 

			// If the guild already has a document but the ACTIVE_GUILD field is false update to true
			if (doc !== null) {
				if (doc?.ACTIVE_GUILD === true) return;
				else {
					// Otherwise, set the ACTIVE_GUILD field to true
					doc.ACTIVE_GUILD = true;
					await doc.save();
				}
			} else {
				// Create the document for the guild
				createGuildDoc(client, guild);
			}
			// Log to the console that a new user was added to the database (e.g. a new user joined the server)
			console.log(chalk.yellow(`${client.user?.tag} joined ${guild.name}`));
			notifyOwner(client, guild);

		}
	});

	//actions to run when the bot leaves a server
	client.on("guildDelete", async (guild) => {
		if (guild.available) {
			if (guild.available) {
				// Find the guild's document
				const doc = await guildModel.findOne({ GUILD_ID: guild.id });

				// If the guild already has a document but the ACTIVE_GUILD field is false update to true
				if (doc !== null) {
					if (doc?.ACTIVE_GUILD === false) return;
					else {
						// Otherwise, set the ACTIVE_GUILD field to true
						doc.ACTIVE_GUILD = false;
						await doc.save();
					}
				} else {
					// Create the document for the guild
					createGuildDoc(client, guild);
				}
				// Log to the console that a new user was added to the database (e.g. a new user joined the server)
				console.log(chalk.yellow(`${client.user?.tag} left ${guild.name}`));
			}
		}
	});

	client.on("guildUpdate", (oldGuild, newGuild) => {
		if (newGuild.available) {
            // Find the guild's document
            const doc = guildModel.findOne({ GUILD_ID: newGuild.id });
            //! DO STUFF HERE
		}
	});
};

export const config = {
	dbName: "GUILD_EVENTS",
	displayName: "Guild Events",
};
