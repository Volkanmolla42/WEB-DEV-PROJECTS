import { cart } from '../data/cart-class.js'
import { products, loadProducts } from '../data/products.js'

function renderProductsGrid() {
  const url = new URL(window.location.href)
  const search = url.searchParams.get('search')
  console.log(search)
  let filteredProducts = products

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search)) {
          matchingKeyword = true
        }
      })

      return matchingKeyword || product.name.toLowerCase().includes(search)
    })
  }
  let productsHtml = ''
  filteredProducts.forEach((product) => {
    productsHtml += `
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}
          
          <div class="product-spacer"></div>
          <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-ID='${
            product.id
          }'>Add to Cart</button>
        </div>
  `
  })

  document.querySelector('.products-grid').innerHTML = productsHtml

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let addedTimeout

    button.addEventListener('click', () => {
      const { productId } = button.dataset
      const productSelectElement = document.querySelector(
        `.js-quantity-selector-${productId}`,
      )
      const quantity = Number(productSelectElement.value)

      cart.addToCart(productId, quantity)
      displayQuantity()

      const addedMessageEl = document.querySelector(
        `.js-added-message-${productId}`,
      )
      showAddedMessage(addedMessageEl)
    })

    function showAddedMessage(addedMessageEl) {
      clearTimeout(addedTimeout)
      addedMessageEl.classList.add('opacity1')

      addedTimeout = setTimeout(() => {
        addedMessageEl.classList.remove('opacity1')
      }, 2000)
    }
  })
  function displayQuantity() {
    document.querySelector(
      '.js-cart-quantity',
    ).textContent = cart.calculateCartQuantity()
  }
  displayQuantity()
}
//document.querySelector('.js-search-button').addEventListener('click')

const searchInput = document.querySelector('.js-search-bar')
const searchBtn = document.querySelector('.js-search-button')

searchBtn.addEventListener('click', searchProduct)
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchProduct()
})
function searchProduct() {
  const inputValue = searchInput.value.trim().toLowerCase()
  window.location.href = `http://127.0.0.1:5500/SSD-JS/Amazon/amazon.html?search=${inputValue}`
}

loadProducts(renderProductsGrid)
