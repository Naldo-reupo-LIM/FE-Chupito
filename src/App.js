import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main/Main'
import ThemeProvider from './providers/ThemeProvider'
import AppRoutes from './components/AppRoutes/AppRoutes'
import { LayoutProvider, UserProvider } from './shared/contexts'
import { AuthProvider } from './shared/contexts/Auth/AuthProvider'
import './i18n'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <LayoutProvider>
            <AuthProvider>
              <Main>
                <AppRoutes />
              </Main>
            </AuthProvider>
          </LayoutProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
