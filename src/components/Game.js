import React, { useContext }  from "react"
import { GameContext }        from './GameContext'
import { Link }               from "react-router-dom"
import styled                 from "styled-components"
import Items                  from './Items'
import cookieSrc              from "../cookie.svg"
import useInterval            from '../hooks/useInterval'
import useKeydown             from '../hooks/useKeydown'
import useDocumentTitle       from '../hooks/useDocumentTitle'
import useTimestamp           from '../hooks/useTimestamp'

export default () => {
  const {
    numCookies, purchasedItems, cookieRate, timestamp,
    setCookieRate, setTimestamp,
    incrementCookiesBy, handleAttemptedPurchase, calculateCookieRate
  } = useContext(GameContext)

  useTimestamp(timestamp, cookieRate, incrementCookiesBy)

  useInterval(() => {
    setTimestamp(Date.now())
    setCookieRate(calculateCookieRate(purchasedItems))
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