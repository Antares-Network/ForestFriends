import { Client, User } from "discord.js";
import userModel from "../models/user";

export async function bootCheck(client: Client) {
	client.users.cache.forEach(async (user) => {
		if (await checkIfUserDocExists(user)) {
			createUserDoc(client, user, "on boot");
		}
	});
}

export async function checkIfUserDocExists(user: User): Promise<Boolean> {
	if (user.bot) return false;
	const doc = await userModel.findOne({ USER_ID: user.id });
	if (doc === null) {
		return true;
	} else {
		return false;
	}
}

export async function createUserDoc(client: Client, user: User,onBoot: String = "") {
	// Init some variables for use later
	let isGuildOwner = false;
	// Check what servers the user owns if any
	const ownedServers = client.guilds.cache.filter((guild) => guild.ownerId === user.id);
	const ownedGuildIds = ownedServers.map((guild) => guild.id);

	// Set the isGuildOwner variable to true if the user is the owner of any servers
	if (ownedGuildIds.length > 0) {
		isGuildOwner = true;
	}

	const newUser = new userModel({
		USER_ID: user.id,
		USERNAME: user.username,
		IS_GUILD_OWNER: isGuildOwner,
		OWNED_GUILD_IDS: ownedGuildIds,
		SEND_ENABLED: false,
		ENABLED_ANIMALS: [],
		ENABLED_CHANNEL_TYPE: null,
		ENABLED_TEXT_CHANNEL_IDS: [],
		SEND_INTERVAL: 600,
		LAST_SEND_DATE: null,
		TOTAL_IMAGES_SENT: 0,
		TOTAL_COMMANDS_USED: 0,
		TOTAL_WEB_DASHBOARD_LOGINS: 0,
		DATE_OF_LAST_SETTINGS_CHANGE: null,
		DATE_OF_USER_IMPORT: new Date(),
		USER_IN_ACTIVE_GUILD: true,
	});
	await newUser.save().then(() => {
		console.log(`New user imported ${onBoot}: ${user.username}`);
	});
}