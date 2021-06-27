import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/chat'

function App() {
  return (
    <div className="App">
      <div className="scrollable sidebar">
        <Sidebar />
      </div>
      <div className="scrollable content">
        <Chat/>
      </div>
    </div>
  );
}

export default App;
