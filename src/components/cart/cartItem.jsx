import { memo } from "react";
import { MdCurrencyRupee } from "react-icons/md";

const CartItem = memo(({ id, title, price, quantity, photo, increment, decrement }) => {

  return (
    <div className="cartItem">
      <div>
        <h4 data-testId={`cardItemNameTest${id}`}>{ title }</h4>
        <img src={ photo } alt={ title } data-testId={ `cardItemPhotoTest${id}` } />
      </div>
      <div>
        <h5 data-testId={`cardItemPriceTest${id}`}>{ price }<MdCurrencyRupee /></h5>
        <button onClick={ () => { decrement(id) } } data-testid={`cardItemDECTest${id}`}>-</button>
        <input type="number" readOnly value={ quantity } data-testid={ `cardItemQuantityTest${id}` } />
        <button onClick={ () => { increment(id) } } data-testid={`cardItemINCTest${id}`}>+</button>
      </div>
    </div>)
});

export default CartItem;