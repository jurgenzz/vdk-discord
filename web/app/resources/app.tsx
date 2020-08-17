import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Commands } from './Commands'

const Header = styled.div`
  background: #fbfbfb;
  padding: 24px;
  font-weight: 400;
  border-bottom: 1px solid #e8e9f7;
  font-size: 20px;
`

export const App = () => (
  <>
    <Header>vd.jurg.is</Header>
    <Commands />
  </>
)

ReactDOM.render(<App />, document.getElementById('app'))
