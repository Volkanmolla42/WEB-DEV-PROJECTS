import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  saveCart,
  updateDeliveryOption,
} from '../../data/cart.js'
import products from '../../data/products.js'
import formatCurrency from '../utils/money.js'
import deliveryOptions from '../../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export function renderOrderSummary() {
  let checkoutHTML = ''

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(
      (productItem) => cartItem.productId === productItem.id,
    )
    const deliveryOption = deliveryOptions.find(
      (option) => option.id === cartItem.deliveryOptionId,
    )

    if (matchingProduct && deliveryOption) {
      const deliveryDate = dayjs()
        .add(deliveryOption.deliveryDays, 'days')
        .format('dddd, MMMM D')
      checkoutHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">Delivery date: ${deliveryDate}</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" />
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${formatCurrency(
                matchingProduct.priceCents,
              )}</div>
              <div class="product-quantity">
                <span>
                  Quantity:
                  <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span>
                  <input class="update-input d-none js-update-input-${
                    matchingProduct.id
                  }" type="number" value="${cartItem.quantity}" />
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link-${
                  matchingProduct.id
                }" data-product-id="${matchingProduct.id}">Update</span>
                <span class="delete-quantity-link link-primary js-cart-delete-button" data-product-id="${
                  matchingProduct.id
                }">Delete</span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
            </div>
          </div>
        </div>`
    }
  })

  document.querySelector('.js-order-summary').innerHTML =
    checkoutHTML || '<p>Your cart is empty.</p>'
  document.querySelector(
    '.js-checkout-header',
  ).innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${calculateCartQuantity()} items</a>)`

  addEventListeners()
}

function deliveryOptionsHTML(productId, cartItem) {
  return deliveryOptions
    .map((deliveryOption) => {
      const deliveryDate = dayjs()
        .add(deliveryOption.deliveryDays, 'days')
        .format('dddd, MMMM D')
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)}`
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      return `
      <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${
        deliveryOption.id
      }">
        <input type="radio" ${
          isChecked ? 'checked' : ''
        } class="delivery-option-input" name="delivery-option-${productId}" />
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>`
    })
    .join('')
}

function addEventListeners() {
  document
    .querySelectorAll('.js-cart-delete-button')
    .forEach((cartDeleteButton) => {
      cartDeleteButton.addEventListener('click', () => {
        const productId = cartDeleteButton.dataset.productId
        removeFromCart(productId)
        renderOrderSummary()
      })
    })

  document.querySelectorAll('.update-quantity-link').forEach((updateButton) => {
    updateButton.addEventListener('click', handleQuantityUpdate)
  })

  document.querySelectorAll('.update-input').forEach((input) => {
    input.addEventListener('keydown', handleQuantityUpdate)
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { deliveryOptionId, productId } = element.dataset
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary()
    })
  })
}

function handleQuantityUpdate(e) {
  const updateButton = e.target.closest('.update-quantity-link')
  const productId = updateButton.dataset.productId
  const quantityInput = document.querySelector(`.js-update-input-${productId}`)

  if (e.type === 'click' || e.key === 'Enter') {
    if (quantityInput.classList.contains('d-none')) {
      quantityInput.classList.remove('d-none')
      updateButton.textContent = 'Save'
      quantityInput.focus()
    } else {
      let quantity = parseInt(quantityInput.value, 10)
      if (isNaN(quantity) || quantity <= 0) {
        quantity = 1
      }

      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity
          saveCart()
          renderOrderSummary()
        }
      })
      quantityInput.classList.add('d-none')
      updateButton.textContent = 'Update'
    }
  }
}

renderOrderSummary()
