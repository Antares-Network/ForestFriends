
import { MessageEmbed, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import log from "../../functions/log";

export default {
  name: "ping",
  category: "user",
  description: "Sends the ping time of the bot.",
  slash: true,
  testOnly: true,
  guildOnly: true,
  requiredPermissions: ["SEND_MESSAGES"],

  callback: async ({ client, interaction,  }) => {
    const Embed = new MessageEmbed()
        .setColor("#29f498")
        .setTitle("Bot/API Ping")
        .setDescription(`Ping: 🏓 | Latency is: **${client.ws.ping}**ms.`)
        .setFooter({
			text: `Delivered in: ${client.ws.ping}ms | Forest Friends | ${process.env.VERSION}`,
			iconURL: `https://playantares.com/resources/forestfriends/icon.png`,
		});
        log.applicationCommand(interaction);

    interaction.reply({ embeds: [Embed] });
    
  },
} as ICommand;