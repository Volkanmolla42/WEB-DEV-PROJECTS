import { getProduct, loadProductsFetch } from '../../data/products.js'
import { orders } from './order.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

const url = new URL(window.location.href)
const orderID = url.searchParams.get('orderId')
const productID = url.searchParams.get('productId')

async function renderTracking() {
  await loadProductsFetch()
  const orderProduct = findProductFromOrder()
  const matchingProduct = getProduct(orderProduct.productId)
  console.log(orderProduct)
  console.log(matchingProduct)
  const deliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format(
    'dddd, MMMM D',
  )

  const html = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${deliveryDate}</div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">Quantity: ${orderProduct.quantity}</div>

        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`
  document.querySelector('.js-order-tracking').innerHTML = html
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
