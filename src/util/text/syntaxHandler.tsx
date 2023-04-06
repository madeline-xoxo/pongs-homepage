import { jsxToHtmlElement } from "../jsx/conversion";
import React from "react";

export function parse(text: string) {
	const parsed = (text.match(/^([^\s]+\s)(.*)$/) || [""]).slice(1);
	//    ^  [0] is the command, [1] is the args
	if (!parsed[0]) parsed[0] = text;
	const command = jsxToHtmlElement(<span className="command">{parsed[0]}</span>);
	const args = jsxToHtmlElement(<span className="param">{parsed[1]}</span>);
	return [command, args];
}