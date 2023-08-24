import { useContext, ReactNode } from 'react'
import { Paper} from '@material-ui/core'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import AppBarMobile from '../../components/AppBarMobile/AppBarMobile'
import AppBarWeb from '../../components/AppBarWeb/AppBarWeb'
import NavBarMobile from '../../components/NavBarMobile/NavBarMobile'
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

  return (
    <>
      {matchesDesktopDisplay ? (
        <AppBarWeb
          title={'Special Spider App'}
          version={config.version || ''}
        />
      ) : (
        <AppBarMobile version={version} />
      )}

      {layout === LayoutTypes.NAVIGATION && (
        <NavigationBar title={title} showLogo={showLogo} />
      )}
      <Paper className={classes.mainContainer}>
        <div className={classes.innerContainer}>{children}</div>
      </Paper>
      {!matchesDesktopDisplay ? <NavBarMobile value={'nav'} /> : null}
    </>
  )
}
