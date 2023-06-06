import { render, screen } from '@testing-library/react'

import AppBarWeb from './AppBarWeb'
import { AppBarWebProps } from '../../types/types'

const renderComponent = (props: AppBarWebProps) =>
  render(<AppBarWeb {...props} />)

describe('AppBarWeb component', () => {
  it('should render all elements', () => {
    const props: AppBarWebProps = {
      title: 'Super title',
      version: '1.2',
    }
    renderComponent(props)
    const title = screen.getByText(/super title/i)
    expect(title).toBeInTheDocument()

    const version = screen.getByText(/v1.2/i)
    expect(version).toBeInTheDocument()
  })
})
