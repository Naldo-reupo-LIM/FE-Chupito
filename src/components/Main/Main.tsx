import { useContext,ReactNode } from 'react'
import { Paper } from '@material-ui/core'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

import AppBarMobile from '../../components/AppBarMobile/AppBarMobile'
import AppBarWeb from '../../components/AppBarWeb/AppBarWeb'
import NavigationBar from '../Navigation/NavigationBar'
import LayoutContext, { LayoutTypes } from '../../shared/contexts/LayoutContext'
import config from '../../environment/environment'
import { mainStyles } from '../../shared/styles/main'

export interface MainProps {
  version: string
  children: ReactNode
}

export default function Main({ version, children }: MainProps): JSX.Element {
  const { layout, title, showLogo } = useContext(LayoutContext)
  const classes = mainStyles()
  const theme = useTheme()
  const matchesDesktopDisplay = useMediaQuery(theme.breakpoints.up('sm'))
  const location = useLocation()

  const shouldShowAppBars = location.pathname !== '/login'

  function renderAppBar(
    shouldShowAppBars: boolean,
    matchesDesktopDisplay: boolean,
    config: { version: string | undefined }, 
    version: string 
  ): JSX.Element | null { 
    if (shouldShowAppBars) {
      if (matchesDesktopDisplay) {
        return <AppBarWeb version={config.version || ''} />;
      } else {
        return <AppBarMobile version={version} />;
      }
    }
  
    return null;
  }

  return (
    <>
      {renderAppBar(shouldShowAppBars, matchesDesktopDisplay, config, version)}
      
      {layout === LayoutTypes.NAVIGATION && (
        <NavigationBar title={title} showLogo={showLogo} />
      )}

      <Paper className={classes.mainContainer}>
        <div className={classes.innerContainer}>{children}</div>
      </Paper>
    </>
  )
}
