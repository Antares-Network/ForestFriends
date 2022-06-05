import { Client } from "discord.js";
import log from "../functions/log";


export default (client: Client): void => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        // Log the message to the console
        if (message.channel.type === "DM") {
            log.dmMessage(message);
        }
        if (message.channel.type === "GUILD_TEXT") {
            log.guildMessage(message);
        }
    });
}

export const config = {
	dbName: "MESSAGE_EVENT_HANDLER",
	displayName: "Message Event Handler",
};