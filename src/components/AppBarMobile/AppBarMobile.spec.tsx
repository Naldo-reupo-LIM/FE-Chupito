import { render, screen } from '@testing-library/react'

import AppBarMobile, { AppBarMobileProps } from './AppBarMobile'

const renderComponent = (props: AppBarMobileProps) =>
  render(<AppBarMobile {...props} />)

describe('AppBarMobile component', () => {
  it('should render all elements', () => {
    const props: AppBarMobileProps = {
      version: '1.2',
    }
    renderComponent(props)

    const version = screen.getByText(/v1.2/i)
    expect(version).toBeInTheDocument()
  })
})
