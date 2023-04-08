export function isOverlapping(x1: number, x2: number, y1: number, y2: number): boolean {
	return Math.max(x1, y1) <= Math.min(x2, y2);
}

const getKeyByValue = (obj: any, value: any) =>
	Object.keys(obj).find(key => obj[key] === value);

export interface RegexObject {
	[pattern: string]: RegExp;
}

export interface Callbacks {
	[key: string]: (match: string) => boolean;
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

export class Lexer {
	text: string;
	exps: RegexObject = {};
	callbacks: Callbacks = {};
	fallback = "";
	tokenize(): Token[] {
		const tokens: Token[] = [];
		const expKeys = Object.keys(this.exps).sort((a, b) => Object.keys(this.exps).indexOf(a) - Object.keys(this.exps).indexOf(b));
		let pos = 0;
		while (pos < this.text.length) {
			let matched = false;
			for (const key of expKeys) {
				const exp = this.exps[key];
				exp.lastIndex = pos;
				const match = exp.exec(this.text);
				if (match && match.index === pos) {
					if (this.callbacks[getKeyByValue(this.exps, exp)!]) {
						if (this.callbacks[getKeyByValue(this.exps, exp)!](match[0])) {
							tokens.push({
								content: match[0],
								type: key,
								start: match.index,
								end: match.index + match[0].length,
							});
						} else {
							tokens.push({
								content: match[0],
								type: this.fallback,
								start: match.index,
								end: match.index + match[0].length,
							});
						}
					} else {
						tokens.push({
							content: match[0],
							type: key,
							start: match.index,
							end: match.index + match[0].length,
						});
					}
					pos += match[0].length;
					matched = true;
					break;
				}
			}
			if (!matched) {
				throw new Error(`Invalid input at position ${pos}: "${this.text.slice(pos)}"`);
			}
		}
		return tokens;
	}
	constructor(text: string) {
		this.text = text;
	}
}

