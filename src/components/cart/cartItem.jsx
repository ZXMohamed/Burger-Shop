import { memo } from "react";
import { MdCurrencyRupee } from "react-icons/md";

const CartItem = memo(({ id, title, price, quantity, photo, increment, decrement }) => {

  return (
    <div className="cartItem">
      <div>
        <h4>{ title }</h4>
        <img src={ photo } alt={ title } />
      </div>
      <div>
        <h5>{ price }<MdCurrencyRupee /></h5>
        <button onClick={ () => { decrement(id) } }>-</button>
        <input type="number" readOnly value={ quantity } />
        <button onClick={ () => { increment(id) } }>+</button>
      </div>
    </div>)
});

export default CartItem;