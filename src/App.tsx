import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Opposites } from './Opposites';

function App() {
   return (
      <div className='App'>
         <h2>Find your name's opposite!</h2>
         {/* <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
               Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
               className='App-link'
               href='https://reactjs.org'
               target='_blank'
               rel='noopener noreferrer'
            >
               Learn Reacts
            </a>
         </header> */}
         <Opposites />
      </div>
   );
}

export default App;
