import { execute, newLine } from "../command/commandHandler";
import { getCommand } from "../command/commandUtils";
import { jsxToHtmlElement } from "../jsx/conversion";
import { autoComplete } from "./autoCompleter";
import { handleControl } from "./controlHandling";
import { parse } from "./syntaxHandler";
import React from "react";

interface File {
	name: string;
	exec: (args: string[]) => void;
	permissions: string;
	owner: string;
	size: number;
}

export const files = [
	// {
	//     name: "about-me",
	//     url: ""
	// },
	{
		name: "about-me",
		exec: (args) => {
			const terminal = document.getElementById("terminal");
			terminal?.append(
				"hi! i'm nptr, a 14 year old developer from the uk. i like to code in typescript, and i'm currently learning rust. i like to play csgo in my free time. i love tv girl!! <3"
			);
		},
		permissions: "lrwxr-xr-x",
		owner: "maddie",
	},
	{
		name: "contact-me",
		exec: (args) => {
			const terminal = document.getElementById("terminal");
			window.open("mailto:maddie@moondust.dev");
		},
		permissions: "lrwxr-xr-x",
		owner: "maddie",
		size: 1853,
	},
] as File[];

const inputtedCommands = [] as string[];
let historyNumber = 0;

function modifierKeyHandler(key: string, text: string): string {
	switch (key) {
		case "Backspace": {
			return text.slice(0, text.length - 1);
		}
		case "Enter": {
			execute(text);
			!getCommand(text.trim().replace("./", "./ ").split(" ")[0])?.dontNewline
				? newLine()
				: null;
			if (text !== "") inputtedCommands.push(text);
			historyNumber = inputtedCommands.length;
			return "";
		}
		case "Tab": {
			return autoComplete(text);
		}
		case "ArrowUp": {
			if (historyNumber === 0) return text;
			historyNumber--;
			return inputtedCommands[historyNumber];
		}
		case "ArrowDown": {
			if (historyNumber === inputtedCommands.length) return text;
			historyNumber++;
			return inputtedCommands[historyNumber] || "";
		}
		default: {
			return text;
		}
	}
}

function shouldType(key: string): boolean {
	return [...Array(95).keys()]
		.map((i) => String.fromCharCode(i + 32))
		.includes(key);
	// ^ see https://stackoverflow.com/a/71085063
}

export function type(e: KeyboardEvent) {
	e.preventDefault();
	const input = document.getElementById("input")!;
	let text = input.innerText;
	if (!shouldType(e.key)) {
		text = modifierKeyHandler(e.key, text);
	} else if (e.ctrlKey) {
		handleControl(e.key);
	} else {
		text += e.key;
	}
	const tokens = parse(text);
	console.log(tokens);
	input.innerHTML = ""; // kind of bad
	tokens.forEach((token) =>
		input.append(
			jsxToHtmlElement(<span className={token.type}>{token.content}</span>)
		)
	);
	const terminal = document.getElementById("terminal")!;
	terminal.scrollTop = terminal.scrollHeight;
}
