/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
//   hii!! basics:
// - args includes everything split by " ", excluding the command itself. length === 0 if no args are provided.
// - treat terminal.append() as console.log() for the shell. you can append html elements as Nodes.
// - the constructor is as follows:
//     new Command("base", function (this: Command, args) { const terminal = document.getElementById("terminal"); terminal?.append("hello, world!") }, true);
//                   ^                ^                ^                                                                  ^       ^                     ^
//                   |                |                 \                                                                 |        \            this makes the command
//        the command name    use this for command name |                                                           you can also use\          unlisted, useful for the
//                                            all arguments (including                                              a non-null asser-\           help command and tab
//                                            non-dash) in a string[],                                              tion here, but i  \
//                                            excluding command name.                                               prefer optional    terminal.append() can be used
// - have fun!                                                                                                          chaining.      for a raw string to be appended,
//                                                                                                                                     or you can use it in conjunction
//                                                                                                                                     with jsx and jsxToHtmlElement()
//                                                                                                                                     (see src/util/jsx/conversion.tsx)
import { jsxToHtmlElement } from "../jsx/conversion";
import { files } from "../text/typingHandler";
import { Command, commands, newLine } from "./commandHandler";
import { getFile } from "./commandUtils";

commands.length = 0; // fixes double runs on vite dev
//                      reload

new Command(
	"base",
	function (this: Command, args) {
		const terminal = document.getElementById("terminal");
		const dashedArgs = args.filter((arg) => arg.startsWith("-"));
		if (dashedArgs.length > 0) {
			terminal?.append(
				`${this.name}: unrecognised option -- '${dashedArgs[0].replace(
					"-",
					""
				)}'`
			);
			return;
		}
		terminal?.append("base executed!!");
	},
	true
);

new Command("echo", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter((arg) => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(
			`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
		);
		return;
	}
	terminal?.append(args.join(" "));
});

new Command("neofetch", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter((arg) => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(
			`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
		);
		return;
	}
	const agent = window.navigator.userAgent.toLowerCase();
	const browser =
		agent.indexOf("edge") > -1
			? "edge"
			: agent.indexOf("edg") > -1
			? "chromium based edge"
			: agent.indexOf("opr") > -1
			? "opera"
			: agent.indexOf("chrome") > -1
			? "chrome"
			: agent.indexOf("trident") > -1
			? "ie"
			: agent.indexOf("firefox") > -1
			? "firefox"
			: agent.indexOf("safari") > -1
			? "safari"
			: "other";
	const img = document.createElement("img");
	img.src = (() => {
		switch (browser) {
			case "firefox": {
				return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg";
			}
			case "chrome": {
				return "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg";
			}
			case "edge":
			case "chromium based edge": {
				return "https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg";
			}
			default: {
				return "https://upload.wikimedia.org/wikipedia/commons/d/d2/Question_mark.svg";
			}
		}
	})();
	const neofetch = document.createElement("div");
	neofetch.classList.add("neofetch");
	neofetch.append(img);
	neofetch.append(
		`browser: ${browser}\nresolution: ${window.screen.width}x${
			window.screen.height
		}\nos: ${(() => {
			const os = navigator.userAgent;
			let finalOS = "unknown";
			if (os.search("Windows") !== -1) {
				finalOS = "windows";
			} else if (os.search("Mac") !== -1) {
				finalOS = "macOS";
			} else if (os.search("X11") !== -1 && !(os.search("Linux") !== -1)) {
				finalOS = "unix";
			} else if (os.search("Linux") !== -1 && os.search("X11") !== -1) {
				finalOS = "linux";
			}

			return finalOS;
		})()}${
			(navigator as any).deviceMemory
				? `\ntotal memory: ${
						(navigator as any).deviceMemory > 7
							? `> 8`
							: (navigator as any).deviceMemory
				  }GB`
				: ""
		}`
	);
	terminal?.append(neofetch);
});

new Command("ls", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter((arg) => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(
			`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
		);
		return;
	}
	switch (args.length) {
		case 0: {
			files.forEach((file) => terminal?.append(`${file.name}   `));
			break;
		}
		case 1: {
			if (args[0].at(0) === "/")
				return terminal?.append(
					`${this.name}: ${args[0]}: this isn't a real filesystem, silly`
				);
			const file = files.find((file) => file.name === args[0]);
			if (!file) {
				terminal?.append(`${this.name}: ${args[0]}: no such file or directory`);
			} else {
				terminal?.append(`${this.name}: ${args[0]}: not a directory`);
			}
			break;
		}
		default: {
			terminal?.append(`${this.name}: syntax error near '${args[0]}'`);
			break;
		}
	}
});

new Command(
	"./",
	function (this: Command, args) {
		const terminal = document.getElementById("terminal");
		const file = files.find((file) => file.name === args[0]);
		if (!file) {
			terminal?.append(`mash: ./${args[0]}: no such file or directory`);
			return;
		}
		const dashedArgs = args.filter((arg) => arg.startsWith("-"));
		if (dashedArgs.length > 0) {
			terminal?.append(
				`${args[0]}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
			);
			return;
		}
		file.exec(args);
	},
	true
);

new Command(
	"",
	function (this: Command) {
		return;
	},
	true
);

new Command("help", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter((arg) => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(
			`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
		);
		return;
	}
	terminal?.append(
		jsxToHtmlElement(
			<div className="help">
				{commands.map((command) => {
					return !command.unlisted ? (
						<div key={command.name} className="command">
							{command.name}
						</div>
					) : null;
				})}
			</div>
		)
	);
});

new Command("cat", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	const dashedArgs = args.filter((arg) => arg.startsWith("-"));
	if (dashedArgs.length > 0) {
		terminal?.append(
			`${this.name}: unrecognised option -- '${dashedArgs[0].replace("-", "")}'`
		);
		return;
	}
	const file = getFile(args.at(-1)!);
	if (!file) return terminal?.append(`${this.name}: not found -- ${args[0]}`);
	terminal?.append(`\n${file.exec.toString()}\n`);
});

new Command("eval", function (this: Command, args) {
	const terminal = document.getElementById("terminal");
	terminal?.append(eval(args.join(" ")) || "");
});
new Command(
	"clear",
	function (this: Command, args) {
		const terminal = document.getElementById("terminal");
		const dashedArgs = args.filter((arg) => arg.startsWith("-"));
		if (dashedArgs.length > 0) {
			terminal?.append(
				`${this.name}: unrecognised option -- '${dashedArgs[0].replace(
					"-",
					""
				)}'`
			);
			return;
		}
		terminal!.innerHTML =
			'<div class="line"><span class="hostname">[nptr@moondust.dev <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input"><span class="command"></span><span class="param"></span></span></div>';
		return;
	},
	false,
	true
);
