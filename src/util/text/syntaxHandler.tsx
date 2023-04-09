import { getCommand } from "../command/commandUtils";
import { Lexer, Token } from "./lexer";

class CommandLexer extends Lexer {
	exps = {
		quotes: /"[^"\s]*"/g,
		command: /^[^ ]+/g,
		spaces: /\s/g,
		param: /(?:\s)(.*)/g,
	};
	callbacks = {
		command: (match: string): boolean => {
			const command = getCommand(match.trim());
			if (command) {
				return true;
			}
			return false;
		}
	};
	fallback = "param";
}

export function parse(text: string): Token[] {
	const commandLexer = new CommandLexer(text);
	return commandLexer.tokenize();
}