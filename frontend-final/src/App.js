import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from './features/themes/themes'
import Home from './Home';



function App() {
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router> 
          <Home/>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
