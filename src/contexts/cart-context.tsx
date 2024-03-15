'use client'
import { ReactNode, createContext, useContext, useState } from 'react'
interface CartItem {
  productId: string
  quantity: number
}
type CartContextType = {
  itens: Array<CartItem>
  addToCart: (productId: string) => void
}

const CartContext = createContext({} as CartContextType)

export interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItens, setCartItens] = useState<Array<CartItem>>([])

  function addToCart(productId: string) {
    setCartItens((state) => {
      const productInCart = state.some((item) => item.productId === productId)
      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          } else {
            return item
          }
        })
      } else {
        return [...state, { productId, quantity: 1 }]
      }
    })
  }
  return (
    <CartContext.Provider value={{ itens: cartItens, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
