import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import styled from 'styled-components';
import Paypal from '../../utils/Paypal';

const CartPage = ({user}) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0)
  const [showTotal, setShowTotal] = useState(false)


  useEffect(() => {
    let cartItems = []
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, user.userData.cart))
          .then(res=>{
            calcTotal(res.payload)
          })
      }
    }
  }, [user.userData])

  let calcTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item=>{
      total += parseInt(item.price, 10) * item.quantity
    })
    setTotal(total.toLocaleString('ko-KR'))
    setShowTotal(true)
  }

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId))
        .then(response => {
          if(response.payload.productInfo.length <= 0){
            setShowTotal(false)
          }
        })
}

  return (
    <CartWrap className='pd-2'>
      <h1 className='mg-2'>My Cart</h1>
      <UserCardBlock products={user.cartDetail} removeItem={removeFromCart} />

      <Total>
        {showTotal ? 
          (<h2>총 금액 : {total} 원</h2>) 
          : 
          (<p className="mg-2">장바구니가 비었습니다.</p>)}
      </Total>

      <Paypal />
    </CartWrap>
  )
}

export default CartPage

const CartWrap = styled.section`
  h1{
    text-align: center;
  }
`;

const Total = styled.article`
  p{
    text-align: center;
    font-size: 1.5rem;
  }
`; 