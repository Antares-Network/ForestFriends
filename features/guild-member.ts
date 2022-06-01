import { Client } from "discord.js";
import userModel from "../models/user";
import chalk from "chalk";
import { createUserDoc } from "../functions/userDocOps";

export default (client: Client): void => {
	// needs GUILD_MEMBER intent which is privileged
	client.on("guildMemberRemove", async (member) => {
		// return if the user is a bot
		if (member.user.bot) return;

		// Find the user's document
		const doc = await userModel.findOne({ USER_ID: member.id });

		// If the user is already listed as not being in an active guild, return
		if (doc?.USER_IN_ACTIVE_GUILD === false) return;
		else {
			// Otherwise, set the USER_IN_ACTIVE_GUILD field to false
			doc.USER_IN_ACTIVE_GUILD = false;
			await doc.save();
		}
		console.log(chalk.yellow(`${member.user.tag} left ${member.guild.name}`));
	});

	// needs GUILD_MEMBER intent which is privileged
	client.on("guildMemberAdd", async (member) => {
		// return if the user is a bot
		if (member.user.bot) return;

		// Find the user's document
		const doc = await userModel.findOne({ USER_ID: member.id });

		// If the user already has a document do this
		if (doc !== null) {
			// If the user is already listed as being in an active guild, return
			if (doc?.USER_IN_ACTIVE_GUILD === true) return;
			else {
				// Otherwise, set the USER_IN_ACTIVE_GUILD field to true
				doc.USER_IN_ACTIVE_GUILD = true;
				await doc.save();
			}
		} else {
			createUserDoc(client, member.user);
		}
		console.log(chalk.yellow(`${member.user.tag} joined ${member.guild.name}`));
	});
};

export const config = {
	dbName: "GUILD_MEMBER_EVENTS",
	displayName: "Guild Member Events",
};
