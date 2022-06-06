import axios from "axios";
import { Client, MessageEmbed } from "discord.js";
import { Animal, definitions } from "../animals/definitions";


const noTarget = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle("No valid target specified")
    .setDescription("Please specify a valid target from which to get a random image.");

export async function send(client: Client, type: string): Promise<MessageEmbed>  {
	// Check if the animal type provided is valid
	const animal = definitions.find((animal: Animal) => animal.name === type);
	if (!animal) return noTarget;

    // Get the image url from the api
	const imageUrl = await axios.get(animal.apiUrl).then((res) => new Function("return " + res.data + "." + animal.jsonField)());

    // Create the embed
	const embed = new MessageEmbed()
		.setTitle(`Forest Friends: ${animal}`)
		.setImage(imageUrl)
		.setColor(animal.embedColor)
		.setFooter({
			text: `Delivered in: ${client.ws.ping}ms | Forest Friends | ${process.env.VERSION}`,
			iconURL: `https://playantares.com/resources/forestfriends/icon.png`,
		});
    
    return embed;
}
