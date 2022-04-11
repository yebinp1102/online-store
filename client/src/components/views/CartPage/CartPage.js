import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import styled from 'styled-components';

const CartPage = ({user}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let cartItems = []
    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })
        dispatch(getCartItems(cartItems, user.userData.cart))
      }
    }
}, [user.userData])

  return (
    <CartWrap className='pd-2'>
      <h1>My Cart</h1>
      <UserCardBlock products={user.cartDetail && user.cartDetail.product}/>
    </CartWrap>
  )
}

export default CartPage

const CartWrap = styled.section`
  
`;