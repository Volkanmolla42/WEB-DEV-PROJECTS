import { calculateCartQuantity, cart } from '../../data/cart.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import { getProduct } from '../../data/products.js'
import formatCurrency from '../utils/money.js'

export function renderPaymentSummary() {
  let productsTotalCents = 0
  let shippingTotalCents = 0

  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId)
    productsTotalCents += matchingProduct.priceCents * cartItem.quantity

    const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingTotalCents += matchingDeliveryOption.priceCents
  })

  const totalBeforeTax = productsTotalCents + shippingTotalCents
  const tax = totalBeforeTax * 0.1
  const TOTALCENTS = totalBeforeTax + tax

  const paymentSummaryHTML = ` <div class="payment-summary-title">Order Summary</div>
        <div class="payment-summary-row">
          <div>Items (${calculateCartQuantity()}):</div>
          <div class="payment-summary-money">$${formatCurrency(
            productsTotalCents,
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(
            shippingTotalCents,
          )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(
            totalBeforeTax,
          )}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(
            TOTALCENTS,
          )}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}
