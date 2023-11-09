export class Skills {
	list: string[];
	constructor(input: string[], skillList: string[]) {
		const validSkills = new Set(skillList);
		this.list = Array.from(
			new Set(input.filter((skill) => validSkills.has(skill)))
		);
	}
}
