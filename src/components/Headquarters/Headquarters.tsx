import React, { useState } from 'react'
import { Grid, MenuItem, Select } from '@material-ui/core'

import { Headquarter } from '../../shared/entities'
import { headquartersStyles } from '../../shared/styles/FilterEvents'

export interface HeadquartersProps {
  loading: boolean
  allHeadquarters: Headquarter[]
  selectedHeadquarter?: string
  onChangeHeadquarter: (headquarter: string) => void
}

export default function Headquarters({
  loading,
  allHeadquarters,
  onChangeHeadquarter,
  selectedHeadquarter = '-1',
}: HeadquartersProps): JSX.Element {
  const [currentSelectedHeadquarter, setCurrentSelectedHeadquarter] =
    useState(selectedHeadquarter)
  const classes = headquartersStyles()

  const handleHeadquarterChanged = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCurrentSelectedHeadquarter(e.target.value as string)
    onChangeHeadquarter(e.target.value as string)
  }

  if (loading) {
    return <h4>Loading HQs</h4>
  }

  const defaultItem = (
    <MenuItem data-testid="option-headquarter-default" value="-1">
      Choose a Headquarter
    </MenuItem>
  )

  const items = allHeadquarters.map((headquarter, index) => {
    return (
      <MenuItem
        data-testid={'option-headquarter-' + index}
        key={index}
        value={headquarter.id}
      >
        {headquarter.name}
      </MenuItem>
    )
  })

  return (
    <Grid item xs={11} sm={4}>
      <Select
        data-testid="list-headquarters"
        inputProps={{
          name: 'list-headquarters',
          id: 'list-headquarters',
          'aria-label': 'list-headquarters',
        }}
        label="Choose a headquarter"
        className={classes.headquarterSelect}
        value={currentSelectedHeadquarter}
        onChange={handleHeadquarterChanged}
      >
        {defaultItem}
        {items}
      </Select>
    </Grid>
  )
}
