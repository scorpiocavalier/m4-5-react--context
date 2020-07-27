import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default ({ item: { id, name, cost, value }, purchasedItems, handleAttemptedPurchase, isFirst }) => {
  const numOwned = Object.entries(purchasedItems).find(([ itemName ]) => itemName === id)[1]
  const btnRef = useRef()

  useEffect(() => {
    if (isFirst)
      btnRef.current.focus()
  }, [isFirst])

  return <ButtonWrapper onClick={handleAttemptedPurchase} ref={btnRef}>
    <ItemWrapper>
      <Name>{name}</Name>
      <Specs>Cost: {cost} cookie(s). Produces {value} cookies/second.</Specs>
    </ItemWrapper>
    <CounterWrapper>
      <Counter>{numOwned}</Counter>
    </CounterWrapper>
  </ButtonWrapper>
}

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  width: 450px;
  padding: 10px 0;
  border: none;
  border-bottom: 2px solid gray;
  background: transparent;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:focus {
    background: green;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const CounterWrapper = styled(ItemWrapper)`
  justify-content: center;
  align-items: center;
  width: 75px;
`

const Name = styled.span`
  font-size: 24px;
`

const Specs = styled.div`
  padding: 5px 0 10px 0;
`

const Counter = styled.div`
  font-size: 30px;
`