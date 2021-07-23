import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/Chat'
import Register from './components/register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from './features/themes/themes'


function App() {
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
