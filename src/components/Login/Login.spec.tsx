import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login, { LoginProps } from './Login'
import { useAuth } from '../../shared/hooks/useAuth'

jest.mock('../../shared/hooks/useAuth')
const mockedUseAuth = useAuth as jest.Mock
mockedUseAuth.mockReturnValue({
  state: { isAuth: false, isAdmin: false, username: '' },
})

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react'),
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const renderComponent = (props: LoginProps) => render(<Login {...props} />)

describe('login view component', () => {
  it('redirect conditional', () => {
    const mockOnLogin = jest.fn()
    const props: LoginProps = {
      onLogin: mockOnLogin,
      loading: true,
    }
    renderComponent(props)

    const user = {
      state: {
        isAuth: true,
        isAdmin: true,
        username: 'admin',
      },
    }
    useAuth.mockImplementation(() => user)
  })

  it('should render all elements', () => {
    const mockOnLogin = jest.fn()
    const props: LoginProps = {
      onLogin: mockOnLogin,
      loading: true,
    }
    renderComponent(props)

    const userField = screen.getByRole('textbox', { name: /email/i })
    expect(userField).toBeInTheDocument()

    const passwordField = screen.getByLabelText(/password/i)
    expect(passwordField).toBeInTheDocument()

    const buttonField = screen.getByRole('button', { name: /log in/i })
    expect(buttonField).toBeInTheDocument()
    expect(buttonField).not.toBeEnabled()
  })

  it('should click on login button ', () => {
    const mockOnLogin = jest.fn()
    const props: LoginProps = {
      onLogin: mockOnLogin,
      loading: true,
    }
    renderComponent(props)

    const userField = screen.getByRole('textbox', { name: /email/i })
    expect(userField).toBeInTheDocument()

    const passwordField = screen.getByLabelText(/password/i)
    expect(passwordField).toBeInTheDocument()

    const buttonField = screen.getByRole('button', { name: /Log In/i })
    expect(buttonField).toBeInTheDocument()

    userEvent.type(userField, 'test@test.com')
    expect(userField).toHaveValue('test@test.com')

    userEvent.type(passwordField, 'f2022TOO!')
    expect(passwordField).toHaveValue('f2022TOO!')

    waitFor(() => {
      userEvent.click(buttonField)
      expect(mockOnLogin).toHaveBeenCalled()
      expect(mockOnLogin).toHaveBeenCalledTimes(1)
    })
  })
})
