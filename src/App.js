import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main/Main'
import ThemeProvider from './providers/ThemeProvider'
import AppRoutes from './components/AppRoutes/AppRoutes'
import { LayoutProvider, UserProvider } from './shared/contexts'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            <LayoutProvider>
              <Main>
                <AppRoutes />
              </Main>
            </LayoutProvider>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
}

export default App
