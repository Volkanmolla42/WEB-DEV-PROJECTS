import { cart } from '../../data/cart-class.js'
import { getProduct } from '../../data/products.js'
import formatCurrency from '../utils/money.js'
import {
  deliveryOptions,
  getDeliveryOption,
} from '../../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { renderPaymentSummary } from './paymentSummary.js'
export function renderOrderSummary() {
  let checkoutHTML = ''

  cart.cartItems.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId)
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)

    if (matchingProduct && deliveryOption) {
      const deliveryDate = dayjs()
        .add(deliveryOption.deliveryDays, 'days')
        .format('dddd, MMMM D')
      checkoutHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${
          matchingProduct.id
        }">
          <div class="delivery-date">Delivery date: ${deliveryDate}</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}" />
            <div class="cart-item-details">
              <div class="product-name js-product-name-${matchingProduct.id}">${
        matchingProduct.name
      }</div>
              <div class="product-price js-product-price-${
                matchingProduct.id
              }">${matchingProduct.getPrice()}</div>
              <div class="product-quantity js-product-quantity-${
                matchingProduct.id
              }">
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
                <span class="delete-quantity-link link-primary js-cart-delete-button js-delete-link-${
                  matchingProduct.id
                }" data-product-id="${matchingProduct.id}">Delete</span>
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
    checkoutHTML ||
    `<p><h3>Your Amazon Cart is empty.</h3></p>
    <p>Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.</p>
    <a href="amazon.html">
    <button class="view-products-link">View Products</button>
    </a>
    `
  document.querySelector(
    '.js-checkout-header',
  ).innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cart.calculateCartQuantity()} items</a>)`

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
        cart.removeFromCart(productId)
        renderOrderSummary()
        renderPaymentSummary()
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
      cart.updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary()
      renderPaymentSummary()
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

      cart.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity
          cart.saveToStorage()
          renderOrderSummary()
          renderPaymentSummary()
        }
      })
      quantityInput.classList.add('d-none')
      updateButton.textContent = 'Update'
    }
  }
}
