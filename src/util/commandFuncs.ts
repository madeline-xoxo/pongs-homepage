import { createCommand, files } from "./commandDefs";

createCommand('base', (command, terminal, write) => {
    // only if you want arguments only
    // if (command.length === 1) return true;
    const args = command.slice(1).filter(cmd => cmd.startsWith('-')).map(cmd => cmd.replace('-', ''));
    let defaultHit = false;
    args.every(arg => {
        switch(arg) {
            default: {
                write(`invalid option -- '${arg}'`, terminal, true, command[0]);
                defaultHit = true;
                return false;
            }
        }
    })
    if (defaultHit) return false;
    write(`base executed!`, terminal, false, args[0]);
    return true;
})

createCommand('ls', (command, terminal, write) => {
    const args = command.slice(1).filter(cmd => cmd.startsWith('-')).map(cmd => cmd.replace('-', ''));
    const folder = command[command.length - 1];
    if (command.length === 1) {
        files.forEach(file => write(`${file.name}   `, terminal, false, args[0]))
        return true;
    };
    let defaultHit = false;
    args.every(arg => {
        switch(arg) {
            default: {
                write(`invalid option -- '${arg}'`, terminal, true, command[0]);
                defaultHit = true;
                return false;
            }
        }
    })
    if (defaultHit) return false;
    if (folder !== "ls") {
        files.find(file => { // scuffed
            if (file.name === folder) {
                write(file.url, terminal, false, args[0]);
                return true;
            }
        })
    }
    return true;
})

createCommand('cd', (command, terminal, write) => {
    // only if you want arguments only
    if (command.length === 1) return true;
    const args = command.slice(1).filter(cmd => cmd.startsWith('-')).map(cmd => cmd.replace('-', ''));
    const dir = command.slice(command.length - 1)[0];
    let defaultHit = false;
    args.every(arg => {
        switch(arg) {
            default: {
                write(`invalid option -- '${arg}'`, terminal, true, command[0]);
                defaultHit = true;
                return false;
            }
        }
    })
    if (defaultHit) return false;
    files.find(file => {
        console.log(file)
        if (file.name === dir) {
            if (file.openCurrent) window.location.href = file.url;
            else window.open(file.url);
            return true;
        }
    })
    return true;
})