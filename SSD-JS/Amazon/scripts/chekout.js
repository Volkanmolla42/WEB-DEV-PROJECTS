import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsFetch } from '../data/products.js'
import { loadCart } from '../data/cart.js'

function loadCartPromise() {
  return new Promise((resolve, reject) => {
    loadCart((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function loadPage() {
  try {
    await loadProductsFetch()
    await loadCartPromise()
    renderOrderSummary()
    renderPaymentSummary()
  } catch (error) {
    console.error('Unexpected error, please try again later', error)
  }
}

loadPage()
