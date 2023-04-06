import { useEffect, useState } from 'react'
import { commands, createCommand, handleInput } from './util/commandDefs';
import './util/commandFuncs';

import './App.css'

function App() {
  const [date, setDate] = useState('');
  useEffect(() => {
    document.addEventListener('keydown', handleInput)
    return () => document.removeEventListener('keydown', handleInput)
  }, [handleInput])
  useEffect(() => {
    const localDate = localStorage.getItem('date');
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    } as Intl.DateTimeFormatOptions;
    const date = (new Date()).toLocaleDateString(navigator.language, options);
    if (!localDate) {
      setDate('none');
      localStorage.setItem('date', date)
    } else {
      setDate(localDate);
      localStorage.setItem('date', date)
    }
  }, [])
  return (
    <div className="main">
      <div id="frame">
        <div id="terminal">
          <div>
            {date !== 'none' ? <div><span className='directory'>last login:</span> <span className='hostname'>{date}</span><br /></div> : null}
            welcome! available commands:<br />
            <div className="help">
              {
                commands.map(command => {
                  return !command.unlisted ? <div key={command.name} className="command">{command.name}</div> : null;
                })
              }
              
            </div>
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
