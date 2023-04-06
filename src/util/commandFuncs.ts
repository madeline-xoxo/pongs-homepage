import { createCommand, files } from "./commandDefs";

createCommand('ls', (command, terminal, write) => {
    const args = command.slice(1).filter(cmd => cmd.startsWith('-'));
    if (args) write("error! no args allowed >:(", terminal, true, command[0])
    return true;
})