import { getCommand, getFile } from "../command/commandUtils";
import { Lexer, Token } from "./lexer";

export function parse(text: string): Token[] {
	const lexer = new Lexer(
		text,
		[
			{
				name: "quotes",
				regex: /"[^"\s]*"/g,
			},
			{
				name: "command",
				regex: /^[^ ]+/g,
				// callback: (match: string): boolean => {
				// 	return Boolean(
				// 		getFile(match.trim().replace("./", "")) || getCommand(match.trim())
				// 	);
				// },
			},
			{
				name: "param",
				regex: /(?<=\s).*/g,
			},
		],
		"param"
	);
	return lexer.tokenize();
}
