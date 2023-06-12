import { getCommand, getFile } from "../command/commandUtils";
import { Lexer, Token } from "./lexer";

export function parse(text: string): Token[] {
	const lexer = new Lexer(text, "param");
	return lexer.tokenize();
}
