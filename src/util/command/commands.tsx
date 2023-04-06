//   hii!! basics:
// - args includes everything split by " ", excluding the command itself. length === 0 if no args are provided.
// - treat terminal.append() as console.log() for the shell. you can append html elements as Nodes.
// - have fun!

import { files } from "../text/typingHandler";
import { Command, commands } from "./commandHandler";

commands.length = 0; // fixes double runs on vite dev
//                      reload

new Command("ls", function(this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter(arg => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`);
		return;
	}
	switch (args.length) {
	case 0: {
		files.forEach(file => terminal?.append(`${file.name}   `));
		break;
	}
	case 1: {
		const file = files.find(file => file.name === args[0]);
		if (!file) {
			terminal?.append(`${this.name}: ${args[0]}: no such file or directory`);
		} else {
			terminal?.append(`${this.name}: ${args[0]}: not a directory`);
		}
		break;
	}
	default: {
		terminal?.append(`${this.name}: syntax error near '${args[0]}'`);
		break;
	}
	}
});

new Command("./", function(this: Command, args) {
	const terminal = document.getElementById("terminal");
	const file = files.find(file => file.name === args[0]);
	if (!file) {
		terminal?.append(`mash: ./${args[0]}: no such file or directory`);
		return;
	}
	const dashedArgs = args.filter(arg => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(`${args[0]}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`);
		return;
	}
	file.openCurrent ? window.location.href = file.url : window.open(file.url);
});


console.log(commands);