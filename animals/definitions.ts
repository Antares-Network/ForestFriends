import { ColorResolvable }  from 'discord.js';
export class Animal {
	name: string;
	image: string;
	apiUrl: string;
	jsonField: string;
    embedColor: ColorResolvable;

	constructor(name: string, image: string, apiUrl: string, jsonField: string, embedColor: ColorResolvable) {
		this.name = name;
		this.image = image;
		this.apiUrl = apiUrl;
		this.jsonField = jsonField;
        this.embedColor = embedColor
	}
}


// Animal definitions
const Fox = new Animal("Fox", "https://randomfox.ca/images/93.jpg", "https://randomfox.ca/floof/", "image", "#29f498");
const Duck = new Animal("Duck", "https://random-d.uk/api/42.jpg", "https://random-d.uk/api/v2/random", "url", "#29f498");
const Panda = new Animal("Panda", "https://i.imgur.com/fClJeO6.jpg", "https://some-random-api.ml/img/panda", "link", "#29f498");
const RedPanda = new Animal("Red Panda", "https://i.imgur.com/kykYx33.png", "https://some-random-api.ml/img/red_panda", "link", "#29f498");
const Koala = new Animal("Koala", "https://i.some-random-api.ml/7RYcg5S3Kc.jpg", "https://some-random-api.ml/img/koala", "link", "#29f498");
const Bird = new Animal("Bird", "https://i.some-random-api.ml/WibVulitkR.jpg", "https://some-random-api.ml/img/birb", "link", "#29f498");
const Raccoon = new Animal("Raccoon", "https://i.some-random-api.ml/xnATuponsc.png", "https://some-random-api.ml/img/raccoon", "link", "#29f498");
const Kangaroo = new Animal("Kangaroo", "https://i.some-random-api.ml/PXNM1TwY7k.jpg", "https://some-random-api.ml/img/kangaroo", "link", "#29f498");
const Cat = new Animal("Cat", "https://cdn.some-random-api.ml/zrvw15qX", "https://aws.random.cat/meow", "file", "#29f498");
const Dog = new Animal("Dog", "https://cdn.some-random-api.ml/6WE_2Chg", "https://dog.ceo/api/breeds/image/random", "message", "#29f498");


export const definitions = [Fox, Duck, Panda, RedPanda, Koala, Bird, Raccoon, Kangaroo, Cat, Dog];