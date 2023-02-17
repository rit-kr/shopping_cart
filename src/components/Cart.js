import { BsCart4 } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';




export default function Cart(props) {

  return (
    <>
      <div className="Cart">
        {/* <FaRegWindowClose /> */}
        <div className="flex justify-center">
          <BsCart4 />
        </div>
        <div>
          <ul>
            {
              props.selectedProduct.map((cartProduct) =>
                <li>
                  <div className="flex m-2 justify-evenly">
                    <img className="cart-img " src={`./products/${cartProduct.sku}_2.jpg`} alt="Tshirt" />
                    <div className="flex justify-center items-center flex-col basis-1/4">
                      <h3>{cartProduct.title}</h3>
                    </div>
                    <div className='flex justify-center flex-col items-center'>
                      <h3>${cartProduct.price * cartProduct.quantity}</h3>
                      <div>
                        <button className='bg-neutral-300 px-1' disabled={cartProduct.quantity === 1} onClick={() => props.handleDecrease({ ...cartProduct })}>-</button>
                        <span className='m-1'>{cartProduct.quantity}</span>
                        <button className='bg-neutral-300 px-1' onClick={() => props.handleIncrease({ ...cartProduct })}>+</button>
                        <button onClick={() => props.handleDelete({ ...cartProduct })}><MdDeleteOutline /></button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
        <div>
          <div className="flex justify-evenly margin">
            <h3>Subtotal</h3>
            <h4>$
              {props.selectedProduct.reduce((total, curVal) => {
                return (total + (curVal.price * curVal.quantity))
              }, 0)}
            </h4>
          </div>
          <button className="center checkout" onClick={() => props.handleCheckout()}>CHECKOUT</button>
        </div>
      </div>
    </>
  );
}