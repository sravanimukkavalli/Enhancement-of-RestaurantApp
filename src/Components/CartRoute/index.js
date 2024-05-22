import {IoMdTrash} from 'react-icons/io'
import Header from '../Header'
import CartContext from '../../CartContext'
import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      const renderCartItems = () =>
        cartList.map(item => {
          const {dishId, dishImage, dishName, dishPrice, quantity} = item
          const totalPrice = dishPrice * quantity

          const onDecrement = () => {
            decrementCartItemQuantity(dishId)
          }

          const onIncrement = () => {
            incrementCartItemQuantity(dishId)
          }

          const onRemoveItem = () => {
            removeCartItem(dishId)
          }

          return (
            <li key={dishId} className="cart-item">
              <img src={dishImage} alt={dishName} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{dishName}</h3>
                <p>${totalPrice}</p>
              </div>
              <div className="quantity-controls">
                <button type="button" onClick={onIncrement}>
                  +
                </button>
                <p>{quantity}</p>
                <button type="button" onClick={onDecrement}>
                  -
                </button>
                <button type="button" onClick={onRemoveItem}>
                  <IoMdTrash />
                </button>
              </div>
            </li>
          )
        })

      return (
        <div className="cart-container">
          <Header />
          {cartList.length === 0 ? (
            <div className="empty-cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="Empty Cart"
              />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="cart-route">
              <div className="remove-all">
                <button type="button" onClick={onClickRemoveAll}>
                  Remove All
                </button>
              </div>
              <ul className="cart-items-list">{renderCartItems()}</ul>
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute
