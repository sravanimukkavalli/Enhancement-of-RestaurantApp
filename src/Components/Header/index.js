import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, restaurantName} = value

        return (
          <div className="header-container nav-header">
            <Link to="/" style={{textDecoration: 'none'}}>
              <h1 className="logo-heading">{restaurantName}</h1>
            </Link>
            <div className="my-orders-cart-container">
              <p className="my-orders-text">My Orders</p>
              <Link to="/cart">
                <button
                  className="cart-item-container"
                  type="button"
                  data-testid="cart"
                >
                  <AiOutlineShoppingCart size={30} />
                  <div className="cart-count-badge">
                    <p className="cart-count">{cartList.length}</p>
                  </div>
                </button>
              </Link>
            </div>
            <button type="button" className="logout" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
