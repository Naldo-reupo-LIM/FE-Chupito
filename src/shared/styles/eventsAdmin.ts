import { createStyles, makeStyles} from '@material-ui/core'

export const eventStyle = makeStyles(() =>
  createStyles({
    disabled: {
      pointerEvents: 'none',
    },
    container: {
      flexFlow: 'column',
      textAlign: 'center',
      margin: '10px auto',
      boxShadow: '0px 0px 12px #959595',
      padding: '20px',
    },
    textField: {
      width: '100%',
    },
    contentButton: {
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: '25px 0px',
    },
    table: {
      marginBottom: '2em',
    },
    headquarterFilter: {
      marginBottom: '2em',
      paddingBottom: '20px',
      boxShadow: '0px 1px 1px #cdcdcd',
    },
    centeredContent: {
      justifyContent: 'center',
    },
    noResults: {
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingTop: '3em',
    },
  })
)
