import { createContext, useContext } from 'react'

export const ShopContext = createContext(null)
export const ShopDispatchContext = createContext(null)

export function useShop() {
  return useContext(ShopContext)
}

export function useShopDispatch() {
  return useContext(ShopDispatchContext)
}
