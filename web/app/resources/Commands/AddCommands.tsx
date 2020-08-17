import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import CodeMirror from '@uiw/react-codemirror'
import { StyledInput } from './Components'
require('codemirror/theme/monokai.css')
require('codemirror/mode/javascript/javascript.js')

const AddCommandWrap = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 16px;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`

const AddCommandHeader = styled.div`
  padding: 5px 10px;
  background-color: #fafbfc;
  border-bottom: 1px solid #e1e4e8;
`

const Mark = styled.span`
  font-weight: bold;
  padding-right: 4px;
`

export const AddCommands = ({ onCodeChange, onCmdChange }: any) => {
  const [code, setCode] = useState('print(input)')
  const [cmd, setCmd] = useState('')

  const handleCmdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target
      setCmd(value)
      onCmdChange(value)
    },
    [cmd, code]
  )

  const handleCodeChange = (c: any) => {
    onCodeChange(c.getValue())
    setCode(c.getValue())
  }

  return (
    <AddCommandWrap>
      <AddCommandHeader>
        <Mark>!</Mark>
        <StyledInput onChange={handleCmdChange} value={cmd} />
      </AddCommandHeader>
      <CodeMirror
        value={code}
        options={{
          theme: 'neo',
          mode: '',
        }}
        onChange={(e) => handleCodeChange(e)}
        height={'500px'}
      />
    </AddCommandWrap>
  )
}
