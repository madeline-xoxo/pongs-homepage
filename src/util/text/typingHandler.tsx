import { execute, newLine } from "../command/commandHandler";
import { getCommand } from "../command/commandUtils";
import { jsxToHtmlElement } from "../jsx/conversion";
import { autoComplete } from "./autoCompleter";
import { handleControl } from "./controlHandling";
import { parse } from "./syntaxHandler";
import React from "react";

interface File {
	name: string;
	url: string;
	permissions: string;
	owner: string;
	size: number;
	openCurrent?: boolean;
}

export const files = [
	{
		name: "auditionjs",
		url: "https://b0ss.net/meme/auditionjs",
		permissions: "lrwxr-xr-x",
		owner: "root",
		size: 16
	},
	{
		name: "email",
		url: "mailto:qj@b0ss.net",
		openCurrent: true,
		permissions: "lrwxr-xr-x",
		owner: "root",
		size: 62
	},
	{
		name: "old_homework",
		url: "https://m4th.b0ss.net",
		permissions: "lrwxr-xr-x",
		owner: "root",
		size: 13
	},
	{
		name: "homework",
		url: "https://m5th.b0ss.net",
		permissions: "lrwxr-xr-x",
		owner: "root",
		size: 13
	},
	{
		name: "rice",
		url: "https://b0ss.net/rice",
		openCurrent: true,
		permissions: "lrwxr-xr-x",
		owner: "root",
		size: 764
	}
] as File[];

function modifierKeyHandler(key: string, text: string): string {
	switch (key) {
	case "Backspace": {
		return text.slice(0, text.length - 1);
	}
	case "Enter": {
		execute(text);
		!getCommand(text.trim().replace("./", "./ ").split(" ")[0])?.dontNewline ? newLine() : null;
		return "";
	}
	case "Tab": {
		return autoComplete(text);
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
	tokens.forEach(token => input.append(jsxToHtmlElement(<span className={token.type}>{token.content}</span>)));
	const terminal = document.getElementById("terminal")!;
	terminal.scrollTop = terminal.scrollHeight;
}