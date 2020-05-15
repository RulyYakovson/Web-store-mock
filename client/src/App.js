import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './store';
import Routes from './routes/Routes';
import './App.css';

const App = () => {
  return (
    <Provider store={ store } >
      <div>
        <Routes history={ createBrowserHistory() } />
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
};

export default App;
