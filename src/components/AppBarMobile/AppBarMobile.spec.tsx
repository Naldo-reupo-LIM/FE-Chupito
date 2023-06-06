import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import AppBarMobile from '../../components/AppBarMobile/AppBarMobile'
import { AppBarMobileProps } from '../../types/types'

const renderComponent = (props: AppBarMobileProps) =>
  render(<AppBarMobile {...props} />)
const openSettings = jest.fn()

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
