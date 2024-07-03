import { Input } from '@mui/material'
import React from 'react'

type Props = {
  placeholder: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value?: string
  //handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const TitleEditor = (props: Props) => {
  return (
    <Input
      //onKeyDown={props.handleKeyDown}
      defaultValue={props.value ? props.value : ''}
      type="text"
      autoFocus
      sx={{ width: '100%' }}
      name={props.name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChange(e)}
      placeholder={props.placeholder}
    />
  )
}

export default TitleEditor