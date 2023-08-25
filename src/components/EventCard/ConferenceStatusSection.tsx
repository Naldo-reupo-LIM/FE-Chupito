import { createStyles, makeStyles, Typography } from '@material-ui/core'

import { ConferenceStatus } from '../../shared/entities'

import { colors } from '../../styles/theme/colors'

const useStyles = makeStyles(() =>
  createStyles({
    status: {
      backgroundColor: colors.white,
      padding: '0px 5px',
      borderRadius: '5%',
    },
    statusCreated: {
      backgroundColor: colors.green,
    },
    statusOpen: {
      backgroundColor: colors.blue,
    },
    statusOnPause: {
      backgroundColor: colors.white,
    },
    statusClosed: {
      backgroundColor: colors.red,
    },
    statusName: {
      color: colors.white,
      textTransform: 'uppercase',
      fontFamily: 'Exo',
      lineHeight: '1.5em',
    },
    statusNameContrast: {
      color: colors.dark,
    },
  })
)

export interface ConferenceStatusSectionProps {
  status: ConferenceStatus
}

export default function ConferenceStatusSection({
  status,
}: ConferenceStatusSectionProps): JSX.Element {
  const classes = useStyles()

  const getStatusNameClasses = () => {
    const statusNameClasses = [classes.statusName]

    if (status === 'paused') {
      statusNameClasses.push(classes.statusNameContrast)
    }

    return statusNameClasses
  }

  const getStatusClasses = () => {
    const statusClasses = [classes.status]

    if (status === 'created' || status === 'active') {
      statusClasses.push(classes.statusCreated)
    }

    if (status === 'opened') {
      statusClasses.push(classes.statusOpen)
    }

    if (status === 'paused') {
      statusClasses.push(classes.statusOnPause)
    }

    if (status === 'closed') {
      statusClasses.push(classes.statusClosed)
    }

    return statusClasses
  }

  return (
    <div
      data-testid="conference-status-section"
      className={getStatusClasses().join(' ')}
    >
      <Typography className={getStatusNameClasses().join(' ')}>
        {status}
      </Typography>
    </div>
  )
}
