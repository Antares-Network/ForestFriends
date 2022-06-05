import chalk from "chalk";
import botModel from "../models/bot";
import { Client } from "discord.js";

async function event(client: Client) {
    console.log(chalk.green("Connected to MongoDB"));
    // Print some bot stats
    console.log(`${chalk.yellow("I am in")} ${chalk.green((await client.guilds.fetch()).size)} ${chalk.yellow("servers")}`);
    try {
        const gate = await botModel.findOne({ BOT_ID: process.env.BOT_ID });
        console.log(`${chalk.yellow("I am being used by")} ${chalk.green(gate.TOTAL_USERS)} ${chalk.yellow("users")}`);
    } catch (e) {
        console.log(e);
    }
}

export = { event };