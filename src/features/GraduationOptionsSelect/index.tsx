import { useContext, useState } from 'react'
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select'
import GraduationOption from '../../types/GraduationOption'
import { DataContext } from '../App'

// deal with corequisites

type SelectOption = {
  value: number
  label: string
}

export function GraduationOptionsSelect() {
  const [data, setData] = useContext(DataContext)

  function toSelectOption(gradOption: GraduationOption): SelectOption {
    return { value: gradOption.id, label: gradOption.name }
  }

  const value = data.graduationOptionSelections
    .map((id) => {
      const gradOption = data.graduationOptions.find((o) => o.id === id)
      if (gradOption !== undefined) {
        return toSelectOption(gradOption)
      }
    })
    .filter((o): o is SelectOption => o !== undefined)

  function onChange(
    value: OnChangeValue<SelectOption, true>,
    actionMeta: ActionMeta<SelectOption>,
  ) {

    const newData = {
      ...data,
      graduationOptionSelections: [
        ...new Set([...data.requiredGradOptions, ...value.map((v) => v.value)]),
      ],
    }
    setData(newData)
  }

  function isRequired(selectOption: SelectOption): boolean {
    return data.requiredGradOptions.includes(selectOption.value)
  }

  const styles: StylesConfig<SelectOption, true> = {
    multiValue: (base, state) => {
      return isRequired(state.data) ? { ...base, backgroundColor: 'gray' } : base
    },
    multiValueLabel: (base, state) => {
      return isRequired(state.data)
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base
    },
    multiValueRemove: (base, state) => {
      return isRequired(state.data) ? { ...base, display: 'none' } : base
    },
  }

  return (
    <Select
      value={value}
      isMulti
      isClearable={value.some((v) => !isRequired(v))}
      options={data.graduationOptions.map(toSelectOption)}
      onChange={onChange}
      styles={styles}
    />
  )
}
