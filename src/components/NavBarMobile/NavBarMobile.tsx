import { makeStyles, createStyles, Button } from '@material-ui/core'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import NotificationsIcon from '@material-ui/icons/Notifications'
import UserIcon from '@material-ui/icons/AccountCircle'
import ExploreIcon from '@material-ui/icons/Explore'

import { colors } from '../../styles/theme/colors'

const useStyles = makeStyles(() =>
  createStyles({
    bottomSection: {
      backgroundColor: 'transparent',
      boxShadow: '5px 0px 0px 0px',
      width: '100%',
      height: '5em',
      position: 'fixed',
      bottom: 0,
      borderColor: colors.yellow,
    },
    button: {
      color: colors.white,
      backgroundColor: colors.yellow,
      margin: '1em',
      marginLeft: '2.5em',
      borderRadius: '3em',
      fontSize: '11px',
      fontWeight: 'bold',
      height: '3em',
      width: '12em',
    },
  })
)

export interface NavBarMobileProps {
  value: string
}
export default function NavBarMobile({
  value,
}: NavBarMobileProps): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <BottomNavigation className={classes.bottomSection} value={value}>
        <Button className={classes.button}>
          {<ExploreIcon />}
          {'Discover'}
        </Button>
        <BottomNavigationAction
          label="Calendar"
          value="calendar"
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction
          label="Notifications"
          value="notifications"
          icon={<NotificationsIcon />}
        />
        <BottomNavigationAction label="User" value="user" icon={<UserIcon />} />
      </BottomNavigation>
    </>
  )
}
