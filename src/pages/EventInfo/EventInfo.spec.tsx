import { render, screen } from '@testing-library/react'

import EventInfoPage from './EventInfo'

describe('Event Info Page', () => {
  it('should render component', () => {
    render(<EventInfoPage />)
    const title = screen.getByText(/Fluent React/)
    expect(title).toBeInTheDocument()

    const registerButton = screen.getByTestId('register-button')
    expect(registerButton).toBeInTheDocument()

    const imageContainer = screen.getByTestId('image-list-container')
    expect(imageContainer).toBeInTheDocument()
  })
})
