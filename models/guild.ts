import mongoose, { Schema } from "mongoose";

const GUILD = new Schema({
	//! GUILD Data
	id: String, // DB Object ID
	GUILD_ID: Number, // Discord Guild ID
	GUILD_NAME: String, // Guild Name
	OWNER_ID: Number, // Discord User ID
	OWNER_USERNAME: String, // Username with discriminator

	//! Preferences Data
	SEND_ENABLED: Boolean, // If send is enabled for this guild
	ENABLED_ANIMALS: Array, // Array of names of animals as strings
	ENABLED_TEXT_CHANNEL_IDS: Array, // May be 'Null' if no sends are enabled for this guild
	SEND_INTERVAL: Number, // In seconds. Can not be less than 600 (10 minutes)
	LAST_SEND_DATE: Date, // Date of last send (for interval)

	//! Statistics Data
	TOTAL_IMAGES_SENT: Number, // Total number of images sent as a Number
	TOTAL_COMMANDS_USED: Number, // Total number of commands used as a Number
	TOTAL_GUILD_USERS: Number, // Total number of guild users as a Number
	TOTAL_GUILD_MESSAGES: Number, // Total number of guild messages as a Number
	GUILD_JOIN_DATE: Date, // Date of guild join
	GUILD_CREATE_DATE: Date, // Date of guild creation
	DATE_OF_LAST_SETTINGS_CHANGE: Date, // Date of last settings change
	ACTIVE_GUILD: Boolean, // If the guild is active (i.e. bot is in the guild)

	//! Authentication Data:
	//? No Data Yet
});

const name = "guild";

export = mongoose.models[name] || mongoose.model(name, GUILD, name);
