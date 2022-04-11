import React from 'react'
import styled from 'styled-components'

const Meta = ({title, price}) => {
  return (
    <MetaWrap>
      <p>{title}</p>
      <p>{price.toLocaleString('ko-KR')} 원</p>
    </MetaWrap>
  )
}

export default Meta

const MetaWrap = styled.div`
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  p{
    margin: 0;
  }
`;