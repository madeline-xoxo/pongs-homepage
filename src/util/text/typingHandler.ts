import { execute, newLine } from "../command/commandHandler";
import { parse } from "./syntaxHandler";

function modifierKeyHandler(key: string, text: string): string {
	switch (key) {
	case "Backspace": {
		return text.slice(0, text.length - 1);
	}
	case "Enter": {
		execute(text);
		newLine();
		return "";
	}
	default: {
		return text;
	}
	}
}

function shouldType(key: string): boolean {
	return [...Array(95).keys()].map(i => String.fromCharCode(i + 32)).includes(key);
	// ^ see https://stackoverflow.com/a/71085063
}

export function type(e: KeyboardEvent) {
	const input = document.getElementById("input")!;
	let text = input.innerText;
	if (!shouldType(e.key)) {
		text = modifierKeyHandler(e.key, text);
	} else {
		text += e.key;
	}
	const [command, parameters] = parse(text);
	input.innerHTML = ""; // kind of bad
	input.append(command, parameters);
	const terminal = document.getElementById("terminal")!;
	terminal.scrollTop = terminal.scrollHeight;
}