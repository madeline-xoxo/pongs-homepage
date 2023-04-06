import { useEffect } from 'react'
import './App.css'

function App() {
  interface File {
    name: string;
    url: string;
    openCurrent?: boolean;
  }
  const files = [
    {
      name: "auditionjs",
      url: "https://b0ss.net/meme/auditionjs"
    },
    {
      name: "email",
      url: "mailto:qj@b0ss.net",
      openCurrent: true,
    },
    {
      name: "old_homework",
      url: "https://m4th.b0ss.net"
    },
    {
      name: "homework",
      url: "https://m5th.b0ss.net"
    },
    {
      name: "rice",
      url: "https://b0ss.net/rice",
      openCurrent: true,
    }
  ] as File[];
  window.onload = function () {
    //  alert(navigator.userAgent);
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      alert("hii! this is a bit awkward but firefox doesn't support the clipboard api. as such, you won't be able to paste into my little terminal. sorry!");
    }
  }
  async function handleInput(e: KeyboardEvent) {
    const characters = [...Array(95).keys()].map(i => String.fromCharCode(i + 32)); // every typeable character, see https://stackoverflow.com/a/71085063
    if (e.key !== "Tab" && (e.key !== "R" && e.ctrlKey)) e.preventDefault();
    window.getSelection()?.removeAllRanges();
    const terminal = document.getElementById('terminal')!;
    const input = document.getElementById('input')!;
    let typedText = input.innerText;
    document.getAnimations().forEach(animation => {
      animation.cancel();
      animation.play();
    })
    switch (e.key) {
      case "ArrowUp": {
        const previous = (terminal.lastChild! as Element).previousElementSibling?.lastElementChild as HTMLDivElement;
        if (previous) {
          if (!previous.parentElement?.classList.contains('line')) break;
          typedText = previous.innerText;
        }
        break;
      }
      case "ArrowDown": {
        typedText = "";
        break;
      }
      // the above two aren't REALLY how it works but idc
      case "Backspace": {
        typedText = input.innerText.slice(0, -1);
        break;
      }
      case "Shift": {
        break;
      }
      case "Tab": {
        let parsed = typedText.split(' ').slice(-1)[0];
        const potentialFiles = files.filter(file => file.name.startsWith(parsed));
        if (potentialFiles.length === 0) break;
        if (potentialFiles.length === 1) {
          const temparray = typedText.split(' ');
          temparray.pop();
          temparray.push(potentialFiles[0].name)
          typedText = temparray.join(' ');
          break;
        }
        if (potentialFiles.length > 1) {
          terminal.append(potentialFiles.map(f => f.name).join('   '))
          document.getElementById('input')!.id = "";
          terminal.innerHTML += `<div class="line"><span class="hostname">[madeline@b0ss.net <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input" /></div>`
          const input = document.getElementById('input')!;
          input.innerHTML = "";
          const stupidFuckingArrayWeNeed = typedText.match(/^([^\s]+\s)(.*)$/) || [""];
          const commandElement = document.createElement('span');
          commandElement.classList.add('command');
          commandElement.innerText = stupidFuckingArrayWeNeed[1] || typedText;
          input.append(commandElement)
          const paramElement = document.createElement('span');
          paramElement.classList.add('param');
          paramElement.innerText = stupidFuckingArrayWeNeed[2] || "";
          input.append(paramElement)
          terminal.scrollTop = terminal.scrollHeight;
        }
        break;
      }
      case "Enter": {
        let parsed = typedText.split(' ');
        switch (parsed[0]) {
          case "": {
            break;
          }
          case "ls": {
            if (parsed.slice(-1)[0].trim() === "ls") {
              let filesString = "";
              files.forEach(file => {
                filesString += file.name + "   ";
              })
              terminal.append(filesString);
              break;
            } else {
              if (parsed.slice(-1)[0].trim() === "") break;
              const directory = files.filter(file => file.name === parsed.slice(-1)[0])[0];
              if (!directory) {
                terminal.append(`mash: ls: cannot access '${parsed.slice(-1)[0]}': no such file or directory`)
                break;
              }
              terminal.append(directory.url);
              break;
            }
          }
          case "cd": {
            if (parsed.slice(-1)[0].trim() === "cd") break;
            switch (parsed.slice(-1)[0]) {
              case "": {
                break;
              }
              case ".":
              case "./": {
                terminal.append(`mash: cd: you're already in the current directory, dumbass`)
                break;
              }
              case "..":
              case "../": {
                terminal.append(`mash: cd: nice try`)
                break;
              }
              default: {
                const file = files.find(file => file.name === parsed.slice(-1)[0]);
                if (!file) {
                  terminal.append(`mash: cd: ${parsed.slice(-1)}: no such file or directory`);
                  break;
                }
                !file.openCurrent ? window.open(file.url) : window.location.href = file.url;
                break;
              }
            }
            break;
          }
          case "echo": {
            terminal.append(parsed.slice(1, parsed.length).join(' '));
            break;
          }
          default: {
            terminal.append(`mash: ${parsed[0]}: command not found`);
            break;
          }
        }
        terminal.innerHTML += `<div class="line"><span class="hostname">[madeline@b0ss.net <span class="directory">~</span>]</span><span class="bash">$ </span><span id="input" /></div>`
        document.getElementById('input')!.id = "";
        terminal.scrollTop = terminal.scrollHeight;
        return;
      }
      default: {
        if (!characters.includes(e.key) || e.ctrlKey) break;
        typedText += e.key;
        break;
      }
    }
    if (e.ctrlKey) {
      switch (e.key) {
        case "v" || "V": {
          const clipboard = await navigator.clipboard.readText();
          typedText += clipboard || "";
        }
      }
    }
    // this code only executes if we don't return in a switch statement, meaning we can execute code there
    input.innerHTML = "";
    const stupidFuckingArrayWeNeed = typedText.match(/^([^\s]+\s)(.*)$/) || [""];
    const commandElement = document.createElement('span');
    commandElement.classList.add('command');
    commandElement.innerText = stupidFuckingArrayWeNeed[1] || typedText;
    input.append(commandElement)
    const paramElement = document.createElement('span');
    paramElement.classList.add('param');
    paramElement.innerText = stupidFuckingArrayWeNeed[2] || "";
    input.append(paramElement)
    terminal.scrollTop = terminal.scrollHeight;
  }
  useEffect(() => {
    document.addEventListener('keydown', handleInput)
    return () => document.removeEventListener('keydown', handleInput)
  }, [handleInput])
  return (
    <div className="main">
      <div className="frame">
        <div id="terminal">
          <div>
            welcome! available commands:<br />
            <div className="command">ls</div>
            <div className="command">echo</div>
            <div className="command">cd <span className="param">(limited)</span></div>
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
