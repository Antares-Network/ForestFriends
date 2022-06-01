import { Client } from "discord.js";
import userModel from "../models/user";

async function userDocCheck(client: Client) {
	client.users.cache.forEach(async (user) => {
        console.log("test")
		const doc = await userModel.findOne({ USER_ID: user.id });
        //console.log(doc)
		if (doc === null) {
			const newUser = new userModel({
				USER_ID: user.id,
				USERNAME: user.username,
				IS_GUILD_OWNER: false,
				OWNED_GUILD_IDS: [],
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
				console.log(`New user imported on boot: ${user.username}`);
			});
		}
	});
}

export = userDocCheck;