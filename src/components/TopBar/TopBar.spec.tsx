import { render, screen, waitFor } from '@testing-library/react'

import TopBar, { TopBarProps } from './TopBar'

const mockUseMediaQuery = jest.fn()
jest.mock('@mui/material', () => ({
  useMediaQuery: () => mockUseMediaQuery(),
}))

const mockUseTheme = jest.fn()
jest.mock('@mui/material/styles', () => ({
  useTheme: () => mockUseTheme(),
}))

const renderComponent = (props: TopBarProps) => render(<TopBar {...props} />)

afterAll(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
  jest.resetModules()
})

describe('TopBar component', () => {
  describe('when user is authenticated', () => {
    const props: TopBarProps = {
      isAuthenticated: true,
      username: 'email@test.com',
      onLogin: jest.fn(),
      onLogout: jest.fn(),
    }

    afterEach(() => {
      jest.clearAllMocks()
      jest.resetAllMocks()
      jest.resetModules()
    })

    it.skip('render app bar for mobile', () => {
      mockUseTheme.mockReturnValue({ breakpoints: { up: jest.fn() } })
      mockUseMediaQuery.mockReturnValue(false)

      renderComponent(props)

      waitFor(() => {
        const appBarMobile = screen.getByTestId('appbarmobile')
        const userName = screen.getByText(/email@test.com/i)

        expect(appBarMobile).toBeInTheDocument()
        expect(userName).toBeInTheDocument()
      })
    })

    it('render app bar for web', () => {
      mockUseTheme.mockReturnValue({ breakpoints: { up: jest.fn() } })
      mockUseMediaQuery.mockReturnValue(true)

      renderComponent(props)

      const appBar = screen.getByTestId('appbarweb')
      const userName = screen.getByText(/email@test.com/i)

      expect(appBar).toBeInTheDocument()
      expect(userName).toBeInTheDocument()
    })
  })

  describe('when user is not authenticated', () => {
    const props: TopBarProps = {
      isAuthenticated: false,
      username: '',
      onLogin: jest.fn(),
      onLogout: jest.fn(),
    }
    afterEach(() => {
      jest.clearAllMocks()
      jest.resetAllMocks()
      jest.resetModules()
    })

    it.skip('render app bar for mobile', () => {
      mockUseTheme.mockReturnValue({ breakpoints: { up: jest.fn() } })
      mockUseMediaQuery.mockReturnValue(false)

      renderComponent(props)

      const appBarMobile = screen.getByTestId('appbarmobile')
      const loginButton = screen.getByRole('button', { name: /login/i })

      expect(appBarMobile).toBeInTheDocument()
      expect(loginButton).toBeInTheDocument()
    })

    it('render app bar for web', () => {
      mockUseTheme.mockReturnValue({ breakpoints: { up: jest.fn() } })
      mockUseMediaQuery.mockReturnValue(true)

      renderComponent(props)

      const appBar = screen.getByTestId('appbarweb')
      const loginButton = screen.getByRole('button', { name: /login/i })

      expect(appBar).toBeInTheDocument()
      expect(loginButton).toBeInTheDocument()
    })
  })
})
