import { Skills } from './skill';

export class Employee {
	name: string;
	skills: Skills;
	constructor(name: string, skills: Skills) {
		this.name = name;
		this.skills = skills;
	}

	greet() {
		console.log(
			`My name is ${this.name} and I am skilled at ${this.skills.list
				.map((skill) => `${skill}`)
				.join(' , ')}`
		);
	}
}
