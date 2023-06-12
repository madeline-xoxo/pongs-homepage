/* big todo: rewrite this, its rather scuffed */

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
				let match;
				while ((match = exp.exec(this.text.slice(pos))) !== null) {
					if (match.index === 0) {
						const callback = (() => {
							const callbacks = Object.entries(this.callbacks);
							const exps = Object.entries(this.exps).find(currentExp => currentExp[1] === exp)!;
							const callback = callbacks.find(callback => callback[0] === exps[0]);
							return callback || undefined;
						})();

						const tokenContent = match[0];
						const tokenStart = pos;
						const tokenEnd = pos + tokenContent.length;
						const tokenType = key;

						if (callback) {
							if (callback[1].call(this, tokenContent)) {
								tokens.push({
									content: tokenContent,
									type: tokenType,
									start: tokenStart,
									end: tokenEnd,
								});
							} else {
								tokens.push({
									content: tokenContent,
									type: this.fallback,
									start: tokenStart,
									end: tokenEnd,
								});
							}
						} else {
							if (key === "param") {
								let paramPos = 0;
								while (paramPos < tokenContent.length) {
									let paramMatched = false;
									for (const paramKey of expKeys) {
										if (paramKey === "param") {
											continue;
										}

										const paramExp = this.exps[paramKey];
										let paramMatch;
										while ((paramMatch = paramExp.exec(tokenContent.slice(paramPos))) !== null) {
											if (paramMatch.index === 0) {
												tokens.push({
													content: paramMatch[0],
													type: paramKey === "command" ? "param" : paramKey,
													start: tokenStart + paramPos,
													end: tokenStart + paramPos + paramMatch[0].length,
												});
												paramPos += paramMatch[0].length;
												paramMatched = true;
												break;
											}
										}

										if (paramMatched) {
											break;
										}
									}

									if (!paramMatched) {
										tokens.push({
											content: tokenContent.charAt(paramPos),
											type: tokenType,
											start: tokenStart + paramPos,
											end: tokenStart + paramPos + 1,
										});
										paramPos++;
									}
								}
							} else {
								tokens.push({
									content: tokenContent,
									type: tokenType,
									start: tokenStart,
									end: tokenEnd,
								});
							}
						}

						pos += tokenContent.length;
						matched = true;
						break;
					}
				}

				if (matched) {
					break;
				}
			}

			if (!matched) {
				throw new LexerError(`Invalid input at position ${pos}: "${this.text.slice(pos)}"`);
			}
		}

		return tokens;
	}
	constructor(text: string) {
		this.text = text;
	}
}

