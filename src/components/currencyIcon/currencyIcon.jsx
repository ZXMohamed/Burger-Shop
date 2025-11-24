import React, { useEffect, useRef, useState } from 'react'
import icons from 'currency-icons'

function CurrencyIcon({ currency }) {

  const [symbol, setSymbol ] = useState(icons[currency]?.symbol);
  
  useEffect(() => {
    let symbol = icons[currency]?.symbol;
    if (symbol) { 
      setSymbol(symbol);
    }else{
      setSymbol(currency);
    }
  }, [currency]);

  return (
    <b>{ symbol }</b>
  )
}

export default CurrencyIcon