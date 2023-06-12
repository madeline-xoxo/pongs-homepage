import { useEffect, useState } from "react";
import React from "react";
import "./util/command/commands";
import "./App.css";
import { type } from "./util/text/typingHandler";
import { commands } from "./util/command/commandHandler";

function App() {
	const [date, setDate] = useState("");
	useEffect(() => {
		document.addEventListener("keydown", type);
		return () => document.removeEventListener("keydown", type);
	}, [type]);
	useEffect(() => {
		const localDate = localStorage.getItem("date");
		const options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		} as Intl.DateTimeFormatOptions;
		const date = new Date().toLocaleDateString(navigator.language, options);
		if (!localDate) {
			setDate("none");
			localStorage.setItem("date", date);
		} else {
			setDate(localDate);
			localStorage.setItem("date", date);
		}
	}, []);
	return (
		<div className="main">
			<div id="frame">
				<div id="terminal">
					<div>
						{date !== "none" ? (
							<div>
								<span className="directory">last login:</span>{" "}
								<span className="hostname">{date}</span>
								<br />
							</div>
						) : null}
						welcome! available commands:
						<br />
						<div className="help">
							{commands.map((command) => {
								return !command.unlisted ? (
									<div key={command.name} className="command">
										{command.name}
									</div>
								) : null;
							})}
						</div>
					</div>
					<div className="line">
						<span className="hostname">
							[nptr@moondust.dev <span className="directory">~</span>]
						</span>
						<span className="bash">$ </span>
						<span id="input" />
					</div>
				</div>
			</div>
			<div id="footer">
				{`(just so we're all clear here, mash is a portmanteau of "madeline" and "bash".)`}
			</div>
		</div>
	);
}

export default App;
