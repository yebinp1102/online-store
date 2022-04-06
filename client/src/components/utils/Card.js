import React from 'react'
import styled from 'styled-components'

const Card = ({cover}) => {
  return (
    <CardWrap>
      {cover}
    </CardWrap>
  )
}

export default Card

const CardWrap = styled.div`
  height: 200px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;