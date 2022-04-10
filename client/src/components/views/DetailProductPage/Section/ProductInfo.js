import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../_actions/user_actions'

const ProductInfo = ({detail}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(detail._id))
  }

  return (
    <InfoWrap className='pd-2'>
      <div>
        <p className='title'>제품 정보</p>
        <p>가격: ${detail.price}</p>
        <p>조회수: {detail.views}</p>
        <p>누적 판매 수: {detail.sold}</p>
        <p>상세 설명: {detail.description}</p>
      </div>
      <button onClick={handleClick}>장바구니에 담기</button>
    </InfoWrap>
  )
}

export default ProductInfo

const InfoWrap = styled.article`
  font-size: 16px;

  .title{
    color: #000;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
  }

  button{
    margin-top: 100px;
    width: 100%;
    border: none;
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px;
    padding: 8px;
  }
`;