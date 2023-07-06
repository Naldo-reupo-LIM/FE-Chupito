import { render, screen } from '@testing-library/react'

import AppBarMobile, { AppBarMobileProps } from './AppBarMobile'
import { useAuth } from '../../hook/useAuth'

jest.mock('../../hook/useAuth')
const mockedUseAuth = useAuth as jest.Mock
mockedUseAuth.mockReturnValue({ state: { isAuth: false, userUid: '' } })

const renderComponent = (props: AppBarMobileProps) =>
  render(<AppBarMobile {...props} />)

const props: AppBarMobileProps = {
  version: '1.2',
}
beforeEach(() => {
  renderComponent(props)
})

describe('AppBarMobile component', () => {
  it('should render all elements', () => {
    const version = screen.getByText(/v1.2/i)
    expect(version).toBeInTheDocument()
  })
  it('should render login button when isAuth is false', () => {
    const loginButton = screen.getByText(/Login/i)
    expect(loginButton).toBeInTheDocument()
  })
})
