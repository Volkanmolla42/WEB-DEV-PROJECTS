import { getProduct, loadProductsFetch } from '../../data/products.js'
import { orders } from '../../data/orders.js'
import { calculateCartQuantity } from '../../data/cart.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const url = new URL(window.location.href)
const orderID = url.searchParams.get('orderId')
const productID = url.searchParams.get('productId')

async function renderTracking() {
  await loadProductsFetch()

  const orderProduct = findProductFromOrder()

  if (!orderProduct) {
    console.error('Product not found in order.')
    return
  }

  const matchingProduct = getProduct(orderProduct.productId)
  const matchingOrder = orders.find((order) => order.id === orderID)

  if (!matchingOrder) {
    console.error('Order not found.')
    return
  }

  const deliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format(
    'dddd, MMMM D',
  )

  const today = dayjs()
  const orderTime = dayjs(matchingOrder.orderTime)
  const deliveryTime = dayjs(orderProduct.estimatedDeliveryTime) // Corrected this line

  const percentProgress = Math.min(
    ((today - orderTime) / (deliveryTime - orderTime)) * 100,
    100,
  )

  const deliveredMessage =
    today < deliveryTime ? 'Arriving on ' : 'Delivered on '

  const html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">${deliveredMessage} ${deliveryDate}</div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">Quantity: ${orderProduct.quantity}</div>

    <img class="product-image" src="${matchingProduct.image}" />

    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = html

  // Update cart quantity at the top
  document.querySelector(
    '.js-cart-quantity',
  ).innerText = calculateCartQuantity()
}

function findProductFromOrder() {
  const order = orders.find((order) => order.id === orderID)

  if (!order) return null

  const matchingProduct = order.products.find(
    (product) => product.productId === productID,
  )

  return matchingProduct || null
}

renderTracking()
