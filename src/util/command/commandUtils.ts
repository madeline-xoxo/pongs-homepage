import { Command, commands } from "./commandHandler";

// i'll make everything use this eventually, promise <3
export function getCommand(name: string, allowUnlisted?: boolean): Command | undefined {
	return commands.find(command => allowUnlisted ? command.name === name : !command.unlisted && command.name === name);
}