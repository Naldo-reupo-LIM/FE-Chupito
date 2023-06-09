import { render, screen } from '@testing-library/react'

import NavBarMobile, {
  NavBarMobileProps,
} from '../../components/NavBarMobile/NavBarMobile'

const renderComponent = (props: NavBarMobileProps) =>
  render(<NavBarMobile {...props} />)

describe('NavBarMobile component', () => {
  it('should render all elements', () => {
    const props: NavBarMobileProps = {
      value: 'user',
    }
    renderComponent(props)

    const version = screen.getByText(/user/i)
    expect(version).toBeInTheDocument()
  })
})
