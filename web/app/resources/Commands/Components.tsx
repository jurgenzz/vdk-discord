import React from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  color: #fff;
  background-color: #2ea44f;
  border-color: rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.1), inset 0 1px 0 hsla(0, 0%, 100%, 0.03);
  display: inline-block;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid;
  border-radius: 6px;
  appearance: none;
`
export const ButtonWrap = styled.div`
  text-align: right;
`

export const StyledInput = styled.input`
  padding: 5px 12px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
  width: 250px;
`

export const Pager = styled.div`
  text-align: center;

  button {
    border: none;
    background: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`
