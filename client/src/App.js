import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import logo from './logo.svg';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <div>
        <Login />
      </div>
    </Provider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
