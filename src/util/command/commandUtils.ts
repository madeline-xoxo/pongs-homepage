import { Command, commands } from "./commandHandler";

export function getCommand(name: string, allowUnlisted?: boolean): Command | undefined {
	return commands.find(command => allowUnlisted ? command.name === name : !command.unlisted && command.name === name);
}