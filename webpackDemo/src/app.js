// document.querySelector('#app').innerHTML = 'app'
import React from 'react'
import ReactDOM from 'react-dom'

import Hello from './components/Hello.js'

ReactDOM.render(
  <div>
    <Hello></Hello>
  </div>,
  document.getElementById('app')
)
