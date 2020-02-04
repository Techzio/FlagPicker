import React, {Component} from 'react';
import Search from './components/SearchComponent.js';
import {FLAGS} from './common/flagdata';
import './App.css';

class App extends Component {
    constructor()
    {
        super();
        this.state = {
            flags : FLAGS
        };
    }
    render()
    {
      return (
          <div>
          <h2 class="App">Flag Picker</h2>
          <p class="App">This app will help you to learn flags around the world in <u>3 steps</u></p>
          <Search flags = {this.state.flags}/>
          </div>
      );
    }
}

export default App;
