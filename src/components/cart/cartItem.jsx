import { memo, useEffect, useRef } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import CurrencyIcon from "../currencyIcon/currencyIcon";
import Counter from "../counter/counter";
import { loadMainImage } from "../../assets/images/images";

const CartItem = memo(({ id, title, price, currency, quantity, photo, increment, decrement }) => {

  const itemImg = useRef();

  useEffect(() => {
    loadMainImage(photo, itemImg, {type:"img"})
  },[]);

  return (
    <div className="cartItem">
      <div>
        <h3 data-testId={`cardItemNameTest${id}`}>{ title }</h3>
        <img ref={itemImg} src={ photo } alt={ title } data-testId={ `cardItemPhotoTest${id}` } />
      </div>
      <div>
        <h4 data-testId={ `cardItemPriceTest${id}` }><bdi>
          <Counter to={ price }><span></span></Counter> <CurrencyIcon currency={ currency } />
        </bdi></h4>
        <button onClick={ () => { decrement(id) } } data-testid={ `cardItemDECTest${id}` }>-</button>
        <input type="number" readOnly value={ quantity } data-testid={ `cardItemQuantityTest${id}` } />
        <button onClick={ () => { increment(id) } } data-testid={`cardItemINCTest${id}`}>+</button>
      </div>
    </div>)
});

export default CartItem;