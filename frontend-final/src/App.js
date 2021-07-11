import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/Chat'
import Register from './components/register'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Register />
          </Route>
          <Route path="/messages">
            <div className="App">
              <div className="scrollable sidebar">
                <Sidebar />
              </div>
              <div className="scrollable content">
                <Chat />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
