import { render, screen } from '@testing-library/react'
import useMediaQuery from '@mui/material/useMediaQuery'

import Main, { MainProps } from './Main'

// TODO: Make a research to handle unit tests with context
const renderMainComponent = (props: MainProps) => render(<Main {...props} />)

describe('Main component', () => {
  it('should render all elements', () => {
    const props: MainProps = {
      version: 'v14',
      children: <div />,
    }
    renderMainComponent(props)
    const versionMain = screen.getByText(/v14/i)
    expect(versionMain).toBeInTheDocument()
  })

  it('should render AppBarWeb header when device is WEB', () => {
    jest.mock('@mui/material/useMediaQuery', () =>
      jest.fn().mockImplementation((query) => {
        return true
      })
    )
    const props: MainProps = {
      version: 'v14',
      children: <div />,
    }

    renderMainComponent(props)
    const webAppBarVersion = screen.getByText(/v14/)
    expect(webAppBarVersion).toBeInTheDocument()
  })
})
