import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import LoginRoute from './Components/LoginRoute'
import ProtectedRoute from './Components/ProtectedRoute'
import CartContext from './CartContext'
import Home from './Components/Home'
import CartRoute from './Components/CartRoute'

import './App.css'

class App extends Component {
  state = {cartItems: [], restaurantName: ''}

  removeAllCartItems = () => {
    this.setState({cartItems: []})
  }

  setRestaurantName = name => {
    this.setState({restaurantName: name})
  }

  addCartItem = item => {
    const {cartItems} = this.state
    const existingItem = cartItems.find(each => each.dishId === item.dishId)
    if (existingItem) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(each => {
          if (each.dishId === item.dishId) {
            return {...each, quantity: each.quantity + item.quantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartItems: [...prevState.cartItems, item]}))
    }
  }

  removeCartItem = dishId => {
    const {cartItems} = this.state
    const filteredList = cartItems.filter(each => each.dishId !== dishId)
    this.setState({cartItems: filteredList})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(each => {
        if (each.dishId === dishId) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartItems} = this.state
    const item = cartItems.find(each => each.dishId === dishId)
    if (item.quantity > 1) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(each => {
          if (each.dishId === dishId) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }))
    } else {
      const filteredList = cartItems.filter(each => each.dishId !== dishId)
      this.setState({cartItems: filteredList})
    }
  }

  render() {
    const {cartItems, restaurantName} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList: cartItems,
          restaurantName,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          setRestaurantName: this.setRestaurantName,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
