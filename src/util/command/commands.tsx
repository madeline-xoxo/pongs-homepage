import { Command } from "./commandHandler";

new Command("ls", (args) => {
	const terminal = document.getElementById("terminal");
	terminal?.append("hi!!");
});