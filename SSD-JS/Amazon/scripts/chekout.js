import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  saveCart,
} from '../data/cart.js'
import products from '../data/products.js'
import formatCurrency from './utils/money.js'
import deliveryOptions from '../data/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
const today = dayjs()
const deliveryDate = today.add(7, 'days')
console.log(deliveryDate)
console.log(deliveryDate.format('dddd, MMMM D'))

function renderCart() {
  let checkoutHTML = ''

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(
      (productItem) => cartItem.productId === productItem.id,
    )

    if (matchingProduct) {
      checkoutHTML += `<div class="cart-item-container">
    <div class="delivery-date">Delivery date: Wednesday, June 15</div>
    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}" />
      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity:
            <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
            <input class="update-input d-none  js-update-input-${
              matchingProduct.id
            }" type="number" value="${cartItem.quantity}"
            />
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link-${
            matchingProduct.id
          }"
            data-product-id="${matchingProduct.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-cart-delete-button" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }" />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }" />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${
            matchingProduct.id
          }" />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    }
  })
  if (cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML =
      '<p>Your cart is empty.</p>'
  } else {
    document.querySelector('.js-order-summary').innerHTML = checkoutHTML
  }

  document
    .querySelectorAll('.js-cart-delete-button')
    .forEach((cartDeleteButton) => {
      cartDeleteButton.addEventListener('click', () => {
        const productId = cartDeleteButton.dataset.productId
        removeFromCart(productId)
        renderCart()
      })
    })
  document.querySelector(
    '.js-checkout-header',
  ).innerHTML = `  Checkout (<a class="return-to-home-link" href="amazon.html">${calculateCartQuantity()} items</a
          >)`
  document.querySelectorAll('.update-quantity-link').forEach((updateButton) => {
    let updating = false

    const handleUpdate = (e) => {
      // Eğer 'click' değilse ve basılan tuş Enter değilse, fonksiyondan çık
      if (e.type !== 'click' && e.key !== 'Enter') {
        return
      }

      updating = !updating
      const productId = updateButton.dataset.productId
      const quantityInput = document.querySelector(
        `.js-update-input-${productId}`,
      )

      if (updating) {
        quantityInput.classList.remove('d-none')
        updateButton.textContent = 'Save'
        quantityInput.focus()
      } else {
        quantityInput.classList.add('d-none')
        let quantity = parseInt(quantityInput.value, 10)
        if (isNaN(quantity) || quantity <= 0) {
          quantity = 1
        }

        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            cartItem.quantity = quantity
            saveCart()
            renderCart()
          }
        })
        updateButton.textContent = 'Update'
      }
    }

    const productId = updateButton.dataset.productId
    const quantityInput = document.querySelector(
      `.js-update-input-${productId}`,
    )

    updateButton.addEventListener('click', handleUpdate)
    // Enter tuşuna basıldığında işlemi tetiklemek için
    quantityInput.addEventListener('keydown', handleUpdate)
  })
}

renderCart()
