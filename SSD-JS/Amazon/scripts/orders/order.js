import { cart } from '../../data/cart-class.js'
import { getProduct, loadProductsFetch } from '../../data/products.js'
import formatCurrency from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export const orders = JSON.parse(localStorage.getItem('orders')) || []

export function addOrder(order) {
  orders.unshift(order)
  saveToStorage()
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}

const CartQuantity = document.querySelector('.js-cart-quantity')
if (CartQuantity) CartQuantity.innerText = cart.calculateCartQuantity()
function renderOrderPage() {
  let orderGridHtml = ''

  orders.forEach((order, index) => {
    const orderTime = formatDate(order.orderTime)
    const orderTotal = `$${formatCurrency(order.totalCostCents)}`

    orderGridHtml += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${orderTotal}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid js-order-details-grid-${index}"></div>
    </div>
    `
  })

  const orderGridElement = document.querySelector('.js-order-grid')
  if (orderGridElement) {
    orderGridElement.innerHTML =
      orderGridHtml ||
      `<p>Your orders is empty.</p>
      <a href="amazon.html">
        <button class="view-products-link">View Products</button>
      </a>
      `

    orders.forEach((order, index) => {
      let orderDetailsHtml = ''

      order.products.forEach((product) => {
        const deliveryDate = dayjs(product.estimatedDeliveryTime).format(
          'MMMM D',
        )
        const matchingProduct = getProduct(product.productId)

        if (matchingProduct) {
          orderDetailsHtml += `
            <div class="product-image-container">
              <img src="${matchingProduct.image}" alt="${
            matchingProduct.name
          } image"/>
            </div>
            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">Arriving on: ${deliveryDate} </div>
              <div class="product-quantity">Quantity: ${
                product.quantity || 1
              }</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${
            product.productId
          }">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
        } else {
          console.warn(`Product with ID ${product.productId} not found.`)
        }
      })

      const orderDetailsGrid = document.querySelector(
        `.js-order-details-grid-${index}`,
      )
      if (orderDetailsGrid) {
        orderDetailsGrid.innerHTML = orderDetailsHtml
      } else {
        console.error(
          `Element with class .js-order-details-grid-${index} not found in the DOM`,
        )
      }
    })
  }
}

async function loadOrder() {
  try {
    await loadProductsFetch()
    renderOrderPage()
  } catch (error) {
    console.error('Unexpected error, please try again later', error)
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const monthName = monthNames[date.getMonth()]
  const day = date.getDate()

  return `${monthName} ${day}`
}

loadOrder()
