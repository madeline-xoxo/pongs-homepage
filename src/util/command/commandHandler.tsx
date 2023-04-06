export const commands: Command[] = [];

export class Command {
	name: string;
	callback: (args: string[]) => void | boolean;
	constructor(name: string, callback: (args: string[]) => void | boolean) {
		this.name = name;
		this.callback = callback;
		commands.push(this);
	}
}

export function newLine() {
    document.getElementById("input")!.id = "";
    document.getElementById("terminal")!.innerHTML += "<div class=\"line\"><span class=\"hostname\">[madeline@b0ss.net <span class=\"directory\">~</span>]</span><span class=\"bash\">$ </span><span id=\"input\"><span class=\"command\"></span><span class=\"param\"></span></span></div>";
}

export function execute(text: string) {
	const parsed = text.replace("./", "./ ").split(" ");
	const terminal = document.getElementById("terminal");
	commands.find(command => {
		if (command.name === parsed[0]) {
			command.callback(parsed.slice(1));
			return;
		}
	});
}