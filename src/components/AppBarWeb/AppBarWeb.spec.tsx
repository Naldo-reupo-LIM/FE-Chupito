import { render, screen } from '@testing-library/react'

import AppBarWeb, { AppBarWebProps } from './AppBarWeb'
import { useAuth } from '../../hook/useAuth'

jest.mock('../../hook/useAuth')
const mockedUseAuth = useAuth as jest.Mock
mockedUseAuth.mockReturnValue({ state: { isAuth: false, userUid: '' } })

const renderComponent = (props: AppBarWebProps) =>
  render(<AppBarWeb {...props} />)

const props: AppBarWebProps = {
  title: 'Super title',
  version: '1.2',
}
beforeEach(() => {
  renderComponent(props)
})

describe('AppBarWeb component', () => {
  it('should render all elements', () => {
    const title = screen.getByText(/super title/i)
    expect(title).toBeInTheDocument()

    const version = screen.getByText(/v1.2/i)
    expect(version).toBeInTheDocument()
  })

  it('should render login button when isAuth is false', () => {
    const loginButton = screen.getByText(/Login/i)
    expect(loginButton).toBeInTheDocument()
  })
})
