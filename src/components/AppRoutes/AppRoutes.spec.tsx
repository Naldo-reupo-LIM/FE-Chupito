import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import AppRoutes from './AppRoutes'

describe('app routes component', () => {
  it('should render event-info path', () => {
    render(
      <MemoryRouter initialEntries={['/event-info']}>
        <AppRoutes />
      </MemoryRouter>
    )
    expect(screen.getByText('Event Info')).toBeInTheDocument()
  })
})
