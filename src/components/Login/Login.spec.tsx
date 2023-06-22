import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login, { LoginProps } from './Login'

const renderComponent = (props: LoginProps) => render(<Login {...props} />)

describe('login view component', () => {
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

  it('should click on login button', () => {
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

    userEvent.type(userField, 'test@test.com')
    expect(userField).toHaveValue('test@test.com')

    userEvent.type(passwordField, 'f2022TOO!')

    userEvent.click(buttonField)
    expect(mockOnLogin).toHaveBeenCalled()
    expect(mockOnLogin).toHaveBeenCalledTimes(1)
  })
})
