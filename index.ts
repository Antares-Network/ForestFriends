import DiscordJs, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import dotenv from "dotenv";
import chalk from "chalk";
import dbConnected from "./boot_func/dbConnected";
import { bootCheck as userBootCheck } from "./functions/userDocOps";
import { bootCheck as guildBootCheck }from "./functions/guildDocOps";
import { bootCheck as botBootCheck } from "./functions/botDocOps";
dotenv.config();

//Create a new discord client
const client = new DiscordJs.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]
});

client.on("ready", () => {
	if (client.user) console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\nLogged in as ${chalk.magenta(client.user.tag)}`);

	//give WOK a db connection
	const dbOptions = {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	//create the WOK client object
	const wok = new WOKCommands(client, {
		commandsDir: path.join(__dirname, "commands"),
		featuresDir: path.join(__dirname, "features"),
		typeScript: true,
		testServers: ["788541416740487218"],
		dbOptions,
		mongoUri: String(process.env.BOT_MONGO_PATH),
		disabledDefaultCommands: ["help", "language"],
		botOwners: ["603629606154666024"],
	}).setDefaultPrefix(String(process.env.BOT_DEFAULT_PREFIX));

	wok.on("databaseConnected", async () => {
		dbConnected.event(client);
		guildBootCheck(client);
		userBootCheck(client);
		botBootCheck(client);
	});
});

client.login(process.env.BOT_TOKEN).catch((error) => {
    console.log(chalk.red.bold(`There was an error connecting to the Discord`));
    console.error(error);
    process.exit(1);
  });
  
  //! deal with errors to the console and how to exit gracefully
  client.on("error", console.error);
  client.on("warn", (e) => console.warn(e));
  process.on("exit", (code) => {
    console.log("Now exiting...");
    console.log(`Exited with status code: ${code}`);
  }); //!wtf this is really poor coding
  process.on("unhandledRejection", (promise, reason) => {
    console.error("Unhandled promise rejection:", promise, "\nreason", reason);
  });