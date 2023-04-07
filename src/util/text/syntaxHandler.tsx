/*
!! TODO !!
REWRITE THIS FILE. this is direly required, this is possibly the
worst code in this project. i don't know how it even works.
*/
import { jsxToHtmlElement } from "../jsx/conversion";
import React from "react";
import { commands } from "../command/commandHandler";
import { files } from "./typingHandler";
interface IToken {
	class: "quotes" | "command" | "params" | "hostname",
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
	if (parsed[1]) {
		const args = parsed[1].split(/\s+/); // split args by spaces
		for (let i = 0; i < args.length; i++) {
		  const arg = args[i];
		  let currentlyInString = false;
		  let constructedString = "";
		  for (let j = 0; j < arg.length; j++) {
				const char = arg.at(j);
				if (char !== "\"" && char !== "{" && char !== "}") {
			  constructedString += char;
				}
				if (char === "\"" || j + 1 === arg.length) {
			  currentlyInString = !currentlyInString;
			  val.push({
						class: currentlyInString ? "params" : "quotes",
						content: constructedString,
			  });
			  if (char === "\"") {
						val.push({
				  class: "quotes",
				  content: "\"",
						});
			  }
			  constructedString = "";
				}
				if (char === "{" || char === "}") {
			  val.push({
						class: "hostname",
						content: char,
			  });
				}
		  }
		  // Add a space token if this isn't the last argument
		  if (i < args.length - 1) {
				val.push({
			  class: "params",
			  content: " ",
				});
		  }
		}
	  }
	const parsedItems = [] as Node[];
	val.forEach(item => parsedItems.push(jsxToHtmlElement(<span className={((): "quotes" | "command" | "params" | "hostname" => {
		if (item.class === "command") {
			// sorry for bad if statement.
			// we're checking if:
			//	a. the command exists
			//         or
			//	b. the command starts with 
			//     ./ and the file exists
			// 
			// and that the command isn't unlisted. 
			if ((commands.find(command => command.name.trim() === item.content.trim()) || (item.content.startsWith("./") && files.find(file => file.name === item.content.replace("./", "").trim()))) && !(commands.find(command => command.name === item.content.trim())?.unlisted)) {
				return "command";
			} else {
				return "params";
			}
		} else {
			return item.class;
		}
	})()}>{item.content}</span>)));
	return parsedItems;
}