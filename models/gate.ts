import mongoose, { Schema } from "mongoose";

const BOT = new Schema({
	//! Bot Data
	id: String, // DB Object ID
	BANNED_GUILDS: Array, // Array of guild ids that are banned from using the bot
	TOTAL_MESSAGES: Number, // Total number of messages sent as a Number
	TOTAL_SERVERS: Number, // Total number of servers the bot is in as a Number
	TOTAL_USERS: Number, // Total number of users the bot is in as a Number

	//! Aggregate Data
	AVAILABLE_ANIMALS: Array, // Array of names of animals as strings
	AVAILABLE_CHANNEL_TYPES: Array, // Array of channel types as strings
	COUNT_ENABLED_CHANNELS: Number, // Number of enabled channels
	COUNT_ENABLED_PER_CHANNEL_TYPE: Number, // Number of enabled channels per channel type
	COUNT_ENABLED_PER_ANIMAL: Array, // Number of enabled channels per animal

	//! Statistics Data
	TOTAL_SENT_IMAGES: Number, // Total number of images sent as a Number
	TOTAL_RECEIVED_COMMANDS: Number, // Total number of commands used as a Number
});

const name = "bot";

export = mongoose.models[name] || mongoose.model(name, BOT, name);
