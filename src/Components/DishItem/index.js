import {useState} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const DishItem = ({dishDetails}) => {
  const {
    dishName,
    dishPrice,
    dishImage,
    dishDescription,
    dishCurrency,
    dishCalories,
    dishAvailability,
    dishType,
    addonCat,
  } = dishDetails
  const [quantity, setQuantity] = useState(0)

  const renderControllerButton = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const callAddToCart = () => {
          if (quantity > 0) {
            addCartItem({...dishDetails, quantity})
          }
        }

        return (
          <>
            <div className="controller-container">
              <button
                type="button"
                className="button"
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 0))}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="button"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
            {quantity > 0 && (
              <button type="button" onClick={callAddToCart}>
                ADD TO CART
              </button>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <li className="dish-item-container">
      <>
        <div className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''}`}>
          <div
            className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}
          />
        </div>
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-currency-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability && renderControllerButton()}
          {!dishAvailability && (
            <p className="not-availability-text">Not available</p>
          )}
          {addonCat.length !== 0 && (
            <p className="add-on-availability-text">Customizations available</p>
          )}
        </div>
      </>
      <>
        <p className="dish-calories">{dishCalories} calories</p>
        <img src={dishImage} className="dish-image" alt={dishName} />
      </>
    </li>
  )
}

export default DishItem
