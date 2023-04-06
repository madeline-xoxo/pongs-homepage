import { parse } from "./syntaxHandler";

function newLine() {
    document.getElementById("input")!.id = "";
    document.getElementById("terminal")!.innerHTML += "<div class=\"line\"><span class=\"hostname\">[madeline@b0ss.net <span class=\"directory\">~</span>]</span><span class=\"bash\">$ </span><span id=\"input\"><span class=\"command\"></span><span class=\"param\"></span></span></div>";
}

function modifierKeyHandler(key: string, text: string): string {
	switch (key) {
	case "Backspace": {
		return text.slice(0, text.length - 1);
	}
	case "Enter": {
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
	const terminal = document.getElementById("terminal")!;
	terminal.scrollTop = terminal.scrollHeight;
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
}