import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
let productsHtml = "";
products.forEach((product) => {
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
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

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

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-ID='${
            product.id
          }'>Add to Cart</button>
        </div>
  `;
});
document.querySelector(".products-grid").innerHTML = productsHtml;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const productSelectElement = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const quantity = Number(productSelectElement.value);
    let matchingItem;

    cart.forEach((product) => {
      if (productId === product.productId) matchingItem = product;
    });

    if (matchingItem) {
      matchingItem.quantity = Number(matchingItem.quantity) + quantity;
    } else {
      cart.push({
        productId,
        quantity,
      });
    }

    let cartQuantity = 0;
    cart.forEach((product) => {
      cartQuantity += Number(product.quantity);
    });

    document.querySelector(".js-cart-quantity").textContent = cartQuantity;

    const addedMessageEl = document.querySelector(
      `.js-added-message-${productId}`
    );

    showAddedMessage(addedMessageEl);
  });
  let addedTimeout;
  function showAddedMessage(addedMessage) {
    clearTimeout(addedTimeout);
    addedMessage.classList.add("opacity1");

    addedTimeout = setTimeout(() => {
      addedMessage.classList.remove("opacity1");
    }, 2000);
  }
});
