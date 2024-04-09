import { Input } from '@mui/material'
import React from 'react'

type Props = {
  placeholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

const TitleEditor = (props: Props) => {
  return (
    <Input
      type="text"
      name={props.name}
      onChange={props.handleChange}
      placeholder={props.placeholder}
    />
  )
}

export default TitleEditor