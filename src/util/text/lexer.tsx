/* file: lexer.tsx */
/* description: this file implements a class (Lexer) which, when given text, parses it into tokens based off of   */

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
	start: number;
	end: number;
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

// todo: character-by-character state-machine lexer

export class Lexer {
	private text: string;
	private exps: RegexObject[];
	private fallback = "";
	tokenize(): Token[] {
		const state = {
			onCommand: true,
			inQuote: false,
		};
		let tokens = [] as Token[];
		for (const char of this.text) {
			if (state.onCommand && char === " ") {
				state.onCommand = false;
			}
		}
		return [];
	}
	constructor(text: string, exps: RegexObject[], fallback: string) {
		this.text = text;
		this.exps = exps;
		this.fallback = fallback;
	}
}
