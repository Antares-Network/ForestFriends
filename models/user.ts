import mongoose, { Schema } from "mongoose";

const USER = new Schema({
  //! User Data
  id: String, // DB Object ID
  USERNAME: String, // Username with discriminator
  USER_ID: String, // Discord User ID
  IS_GUILD_OWNER: Boolean, // Is the user the owner of the guild
  OWNED_GUILD_IDS: Array, // Array of guild ids that the user owns (if any)

  //! Preferences Data
  SEND_ENABLED: Boolean, // If send is enabled for this user
  ENABLED_ANIMALS: Array, // Array of names of animals as strings
  ENABLED_CHANNEL_TYPE: String, // 'TEXT' or 'DM'
  ENABLED_TEXT_CHANNEL_IDS: Array, // May be 'Null' if sends are enabled in 'DM' channel
  SEND_INTERVAL: Number, // In seconds. Can not be less than 600 (10 minutes)
  LAST_SEND_DATE: Date, // Date of last send (for interval)

  //! Statistics Data
  TOTAL_IMAGES_SENT: Number, // Total number of images sent as a Number
  TOTAL_COMMANDS_USED: Number, // Total number of commands used as a Number
  TOTAL_WEB_DASHBOARD_LOGINS: Number, // Total number of web dashboard logins as a Number
  DATE_OF_LAST_SETTINGS_CHANGE: Date, // Date of last settings change

  //! Authentication Data:
  //? No Data Yet
});

const name = "user";

export = mongoose.models[name] || mongoose.model(name, USER, name);
