import React from 'react'
import CartDetails from './CartDetails'

export const metadata = {
  title: 'Shopping Cart',
}
export const runtime = 'edge';

const CartPage = () => {
  return <CartDetails />
}

export default CartPage
