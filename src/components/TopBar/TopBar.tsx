import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import AppBarMobile from '../../components/AppBarMobile/AppBarMobile'
import AppBarWeb from '../../components/AppBarWeb/AppBarWeb'

export interface TopBarProps {
  isAuthenticated: boolean
  username: string
  onLogout: () => void
  onLogin: () => void
}

export default function TopBar ({
  isAuthenticated,
  username,
  onLogin,
  onLogout,
}: TopBarProps): JSX.Element {
  
  const theme = useTheme()
  const matchesDesktopDisplay = useMediaQuery(theme.breakpoints.up('sm'))

  // TODO: version should be gotten from package.json
  const version = ''

  if (matchesDesktopDisplay) {
    return (
      <AppBarWeb
        isAuthenticated={isAuthenticated}
        username={username}
        version={version}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    )
  }

  return (
    <AppBarMobile
      isAuthenticated={isAuthenticated}
      username={username}
      version={version}
      onLogin={onLogin}
      onLogout={onLogout}
    />
  )
}
