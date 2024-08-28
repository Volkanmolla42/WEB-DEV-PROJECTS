export let cart
loadFromStorage()
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || []
}

export function addToCart(productId, quantity) {
    let matchingItem

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem
    })

    if (matchingItem) {
        matchingItem.quantity = Number(matchingItem.quantity) + quantity
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1',
        })
    }
    saveToStorage()
}

export function removeFromCart(productId) {
    const newCart = []
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) newCart.push(cartItem)
    })
    cart = newCart
    saveToStorage()
}

export function calculateCartQuantity() {
    let newQuantity = cart.reduce(
        (total, cartItem) => total + Number(cartItem.quantity),
        0,
    )
    return newQuantity
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem
    })
    matchingItem.deliveryOptionId = deliveryOptionId
    saveToStorage()
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}
