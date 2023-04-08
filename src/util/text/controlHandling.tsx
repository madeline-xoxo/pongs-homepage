import { newLine } from "../command/commandHandler";

export function handleControl(key: string) {
	switch(key) {
	case "c": {
		document.getElementById("input")!.innerText += "^C";
		newLine();
		break;
	}
	}
}