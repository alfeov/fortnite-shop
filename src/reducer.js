export default function shopReducer(state, { type, payload }) {
  const { order } = state
  if (type === 'add_to_order') {
    let isItemInOrder = false
    const updatedOrder = order.map((orderItem) => {
      if (orderItem.offerId === payload.offerId) {
        isItemInOrder = true
        return { ...orderItem, quantity: orderItem.quantity + 1 }
      }
      return orderItem
    })
    return {
      ...state,
      order: isItemInOrder
        ? updatedOrder
        : [...order, { ...payload, quantity: 1 }],
    }
  }
  if (type === 'remove_from_order') {
    const updatedOrder = order.filter(({ offerId }) => offerId !== payload)
    return { ...state, order: updatedOrder }
  }
  if (type === 'increase_order_item') {
    const updatedOrder = order.map((orderItem) => {
      if (orderItem.offerId === payload)
        return { ...orderItem, quantity: orderItem.quantity + 1 }
      return orderItem
    })
    return { ...state, order: updatedOrder }
  }
  if (type === 'decrease_order_item') {
    const updatedOrder = order.map((orderItem) => {
      if (orderItem.offerId === payload)
        return { ...orderItem, quantity: orderItem.quantity - 1 }
      return orderItem
    })
    return { ...state, order: updatedOrder }
  }
  if (type === 'clear_order') {
    return { ...state, order: [] }
  }
  if (type === 'received_items') {
    return { ...state, items: payload, isLoading: false }
  }
  if (type === 'received_error') {
    return { ...state, items: [], isError: true, isLoading: false }
  }
  return state
}
