import { useEffect } from 'react'
import { createCommand, handleInput } from './util/commandDefs';
import './util/commandFuncs';

import './App.css'

function App() {
  // window.onload = function () {
  //   //  alert(navigator.userAgent);
  //   if (navigator.userAgent.indexOf("Firefox") > 0) {
  //     alert("hii! this is a bit awkward but firefox doesn't support the clipboard api. as such, you won't be able to paste into my little terminal. sorry!");
  //   }
  // }
  // async function handleInput(e: KeyboardEvent) {
  //   const characters = [...Array(95).keys()].map(i => String.fromCharCode(i + 32)); // every typeable character, see https://stackoverflow.com/a/71085063
  //   if (!(e.key === "R" && e.ctrlKey)) e.preventDefault();
  //   window.getSelection()?.removeAllRanges();
  //   const terminal = document.getElementById('terminal')!;
  //   const input = document.getElementById('input')!;
  //   let typedText = input.innerText;
  //   document.getAnimations().forEach(animation => {
  //     animation.cancel();
  //     animation.play();
  //   })
  //   switch (e.key) {
  //     case "ArrowUp": {
  //       // const previous = (terminal.lastChild! as Element).previousElementSibling?.lastElementChild as HTMLDivElement;
  //       // if (previous) {
  //       //   if (!previous.parentElement?.classList.contains('line')) break;
  //       //   typedText = previous.innerText;
  //       // }
  //       // break;
  //       const lines = Array.from(document.getElementsByClassName('line') as HTMLCollectionOf<HTMLDivElement>);
  //       typedText = (lines.slice(-2)[0].lastElementChild as HTMLDivElement).innerText;
  //       break;
  //     }
  //     case "ArrowDown": {
  //       typedText = "";
  //       break;
  //     }
  //     // the above two aren't REALLY how it works but idc
  //     case "Backspace": {
  //       typedText = input.innerText.slice(0, -1);
  //       break;
  //     }
  //     case "Shift": {
  //       break;
  //     }
  //     case "Tab": {
  //       let parsed = typedText.split(' ').slice(-1)[0];
  //       const potentialFiles = files.filter(file => file.name.startsWith(parsed));
  //       if (potentialFiles.length === 0) break;
  //       if (potentialFiles.length === 1) {
  //         const temparray = typedText.split(' ');
  //         temparray.pop();
  //         temparray.push(potentialFiles[0].name)
  //         typedText = temparray.join(' ');
  //         break;
  //       }
  //       if (potentialFiles.length > 1) {
  //         terminal.append(potentialFiles.map(f => f.name).join('   '))
  //         document.getElementById('input')!.id = "";
  //         terminal.innerHTML += `<div class="line"><span class="hostname">[madeline@b0ss.net <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input" /></div>`
  //         const input = document.getElementById('input')!;
  //         input.innerHTML = "";
  //         const stupidFuckingArrayWeNeed = typedText.match(/^([^\s]+\s)(.*)$/) || [""];
  //         const commandElement = document.createElement('span');
  //         commandElement.classList.add('command');
  //         commandElement.innerText = stupidFuckingArrayWeNeed[1] || typedText;
  //         input.append(commandElement)
  //         const paramElement = document.createElement('span');
  //         paramElement.classList.add('param');
  //         paramElement.innerText = stupidFuckingArrayWeNeed[2] || "";
  //         input.append(paramElement)
  //         terminal.scrollTop = terminal.scrollHeight;
  //       }
  //       break;
  //     }
  //     case "Enter": {
  //       let parsed = typedText.split(' ');
  //       switch (parsed[0]) {
  //         case "": {
  //           break;
  //         }
  //         case "ls": {
  //           const first = parsed.slice(0, -(parsed.length - 1));
  //           const last = parsed.slice(0)[0]
  //           const args = parsed.slice(1);
  //           if (parsed.length === 1) {
  //             let filesString = "";
  //             files.forEach(file => {
  //               filesString += file.name + "   ";
  //             })
  //             terminal.append(filesString);
  //             break;
  //           };
  //           args.every(arg => {
  //             if (arg.startsWith('-')) {
  //               switch (arg.replace('-', '')) {
  //                 case "l": {
  //                   terminal.append("-l!");
  //                   break;
  //                 }
  //                 default: {
  //                   terminal.append(`ls: invalid option -- '${arg.replace('-', '')}'`)
  //                   return;
  //                 }
  //               }
  //             }
  //           })
  //           break;
  //           // if (parsed.slice(-1)[0].trim() === "ls") {
  //           //   let filesString = "";
  //           //   files.forEach(file => {
  //           //     filesString += file.name + "   ";
  //           //   })
  //           //   terminal.append(filesString);
  //           //   break;
  //           // } else {
  //           //   if (parsed.slice(-1)[0].trim() === "") break;
  //           //   const directory = files.filter(file => file.name === parsed.slice(-1)[0])[0];
  //           //   if (!directory) {
  //           //     terminal.append(`mash: ls: cannot access '${parsed.slice(-1)[0]}': no such file or directory`)
  //           //     break;
  //           //   }
  //           //   terminal.append(directory.url);
  //           //   break;
  //           // }

  //         }
  //         case "cd": {
  //           if (parsed.slice(-1)[0].trim() === "cd") break;
  //           switch (parsed.slice(-1)[0]) {
  //             case "": {
  //               break;
  //             }
  //             case ".":
  //             case "./": {
  //               terminal.append(`mash: cd: you're already in the current directory, dumbass`)
  //               break;
  //             }
  //             case "..":
  //             case "../": {
  //               terminal.append(`mash: cd: nice try`)
  //               break;
  //             }
  //             default: {
  //               const file = files.find(file => file.name === parsed.slice(-1)[0]);
  //               if (!file) {
  //                 terminal.append(`mash: cd: ${parsed.slice(-1)}: no such file or directory`);
  //                 break;
  //               }
  //               !file.openCurrent ? window.open(file.url) : window.location.href = file.url;
  //               break;
  //             }
  //           }
  //           break;
  //         }
  //         case "echo": {
  //           terminal.append(parsed.slice(1, parsed.length).join(' '));
  //           break;
  //         }
  //         case "neofetch": {
  //           const agent = window.navigator.userAgent.toLowerCase();
  //           const browser =
  //             agent.indexOf('edge') > -1 ? 'edge'
  //               : agent.indexOf('edg') > -1 ? 'chromium based edge'
  //                 : agent.indexOf('opr') > -1 ? 'opera'
  //                   : agent.indexOf('chrome') > -1 ? 'chrome'
  //                     : agent.indexOf('trident') > -1 ? 'ie'
  //                       : agent.indexOf('firefox') > -1 ? 'firefox'
  //                         : agent.indexOf('safari') > -1 ? 'safari'
  //                           : 'other';
  //           const img = document.createElement('img')
  //           img.src = (() => {
  //             switch (browser) {
  //               case "firefox": {
  //                 return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg";
  //               }
  //               case "chrome": {
  //                 return "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg";
  //               }
  //               case "edge":
  //               case "chromium based edge": {
  //                 return "https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg";
  //               }
  //               default: {
  //                 return "https://upload.wikimedia.org/wikipedia/commons/d/d2/Question_mark.svg";
  //               }
  //             }
  //           })()
  //           const neofetch = document.createElement('div');
  //           neofetch.classList.add('neofetch');
  //           neofetch.append(img);
  //           neofetch.append(`browser: ${browser}\ni don't know what else to put here`)
  //           terminal.append(neofetch);
  //           terminal.scrollTop = terminal.scrollHeight;
  //           break;
  //         }
  //         default: {
  //           terminal.append(`mash: ${parsed[0]}: command not found`);
  //           break;
  //         }
  //       }
  //       terminal.innerHTML += `<div class="line"><span class="hostname">[madeline@b0ss.net <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input" /></div>`
  //       document.getElementById('input')!.id = "";
  //       terminal.scrollTop = terminal.scrollHeight;
  //       return;
  //     }
  //     default: {
  //       if (!characters.includes(e.key) || e.ctrlKey) break;
  //       typedText += e.key;
  //       break;
  //     }
  //   }
  //   if (e.ctrlKey) {
  //     switch (e.key) {
  //       case "v" || "V": {
  //         const clipboard = await navigator.clipboard.readText();
  //         typedText += clipboard || "";
  //       }
  //     }
  //   }
  //   // this code only executes if we don't return in a switch statement, meaning we can execute code there
  //   input.innerHTML = "";
  //   const stupidFuckingArrayWeNeed = typedText.match(/^([^\s]+\s)(.*)$/) || [""];
  //   const commandElement = document.createElement('span');
  //   commandElement.classList.add('command');
  //   commandElement.innerText = stupidFuckingArrayWeNeed[1] || typedText;
  //   input.append(commandElement)
  //   const paramElement = document.createElement('span');
  //   paramElement.classList.add('param');
  //   paramElement.innerText = stupidFuckingArrayWeNeed[2] || "";
  //   input.append(paramElement)
  //   terminal.scrollTop = terminal.scrollHeight;
  // }
  useEffect(() => {
    document.addEventListener('keydown', handleInput)
    return () => document.removeEventListener('keydown', handleInput)
  }, [handleInput])
  return (
    <div className="main">
      <div id="frame">
        <div id="terminal">
          <div>
            welcome! available commands:<br />
            <div className="command">ls</div>
            <div className="command">echo</div>
            <div className="command">cd <span className="param">(limited)</span></div>
            <div className="command">neofetch</div>
          </div>
          <div className="line">
            <span className="hostname">
              [madeline@b0ss.net <span className="directory">~</span>]
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
  )
}

export default App
