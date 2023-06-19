import { render, screen } from '@testing-library/react'

import EventInfoPage from './EventInfo'

describe('', () => {
  it('should render component', () => {
    render(<EventInfoPage />)
    const title = screen.getByText(/Fluent React/i)
    expect(title).toBeInTheDocument()
  })
})
