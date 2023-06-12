import { useEffect, useState } from 'react'
import { Grid, makeStyles, createStyles } from '@material-ui/core'

import YearFilter from './YearFilter'
import SortFilter from './SortFilter'

import { ConferenceFilters } from '../../shared/entities'

const useStyles = makeStyles((theme) =>
  createStyles({
    filterSelector: {
      textAlign: 'right',
      marginTop: '0',
      [theme.breakpoints.up('sm')]: {
        marginTop: '-0.5em',
      },
      border: '0px solid #f00',
      maxWidth: '100px',
    },
  })
)

export type DashboardFiltersProps = {
  onChangeFilters: ({ year, sortBy }: ConferenceFilters) => void
}

export default function DashboardFilters({
  onChangeFilters,
}: DashboardFiltersProps): JSX.Element {
  const classes = useStyles()
  const [filterSelectedYear, setFilterSelectedYear] = useState('')
  const [filterSelectedSort, setFilterSelectedSort] = useState('')

  const onChangeYear = (selectedYear: string) => {
    setFilterSelectedYear(selectedYear)
  }

  const onChangeSort = (selectedSort: string) => {
    setFilterSelectedSort(selectedSort)
  }

  useEffect(() => {
    onChangeFilters({ year: filterSelectedYear, sortBy: filterSelectedSort })
    // eslint-disable-next-line
  }, [filterSelectedYear, filterSelectedSort])

  return (
    <div data-testid="gridDashboardFilters">
      <Grid item xs={2} sm={4} className={classes.filterSelector}>
        <YearFilter onChange={onChangeYear} />
        <SortFilter onChange={onChangeSort} />
      </Grid>
    </div>
  )
}
