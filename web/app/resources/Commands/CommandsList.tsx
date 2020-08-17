import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CodeMirror from '@uiw/react-codemirror'
import { Pager } from './Components'
require('codemirror/theme/monokai.css')
require('codemirror/mode/javascript/javascript.js')

const List = styled.div`
  max-width: 800px;
  margin: 0 auto 60px;
`

const Title = styled.div`
  color: #0366d6;
  font-size: 20px;
  font-weight: 600;
`
const CommandItem = styled.div`
  padding: 20px 0;
  /* border-bottom: 1px solid #e1e4e8; */
  /* margin: 0 40px; */
`

const Text = styled.div`
  color: #586069;
  font-size: 14px;
  margin-top: 10px;
`

const CommandWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  padding: 10;
`

const PER_PAGE = 10

export const CommandsList = ({ commands }: { commands: any[] }) => {
  const [page, setPage] = useState(0)

  useEffect(() => {
    setPage(0)
  }, [commands])

  const nextPageDisabled = page + PER_PAGE >= commands.length
  const nextPage = () => {
    if (!nextPageDisabled) {
      setPage(page + PER_PAGE)
      window.scrollTo({ top: 0 })
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - PER_PAGE)
    }
  }

  const chunk = commands.slice(page, page + PER_PAGE)
  return (
    <List>
      {chunk.map(([cmd, value]: [string, string]) => (
        <CommandItem key={cmd}>
          <Title>{cmd}</Title>
          <CommandWrap>
            <CodeMirror
              value={value}
              options={{
                theme: 'neo',
                mode: '',
                readOnly: true,
              }}
            />
          </CommandWrap>
        </CommandItem>
      ))}
      <Pager>
        <button disabled={page === 0} onClick={prevPage}>
          Newer
        </button>
        <button disabled={nextPageDisabled} onClick={nextPage}>
          Older
        </button>
      </Pager>
    </List>
  )
}
