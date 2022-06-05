import { Client } from "discord.js";
import botModel from "../models/bot";

export async function bootCheck(client: Client) {
	if (await checkIfBotDocExists(client)) {
		createBotDoc(client, "on boot");
	}
}

export async function checkIfBotDocExists(client: Client): Promise<Boolean> {
	const doc = await botModel.findOne({ BOT_ID: client.user?.id });
	if (doc === null) {
		return true;
	} else {
		return false;
	}
}

export async function createBotDoc(client: Client, onBoot: String = "") {
	const newBot = new botModel({
		BOT_ID: client.user?.id,
		BANNED_GUILDS: [],
		TOTAL_MESSAGES: 0,
		TOTAL_SERVERS: client.guilds.cache.size,
		TOTAL_USERS: client.users.cache.size,
		AVAILABLE_ANIMALS: [],
		AVAILABLE_CHANNEL_TYPES: [],
		COUNT_ENABLED_CHANNELS: 0,
		COUNT_ENABLED_PER_CHANNEL_TYPE: [],
		COUNT_ENABLED_PER_ANIMAL: [],
		TOTAL_SENT_IMAGES: 0,
		TOTAL_RECEIVED_COMMANDS: 0,
	});

	await newBot.save().then(() => {
		console.log(`Bot doc recreated ${onBoot}`);
	});
}
