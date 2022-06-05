import { Client, Guild, MessageEmbed } from "discord.js";
import guildModel from "../models/guild";

export async function guildJoin(client: Client, guild: Guild) {
	// Init date var, look for the guild doc if it exists
	const d = new Date();
	const doc = await guildModel.findOne({ GUILD_ID: guild.id });
	const ownerUsername = guild.members.cache.get(guild.ownerId)?.user.username || "Unknown";

	const Embed = new MessageEmbed()
		.setColor("#29f498")
		.setTitle(`I Joined a Server`)
		.setThumbnail(String(guild.iconURL() || "https://cdn.discordapp.com/embed/avatars/0.png"))
		.addFields([
			{ name: "Guild Creation Date:", value: guild.createdAt.toString() },
			{ name: "Guild Leave Date:", value: d.toString() },
			{ name: "Guild Name:", value: guild.name },
			{ name: "Guild ID:", value: guild.id },
			{ name: "Guild Owner:", value: ownerUsername },
			{ name: "Owner ID:", value: guild.ownerId },
			{ name: "Guild Member Count:", value: guild.memberCount.toString() },
		])
		.setFooter({
			text: `Delivered in: ${client.ws.ping}ms | Forest Friends | ${process.env.VERSION}`,
			iconURL: `https://playantares.com/resources/forestfriends/icon.png`,
		});

	client.users.fetch(String(process.env.BOT_OWNER_ID)).then((user) => {
		user.send({ embeds: [Embed] });
	});
}
