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
          <Search flags = {this.state.flags}/>
      );
    }
}

export default App;
