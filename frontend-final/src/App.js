import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from './features/themes/themes'
import Home from './Home';


const GlobalStyle = createGlobalStyle`
  body{
    background: ${props => props.theme.body};
    color:${props => props.theme.colorBody};
  }
`


function App() {
  const theme = useSelector(selectTheme)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Router>
          <Home />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
