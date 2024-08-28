class Cart {
    cartItems
    #localStorageKey

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.#loadFromStorage()
    }

    #loadFromStorage() {
        this.cartItems =
            JSON.parse(localStorage.getItem(this.#localStorageKey)) || []
    }
    saveToStorage() {
        localStorage.setItem(
            this.#localStorageKey,
            JSON.stringify(this.cartItems),
        )
    }
    addToCart(productId, quantity) {
        let matchingItem

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) matchingItem = cartItem
        })

        if (matchingItem) {
            matchingItem.quantity = Number(matchingItem.quantity) + quantity
        } else {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1',
            })
        }
        this.saveToStorage()
    }
    removeFromCart(productId) {
        const newCart = []
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) newCart.push(cartItem)
        })
        this.cartItems = newCart
        this.saveToStorage()
    }
    calculateCartQuantity() {
        let newQuantity = this.cartItems.reduce(
            (total, cartItem) => total + Number(cartItem.quantity),
            0,
        )
        return newQuantity
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) matchingItem = cartItem
        })
        matchingItem.deliveryOptionId = deliveryOptionId
        this.saveToStorage()
    }
}

const cart = new Cart('cart-oop')

const businessCart = new Cart('cart-business')

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1)
businessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1)

console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart)
