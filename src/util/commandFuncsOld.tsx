// import { commands, createCommand, files, jsxToHtmlElement } from "./commandDefsOld";
// import React from "react";

// createCommand("base", (command, terminal, write) => {
// 	// only if you want arguments only
// 	// if (command.length === 1) return true;
// 	const args = command.slice(1).filter(cmd => cmd.startsWith("-")).map(cmd => cmd.replace("-", ""));
// 	let defaultHit = false;
// 	args.every(arg => {
// 		switch (arg) {
// 		default: {
// 			write(`invalid option -- '${arg}'`, terminal, true, command[0]);
// 			defaultHit = true;
// 			return false;
// 		}
// 		}
// 	});
// 	if (defaultHit) return false;
// 	write("base executed!", terminal, false, command[0]);
// 	return true;
// });

// createCommand("ls", (command, terminal, write) => {
// 	const args = command.slice(1).filter(cmd => cmd.startsWith("-")).map(cmd => cmd.replace("-", ""));
// 	const folder = command[command.length - 1];
// 	if (command.length === 1) {
// 		files.forEach(file => write(`${file.name}   `, terminal, false, command[0]));
// 		return true;
// 	}
// 	let defaultHit = false;
// 	args.every(arg => {
// 		switch (arg) {
// 		default: {
// 			write(`invalid option -- '${arg}'`, terminal, true, command[0]);
// 			defaultHit = true;
// 			return false;
// 		}
// 		}
// 	});
// 	if (defaultHit) return false;
// 	let found = false;
// 	if (folder !== "ls") {
// 		files.find(file => { // scuffed
// 			if (file.name === folder) {
// 				write(`~/${file.name}`, terminal, false, command[0]);
// 				found = true;
// 				return true;
// 			}
// 		});
// 	}
// 	if (!found) write(`cannot access '${folder}': no such file or directory`, terminal, true, command[0]);
// 	return true;
// });

// createCommand("cd", (command, terminal, write) => {
// 	// only if you want arguments only
// 	if (command.length === 1) return true;
// 	const args = command.slice(1).filter(cmd => cmd.startsWith("-")).map(cmd => cmd.replace("-", ""));
// 	const dir = command.slice(command.length - 1)[0];
// 	let defaultHit = false;
// 	args.every(arg => {
// 		switch (arg) {
// 		default: {
// 			write(`invalid option -- '${arg}'`, terminal, true, command[0]);
// 			defaultHit = true;
// 			return false;
// 		}
// 		}
// 	});
// 	if (defaultHit) return false;
// 	let found = false;
// 	files.find(file => {
// 		console.log(file);
// 		if (file.name === dir) {
// 			write(`${dir}: not a directory`, terminal, true, command[0]);
// 			found = true;
// 			return true;
// 		}
// 	});
// 	if (!found) write(`${dir}: no such file or directory`, terminal, true, command[0]);
// 	return false;
// });

// createCommand("echo", (command, terminal, write) => {
// 	write(command.slice(1).join(" "), terminal, false, command[0]);
// 	return true;
// });

// createCommand("neofetch", (command, terminal, write) => {
// 	// only if you want arguments only
// 	// if (command.length === 1) return true;
// 	// if (navigator.doNotTrack) {
// 	//     write(`do not track detected. exiting...`, terminal, true, command[0]);
// 	//     return false;
// 	// }
// 	const args = command.slice(1).filter(cmd => cmd.startsWith("-")).map(cmd => cmd.replace("-", ""));
// 	let defaultHit = false;
// 	args.every(arg => {
// 		switch (arg) {
// 		default: {
// 			write(`invalid option -- '${arg}'`, terminal, true, command[0]);
// 			defaultHit = true;
// 			return false;
// 		}
// 		}
// 	});
// 	if (defaultHit) return false;
// 	const agent = window.navigator.userAgent.toLowerCase();
// 	const browser =
//         agent.indexOf("edge") > -1 ? "edge"
//         	: agent.indexOf("edg") > -1 ? "chromium based edge"
//         		: agent.indexOf("opr") > -1 ? "opera"
//         			: agent.indexOf("chrome") > -1 ? "chrome"
//         				: agent.indexOf("trident") > -1 ? "ie"
//         					: agent.indexOf("firefox") > -1 ? "firefox"
//         						: agent.indexOf("safari") > -1 ? "safari"
//         							: "other";
// 	const img = document.createElement("img");
// 	img.src = (() => {
// 		switch (browser) {
// 		case "firefox": {
// 			return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg";
// 		}
// 		case "chrome": {
// 			return "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg";
// 		}
// 		case "edge":
// 		case "chromium based edge": {
// 			return "https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg";
// 		}
// 		default: {
// 			return "https://upload.wikimedia.org/wikipedia/commons/d/d2/Question_mark.svg";
// 		}
// 		}
// 	})();
// 	const neofetch = document.createElement("div");
// 	neofetch.classList.add("neofetch");
// 	neofetch.append(img);
// 	neofetch.append(`browser: ${browser}\nresolution: ${window.screen.width}x${window.screen.height}\nos: ${(() => {
// 		const os = navigator.userAgent;
// 		let finalOS = "unknown";
// 		if (os.search("Windows") !== -1) {
// 			finalOS = "windows";
// 		}
// 		else if (os.search("Mac") !== -1) {
// 			finalOS = "macOS";
// 		}
// 		else if (os.search("X11") !== -1 && !(os.search("Linux") !== -1)) {
// 			finalOS = "unix";
// 		}
// 		else if (os.search("Linux") !== -1 && os.search("X11") !== -1) {
// 			finalOS = "linux";
// 		}

// 		return finalOS;
// 	})()}${(navigator as any).deviceMemory ? `\ntotal memory: ${(navigator as any).deviceMemory}GB` : ""}`);
// 	write(neofetch, terminal, false, command[0]);
// 	return true;
// });

// createCommand("clear", (command, terminal, write) => {
// 	terminal.innerHTML = "";
// 	return true;
// });

// createCommand("", (command, terminal, write) => {
// 	return true;
// });

// createCommand("help", (command, terminal, write) => {
// 	const cmds = commands.map(command => {
// 		if (command.unlisted) return;
// 		return jsxToHtmlElement(<div key={command.name} className="command">{command.name}</div>);
// 	}).filter(e => e !== undefined);
// 	terminal.append(jsxToHtmlElement(<div className="help"></div>));
// 	const help = Array.from(document.getElementsByClassName("help")).slice(-1)[0];
// 	cmds.forEach(cmd => help.append(cmd!));
// 	return true;
// });

// createCommand("which", (command, terminal, write) => {
// 	const args = command.slice(1).filter(cmd => cmd.startsWith("-")).map(cmd => cmd.replace("-", ""));
// 	const folder = command[command.length - 1];
// 	if (command.length === 1) {
// 		write("at least one argument is required", terminal, true, command[0]);
// 		return false;
// 	}
// 	let defaultHit = false;
// 	args.every(arg => {
// 		switch (arg) {
// 		default: {
// 			write(`invalid option -- '${arg}'`, terminal, true, command[0]);
// 			defaultHit = true;
// 			return false;
// 		}
// 		}
// 	});
// 	if (defaultHit) return false;
// 	let found = false;
// 	if (folder !== "ls") {
// 		files.find(file => { // scuffed
// 			if (file.name === folder) {
// 				write(file.url, terminal, false, command[0]);
// 				found = true;
// 				return true;
// 			}
// 		});
// 	}
// 	if (!found) write(`no ${folder} in (~)`, terminal, true, command[0]);
// 	return true;
// });

// createCommand("./", (command, terminal, write) => {
// 	const args = command;
// 	args[0] = args[0].replace("./", "");
// 	if (args.filter(arg => arg.startsWith("-")).length > 0) {
// 		write(`unrecognized option -- '${args.filter(arg => arg.startsWith("-"))[0].replace("-", "")}'`, terminal, true, args[0]);
// 		return false;
// 	}
// 	let fileFound = false;
// 	files.find(file => {
// 		if (file.name === args[0]) {
// 			fileFound = true;
// 			if (file.openCurrent) window.location.href = file.url;
// 			else window.open(file.url);
// 			return;
// 		}
// 	});
// 	if (!fileFound) {
// 		write(`mash: ${args[0]}: no such file or directory`, terminal, false, "");
// 		return false;
// 	}
// 	return true;
// });