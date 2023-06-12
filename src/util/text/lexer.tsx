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

export class Lexer {
	private text: string;
	private exps: RegexObject[];
	private fallback = "";
	tokenize(): Token[] {
		let tokens: Token[] = [];
		for (const exp of this.exps.reverse()) {
			const match = exp.regex.exec(this.text);
			if (!match) continue;
			const [start, end] = [match.index, match.index + match[0].length];
			tokens.push({
				content: match[0],
				type: exp.name,
				start,
				end,
			});
		}
		tokens = tokens.sort((a, b) => a.start - b.start);
		const overlappingTokens = tokens.filter((token) =>
			tokens.some((otherToken) => {
				return (
					token !== otherToken &&
					isOverlapping(
						token.start,
						token.end,
						otherToken.start,
						otherToken.end
					)
				);
			})
		);
		// split tokens that overlap into multiple tokens
		overlappingTokens.forEach((token) => {
			const overlappingToken = tokens.find((otherToken) => {
				return (
					token !== otherToken &&
					isOverlapping(
						token.start,
						token.end,
						otherToken.start,
						otherToken.end
					)
				);
			});
			if (!overlappingToken) return;
			if (
				!(
					this.exps.indexOf(this.exps.find((exp) => exp.name === token.type)!) >
					this.exps.indexOf(
						this.exps.find((exp) => exp.name === overlappingToken.type)!
					)
				)
			)
				return;
			console.log("replacing token", overlappingToken.type, "with", token.type);
			if (overlappingToken.end < token.start) return;
			overlappingToken.end = token.start;
		});
		const gaps = tokens
			.map((token, index) => {
				const nextToken = tokens[index + 1];
				if (!nextToken) return;
				if (nextToken.start === token.end) return;
				return {
					start: token.end,
					end: nextToken.start,
				};
			})
			.filter((e) => e !== undefined);
		console.log(gaps);
		gaps.forEach((gap) => {
			if (!gap) return;
			tokens.push({
				content: this.text.slice(gap.start, gap.end),
				type: this.fallback,
				start: gap.start,
				end: gap.end,
			});
		});
		return tokens.filter((token) => token.start !== 0 || token.end !== 0);
	}
	constructor(text: string, exps: RegexObject[], fallback: string) {
		this.text = text;
		this.exps = exps;
		this.fallback = fallback;
	}
}
