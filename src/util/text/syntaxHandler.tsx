import { jsxToHtmlElement } from "../jsx/conversion";
import React from "react";
interface IToken {
	class: "quotes" | "command" | "params",
	content: string,
}

// this function is poorly written, pls ignore :pray:
export function parse(text: string) {
	const val = [] as IToken[];
	const parsed = (text.match(/^([^\s]+\s)(.*)$/) || [""]).slice(1);
	//    ^  [0] is the command, [1] is the args
	if (!parsed[0]) parsed[0] = text;
	val.push(
		{
			class: "command",
			content: parsed[0]
		}
	);
	let currentlyInString = false;
	let constructedString = "";
	if (parsed[1]) {
		for (let i = 0; i < parsed[1].length; i++) {
			const char = parsed[1].at(i);
			if (char !== "\"") {
				constructedString += char;
			}
			if (char === "\"" || i + 1 === parsed[1].length) {
				currentlyInString = !currentlyInString;
				val.push(
					{
						class: currentlyInString ? "params" : "quotes",
						content: constructedString
					}
				);
				if (char === "\"") {
					val.push(
						{
							class: "quotes",
							content: "\""
						}
					);
				}
				constructedString = "";
			}
		}
	}
	const parsedItems = [] as Node[];
	val.forEach(item => parsedItems.push(jsxToHtmlElement(<span className={item.class}>{item.content}</span>)));
	return parsedItems;
}