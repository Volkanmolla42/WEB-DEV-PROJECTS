import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProductsFetch } from '../data/products.js'
import { loadCartFetch } from '../data/cart.js'

async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()])
  } catch (error) {
    console.error('Unexpected error, please try again later', error)
  }
  renderOrderSummary()
  renderPaymentSummary()
}

loadPage()
