import {
  Typography,
  Box,
  Grid,
  Button,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import { colors } from '../../styles/theme/colors'

const useStyles = makeStyles((theme) =>
  createStyles({
    titleContainer: {
      background: colors.transparentYellow,
      display: 'flex',
      flexDirection: 'row',
    },
    eventTitleRow: {
      padding: theme.spacing(2),
    },
    eventDateRow: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
    },
    button: {
      backgroundColor: colors.yellow,
      marginLeft: '2em',
      marginRight: '2em',
      justifyContent: 'center',
      alignContent: 'center',
    },
    body: {},
  })
)

export default function EventInfoPage(): JSX.Element {
  const classes = useStyles()
  return (
    <>
      <Grid className={classes.titleContainer}>
        <Grid xs={6} md={8} className={classes.eventTitleRow}>
          <Typography variant="h4" component="div">
            {' '}
            Event Title- Fluent React
          </Typography>
        </Grid>
        <Grid xs={6} md={4} className={classes.eventDateRow}>
          <Typography variant="h5" align="center">
            {' '}
            June 19th, 2023
          </Typography>
          <Button variant="contained" className={classes.button}>
            {' '}
            {'Register'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className={classes.body}>
          <Typography variant="body1">
            {' '}
            Join expert John Smith to take a deep dive into concepts of React,
            including JSX syntax and advanced patterns. By becoming fluent in
            React, you’ll quickly learn how to build better web applications.
            For example, how many of us truly understand how React makes updates
            to user interfaces with fiber reconciliation? How many of us know
            when to memoize and when not to? You’ll deep dive into React’s
            internals and best practices like these to help you work more
            confidently with React.{' '}
          </Typography>
        </Box>
      </Grid>
    </>
  )
}
