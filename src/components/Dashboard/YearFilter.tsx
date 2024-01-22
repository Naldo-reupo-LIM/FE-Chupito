import CustomDropdown from '../CustomDropdown/CustomDropdown'

import { getCurrentYear } from '../../shared/tools'

export type YearFilterProps = {
  onChange: (selectedYear: string) => void
}

export default function YearFilter({ onChange }: YearFilterProps): JSX.Element {
  const currentYear = parseInt(getCurrentYear())
  const nextYear = currentYear + 1
  const pastYear = currentYear - 1

  const allYears = [
    { value: nextYear.toString(), title: nextYear.toString() },
    { value: currentYear.toString(), title: currentYear.toString() },
    { value: pastYear.toString(), title: pastYear.toString() },
  ]

  const handleYearChanged = (selectedOption: string) => {
    onChange(selectedOption)
  }

  return (
    <CustomDropdown
      htmlId="select-year"
      htmlName="select-year"
      elements={allYears}
      onChange={handleYearChanged}
      title="Year"
    />
  )
}
