import React from 'react'
import styled from 'styled-components'

const UserCardBlock = ({products, removeItem}) => {

  const renderCartImage = (images) => {
    if(images.length > 0) {
      let image = images[0]
      return `http://localhost:5000/${image}`
    }
  }

  const renderItems = () => (
    products && products.map((product,idx)=>(
      <tr key={idx}>
        <td>
          <img src={renderCartImage(product.images)} />
        </td>
        <td>
          {product.quantity} 개
        </td>
        <td>
          {product.price.toLocaleString('ko-KR')} 원
        </td>
        <td>
          <button onClick={()=>removeItem(product._id)}>삭제하기</button>
        </td>
      </tr>
    ))
  )

  return (
    <BlockWrap className='pd-2'>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Image</th>
            <th>Product Image</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {renderItems()}
        </tbody>
      </table>
    </BlockWrap>
  )
}

export default UserCardBlock

const BlockWrap = styled.div`
  table{
    border-collapse: collapse;
    width: 100%;
  }
  td, th{
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even){
    bacgkround-color: #ddd;
  }

  img{
    height: 70px;
  }
`;