import { Message, Interaction, TextChannel, ApplicationCommand } from "discord.js";
import chalk from "chalk";

function guildMessage(message: Message): void {
    // Make sure the message is not from a bot
    if (message.author.bot) return;
	// Make sure that a message is not from a channel of type: DM
	if (message.channel.type !== "GUILD_TEXT") return;
	if (!message.guild) return;
    // Log the message to the console
	console.log(`${chalk.red.bold(`[M]`)} ${chalk.green(`[${message.guild.name}]`)} ${chalk.blue(`[${message.channel.name}]`)} ${chalk.yellow(`[${message.author.username}]`)} ${chalk.grey.bold(`--`)} ${chalk.cyan(`[${message.content}]`)}`);
}

function dmMessage(message: Message): void {
    // Make sure the message is not from a bot
    if (message.author.bot) return;
    // Make sure that a message is from a channel of type: DM
    if (message.channel.type !== "DM") return;
    // Log the message to the console
    console.log(`${chalk.green(`[DM]`)} ${chalk.blue(`[${message.author.username}]`)} ${chalk.grey.bold(`--`)} ${chalk.cyan(`[${message.content}]`)}`);
}

function applicationCommand(interaction: Interaction): void {
    // Make sure the message is not from a bot
    if (interaction.user.bot) return;
    // Make sure that the command is from a guild
    if (!interaction.isApplicationCommand()) return;
    if (!interaction.guild) return;
    
    // Init some vars
    const command = interaction.command as ApplicationCommand;
    const guildName = interaction.guild.name;
    const chan = interaction.channel as TextChannel;
    const channelName = chan.name;
    const authorName = interaction.user.username;
    const commandName = command.name;

    console.log(`${chalk.red.bold(`[AC]`)} ${chalk.green(`[${guildName}]`)} ${chalk.blue(`[${channelName}]`)} ${chalk.yellow(`[${authorName}]`)} ${chalk.grey.bold(`--`)} ${chalk.cyan(`[${commandName}]`)}`);
}

export = { guildMessage, dmMessage, applicationCommand };