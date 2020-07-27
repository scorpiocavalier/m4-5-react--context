import React      from 'react'
import Item       from './Item'
import { items }  from '../data'

export default ({ purchasedItems, handleAttemptedPurchase }) => {
  return items.map((item, index) => {
    return (
      <Item
        key={item.id}
        item={item}
        purchasedItems={purchasedItems}
        handleAttemptedPurchase={() => handleAttemptedPurchase(item)}
        isFirst={index === 0}
      />
    )
  })
}