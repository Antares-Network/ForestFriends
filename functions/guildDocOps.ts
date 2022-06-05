import { Client, Guild } from "discord.js";
import guildModel from "../models/guild";

export async function bootCheck(client: Client) {
	client.guilds.cache.forEach(async (guild) => {
		if (await checkIfGuildDocExists(guild)) {
			createGuildDoc(client, guild, "on boot");
		}
	});

	//! Add a check for if a guild has a document but is not in an active server, then set the ACTIVE_GUILD field to false
    //! This would happen for example if a guild kicks the bot while the bot is offline
}

export async function checkIfGuildDocExists(guild: Guild): Promise<Boolean> {
	const doc = await guildModel.findOne({ GUILD_ID: guild.id });
	if (doc === null) {
		return true;
	} else {
		return false;
	}
}

export async function createGuildDoc(client: Client, guild: Guild,onBoot: String = "") {

    const ownerUsername = guild.members.cache.get(guild.ownerId)?.user.username;

	const newUser = new guildModel({
        GUILD_ID: guild.id,
        GUILD_NAME: guild.name,
        OWNER_ID: guild.ownerId,
        OWNER_USERNAME: ownerUsername,
        SEND_ENABLED: false,
        ENABLED_ANIMALS: [],
        ENABLED_TEXT_CHANNEL_IDS: [],
        SEND_INTERVAL: 600,
        LAST_SEND_DATE: null,
        TOTAL_IMAGES_SENT: 0,
        TOTAL_COMMANDS_USED: 0,
        TOTAL_GUILD_USERS: guild.memberCount,
        TOTAL_GUILD_MESSAGES: 0,
        GUILD_JOIN_DATE: new Date(),
        GUILD_CREATE_DATE: guild.createdAt,
        DATE_OF_LAST_SETTINGS_CHANGE: null,
        ACTIVE_GUILD: true
        });
	await newUser.save().then(() => {
		console.log(`New guild imported ${onBoot}: ${guild.name}`);
	});
}