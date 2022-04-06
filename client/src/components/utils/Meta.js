import React from 'react'
import styled from 'styled-components'

const Meta = ({title}) => {
  return (
    <MetaWrap>
      <p>{title}</p>
    </MetaWrap>
  )
}

export default Meta

const MetaWrap = styled.div`
  height: 70px;
  padding: 10px;
`;