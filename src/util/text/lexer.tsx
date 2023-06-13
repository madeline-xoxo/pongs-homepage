/* eslint-disable quotes */
/* file: lexer.tsx */
/* description: this file implements a class (Lexer) which, when given text, parses it into tokens based off of   */

import { getCommand, getFile } from "../command/commandUtils";

export function isOverlapping(
	x1: number,
	x2: number,
	y1: number,
	y2: number
): boolean {
	return Math.max(x1, y1) <= Math.min(x2, y2);
}

const getKeyByValue = (obj: any, value: any) =>
	Object.keys(obj).find((key) => obj[key] === value);

export interface RegexObject {
	name: string;
	regex: RegExp;
	callback?: (match: string) => boolean;
}

export interface Token {
	content: string;
	type: string;
}

export interface Range {
	start: number;
	end: number;
}

class LexerError extends Error {
	constructor(error: string) {
		super(error);
		this.name = "LexerError";
	}
}

type State = {
	onCommand: boolean;
	inQuote: boolean;
	shouldPush: boolean;
	currentTokenIndex: number;
	index: number;
};

// todo: character-by-character state-machine lexer

function split(state: State, tokens: Token[], defaultValue?: Token) {
	if (defaultValue) {
		state.currentTokenIndex = tokens.push(defaultValue) - 1;
	} else {
		state.currentTokenIndex =
			tokens.push({
				content: "",
				type: "",
			}) - 1;
	}
}

export class Lexer {
	private text: string;
	private fallback = "";
	tokenize(): Token[] {
		const vals = [
			"true",
			"false",
			"null",
			"undefined",
			"const",
			"let",
			"var",
			"function",
			"return",
			"if",
			"else",
			"for",
			"while",
			"do",
			"switch",
			"case",
			"break",
			"continue",
			"try",
			"catch",
			"finally",
			"throw",
			"new",
			"delete",
			"in",
			"instanceof",
			"typeof",
			"void",
			"this",
			"super",
			"class",
			"extends",
			"import",
			"export",
			"default",
			"async",
			"await",
			"yield",
			"from",
			"as",
			"get",
			"set",
			"constructor",
			"debugger",
			"with",
			"arguments",
			"require",
			"module",
			"exports",
			"globalThis",
			"window",
			"document",
		];
		const symbolList = [
			`{`,
			`}`,
			`:`,
			`*`,
			`(`,
			`)`,
			`&`,
			`\``,
			`[`,
			`]`,
			`1`,
			`2`,
			`3`,
			`4`,
			`5`,
			`6`,
			`7`,
			`8`,
			`9`,
			`0`,
			`/`,
			`+`,
			`-`,
			`=`,
			`>`,
			`<`,
		];
		const state = {
			onCommand: true,
			inQuote: false,
			shouldPush: true,
			currentTokenIndex: 0,
			index: 0,
		} as State;
		let tokens = [] as Token[];
		split(state, tokens);
		const text = this.text.split("");
		text.forEach((char, index) => {
			tokens[state.currentTokenIndex].type = this.fallback;
			if (state.onCommand) {
				tokens[state.currentTokenIndex].content += char;
				if (
					getFile(
						tokens[state.currentTokenIndex].content.trim().replace("./", "")
					) ||
					getCommand(tokens[state.currentTokenIndex].content.trim())
				)
					tokens[state.currentTokenIndex].type = "command";
				if (char === " ") {
					state.onCommand = false;
					split(state, tokens);
				}
				return;
			}
			if (state.inQuote) {
				tokens[state.currentTokenIndex].type = "quotes";
			}
			if (char === " ") {
				split(state, tokens);
			}
			if (char === '"' && text[index - 1] !== "\\") {
				split(state, tokens, {
					content: char,
					type: "quotes",
				});
				state.inQuote = !state.inQuote;
				split(state, tokens);
			} else if (
				symbolList.includes(char) &&
				tokens[state.currentTokenIndex].type !== "quotes"
			) {
				split(state, tokens, {
					content: char,
					type: "symbol",
				});
				split(state, tokens);
			} else {
				tokens[state.currentTokenIndex].content += char;
			}
		});
		tokens = tokens.filter((token) => token.content !== "");
		if (tokens[0]) {
			if (tokens[0].content.trim() === "eval") {
				// apply javascript style syntax highlighting
				tokens.slice(1).forEach((token, index) => {
					if (vals.includes(token.content.trim()) && token.type !== "quotes") {
						token.type = "constant";
					}
					if (token.content.trim() === ")") {
						// if (
						// 	tokens[index - 1] &&
						// 	tokens[index - 1].content !== ")" &&
						// 	tokens[index - 1].content !== "(" &&
						// 	tokens[index - 1].content.trim() !== "eval"
						// ) {
						// 	tokens[index - 1].type = "unconstant";
						// }
						for (let i = index; i >= 0; i--) {
							const item = tokens[i];
							if (item === token) continue;
							if (item.content === "(") {
								if (tokens[i - 1].type === "quotes") return;
								tokens[i - 1].type = "unconstant";
								return;
							}
						}
					}
				});
			}
		}
		return tokens;
	}
	constructor(text: string, fallback: string) {
		this.text = text;
		this.fallback = fallback;
	}
}
