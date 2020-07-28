import React, { useEffect } from "react"
import { Link }             from "react-router-dom"
import styled               from "styled-components"
import Items                from './Items'
import cookieSrc            from "../cookie.svg"
import useInterval          from '../hooks/useInterval'
import useKeydown           from '../hooks/useKeydown'
import useDocumentTitle     from '../hooks/useDocumentTitle'
import usePersistedState    from '../hooks/usePersistedState'
import useTimestamp         from '../hooks/useTimestamp'
import {
  items,
  initialTimestamp,
  initialCookies,
  initialRate,
  initialItems
} from '../data'

export default () => {
  const [timestamp, setTimestamp] = usePersistedState('time-stamp', initialTimestamp)
  const [numCookies, setNumCookies] = usePersistedState('num-cookies' , initialCookies)
  const [cookieRate, setCookieRate] = usePersistedState('cookieRate', initialRate)
  const [purchasedItems, setPurchasedItems] = usePersistedState('purchased-items', initialItems)

  const incrementCookiesBy = (amount = 1) => setNumCookies(numCookies + amount)

  const handleAttemptedPurchase = ({ id, cost }) => {
    // 1. can u purchase?
    if (numCookies >= cost) {
      // 2.1 Yes => Deduct cookies.
      incrementCookiesBy(-cost)
      // 2.2 Yes => Increment item count in purchasedItems.
      setPurchasedItems(prevValue => {
        return { ...prevValue, [id]: prevValue[id] + 1 }
      })
    } else {
      // 3. No => Return an error with window.alert
      window.alert("Not enough cookies.")
    }
  }

  const calculateCookiesPerSecond = purchasedItems => {
    const reducer = (acc, itemId) => {
      const numOwned = purchasedItems[itemId]
      const item = items.find(item => item.id === itemId)
      const value = item.value

      return acc + value * numOwned
    }
    return Object.keys(purchasedItems).reduce(reducer, 0)
  }

  useTimestamp(timestamp, cookieRate, incrementCookiesBy)

  useInterval(() => {
    setTimestamp(Date.now())
    setCookieRate(calculateCookiesPerSecond(purchasedItems))
    incrementCookiesBy(cookieRate)
  }, 1000)

  useDocumentTitle(`${numCookies} cookies - Cookie Clicker`, `Cookie Clicker`)

  useKeydown("Space", incrementCookiesBy)

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookieRate}</strong> cookies per second
        </Indicator>
        <Button onClick={() => incrementCookiesBy()}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        <Items purchasedItems={purchasedItems} handleAttemptedPurchase={handleAttemptedPurchase} />
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`

const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`

const Cookie = styled.img`
  width: 200px;
`

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`