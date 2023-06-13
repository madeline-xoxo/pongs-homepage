import { parse } from "../text/syntaxHandler";
import { getCommand } from "./commandUtils";

export const commands: Command[] = [];

export class Command {
	name: string;
	callback: (args: string[]) => void | boolean;
	unlisted?: boolean;
	dontNewline?: boolean;
	constructor(
		name: string,
		callback: (args: string[]) => void | boolean,
		unlisted?: boolean,
		dontNewline?: boolean
	) {
		this.name = name;
		this.callback = callback.bind(this);
		this.unlisted = unlisted;
		this.dontNewline = dontNewline;
		commands.push(this);
	}
}

export function newLine(dontClear?: boolean, overrideIdChange?: boolean) {
	const input = document.getElementById("input")!;
	const terminal = document.getElementById("terminal")!;
	if (!overrideIdChange) input.id = "";
	terminal.innerHTML +=
		'<div class="line"><span class="hostname">[nptr@moondust.dev <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input"><span class="command"></span><span class="param"></span></span></div>';
	if (dontClear) {
		parse(input.innerText).forEach((token) =>
			document.getElementById("input")!.append(token.content)
		);
	}
}

export function execute(text: string) {
	const parsed = text.trim().replace("./", "./ ").split(" ");
	const terminal = document.getElementById("terminal");
	const command = getCommand(parsed[0], true);
	if (command) {
		command.callback(parsed.slice(1).filter((a) => a !== "" && a !== " "));
		return;
	}
	terminal?.append(`mash: ${parsed[0]}: command not found`);
}
