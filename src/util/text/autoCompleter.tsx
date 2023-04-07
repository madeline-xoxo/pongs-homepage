import { commands, newLine } from "../command/commandHandler";
import { jsxToHtmlElement } from "../jsx/conversion";
import { files } from "./typingHandler";
import React from "react";

interface Prediction {
	name: string;
	type?: "command" | "file"
}

export function autoComplete(text: string): string {
	const tokens = text.split(" ");
	const tokenWeCareAbout = tokens.slice(-1)[0];
	// const predictions: Prediction[] = (files.filter(file => file.name.startsWith(tokenWeCareAbout.replace("./", "")))  as Prediction[]).concat(commands.filter(command => command.name.startsWith(tokenWeCareAbout)) as Prediction[]);
	//                                                            ^^ for the initial finding process, we
	//                                                            need to remove this, but we need it later.
	const predictions: Prediction[] = (() => {
		const raw: Prediction[] = (files.filter(file => file.name.startsWith(tokenWeCareAbout.replace("./", "")))  as Prediction[]).concat(commands.filter(command => command.name.startsWith(tokenWeCareAbout)) as Prediction[]);
		raw.forEach(raw => raw.type = commands.find(cmd => cmd.name === raw.name) ? "command": "file");
		return raw;
	})();
	console.log(predictions);
	switch (predictions.length) {
	case 0: {
		return text;
	}
	case 1: {
		tokens.pop();
		tokens.push(tokenWeCareAbout.startsWith("./") ? `./${predictions[0].name}` : predictions[0].name);
		return tokens.join(" ");
	}
	default: {
		// commands.find(command => command.name === "ls")!.callback([]);
		const terminal = document.getElementById("terminal");
		const predictions = [] as string[];
		files.forEach(file => predictions.push(file.name));
		commands.forEach(command => !command.unlisted ? predictions.push(command.name) : null);
		predictions.sort();
		predictions.forEach(prediction => {
			terminal?.append(jsxToHtmlElement(<span className={commands.find(command => command.name === prediction) ? "command" : "param"}>{prediction}   </span>));
		});
		newLine(true);
		return text;
	}
	}
}