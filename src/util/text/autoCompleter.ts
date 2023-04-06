import { commands, newLine } from "../command/commandHandler";
import { files } from "./typingHandler";

export function autoComplete(text: string): string {
	const tokens = text.split(" ");
	const tokenWeCareAbout = tokens.slice(-1)[0];
	const predictions = files.filter(file => file.name.startsWith(tokenWeCareAbout.replace("./", "")));
	//                                                            ^^ for the initial finding process, we
	//                                                            need to remove this, but we need it later.
	switch (predictions.length) {
	case 0: {
		console.log(0);
		return text;
	}
	case 1: {
		console.log(1);
		tokens.pop();
		tokens.push(tokenWeCareAbout.startsWith("./") ? `./${predictions[0].name}` : predictions[0].name);
		return tokens.join(" ");
	}
	default: {
		console.log(2);
		commands.find(command => command.name === "ls")!.callback([]);
		newLine();
		return text;
	}
	}
}