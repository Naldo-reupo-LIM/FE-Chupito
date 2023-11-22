import { useContext,ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

import AppBarMobile from '../../components/AppBarMobile/AppBarMobile'
import AppBarWeb from '../../components/AppBarWeb/AppBarWeb'
import NavigationBar from '../Navigation/NavigationBar'
import LayoutContext, { LayoutTypes } from '../../shared/contexts/LayoutContext'

import { mainStyles } from '../../shared/styles/main'

export interface MainProps {
  children: ReactNode
}

export default function Main({ children }: MainProps): JSX.Element {
  const { layout, title, showLogo } = useContext(LayoutContext)
  const classes = mainStyles()
  const theme = useTheme()
  const matchesDesktopDisplay = useMediaQuery(theme.breakpoints.up('sm'))
  
  const location = useLocation()
  // TODO: version should be gotten from package.json
  const version = ''

  const shouldShowAppBars = location.pathname !== '/login'

  const renderAppBar = (
    shouldShowAppBars: boolean,
    matchesDesktopDisplay: boolean,
    version: string 
  ): JSX.Element => { 

    // TODO: This should be refactored to a separate component or be part of a layout component
    if (!shouldShowAppBars) {
      return <></>;
    }
    
    if (matchesDesktopDisplay) {
      return <AppBarWeb version={version} />;
    }

    return <AppBarMobile version={version} />;
  }

  return (
    <>
      {renderAppBar(shouldShowAppBars, matchesDesktopDisplay, version)}
      
      {layout === LayoutTypes.NAVIGATION && (
        <NavigationBar title={title} showLogo={showLogo} />
      )}

      <Paper className={classes.mainContainer}>
        <div className={classes.innerContainer}>{children}</div>
      </Paper>
    </>
  )
}
