import React, { useEffect, useState } from 'react'
import { CommandsList } from './CommandsList'
import { AddCommands } from './AddCommands'
import { ButtonWrap, Button, StyledInput } from './Components'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 0;
`

export const Commands = () => {
  const [add, setAdd] = useState(false)
  const [cmd, saveCmd] = useState()
  const [code, saveCode] = useState()
  const [commands, setCommands] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const init = async () => {
      const re = await fetch('/commands')
      const json = await re.json()
      setCommands(json.reverse())
    }
    init()
  }, [])

  const postCmd = () => {
    console.log(cmd)
    fetch('/commands', { method: 'POST', body: JSON.stringify({ code, cmd }) })
  }
  const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    e.target.blur()
    setAdd(!add)
  }

  const filterCommands = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value = '' } = e.target
    if (!value) {
      return setFiltered([])
    }

    let filteredCmds = commands.filter(([cmd]: [string]) => cmd.toLowerCase().includes(value.toLowerCase()))
    setFiltered(filteredCmds)
  }

  const commandsToShow: any[] = filtered.length ? filtered : commands

  return (
    <>
      <Wrap>
        <StyledInput placeholder="Search.." onChange={filterCommands} />
        <ButtonWrap>
          {add && <Button onClick={postCmd}>Save</Button>}
          <Button onClick={handleAddButton}>{add ? 'Cancel' : 'Add command'}</Button>
        </ButtonWrap>
      </Wrap>
      {add ? <AddCommands onCmdChange={saveCmd} onCodeChange={saveCode} /> : <CommandsList commands={commandsToShow} />}
    </>
  )
}
