import { useReducer } from 'react'
import { ShopContext, ShopDispatchContext } from './ShopContext'
import shopReducer from './reducer'

const initialState = {
  items: [],
  order: [],
  isLoading: true,
  isError: false,
}

export function ShopProvider({ children }) {
  const [value, dispatch] = useReducer(shopReducer, initialState)

  return (
    <ShopContext value={value}>
      <ShopDispatchContext value={dispatch}>{children}</ShopDispatchContext>
    </ShopContext>
  )
}
