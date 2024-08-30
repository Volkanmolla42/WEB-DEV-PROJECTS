import { cart } from '../../data/cart-class.js'
describe('test suite: addToCArt', () => {
    const tempId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'

    it('adds an existing product to cart', () => {
        spyOn(localStorage, 'setItem')

        cart.cartItems = [
            {
                productId: tempId,
                quantity: 1,
                deliveryOptionId: '1',
            },
        ]
        expect(cart.cartItems.length).toEqual(1)

        cart.addToCart(tempId, 1)
        expect(cart.cartItems.length).toEqual(1)

        expect(cart.cartItems[0].productId).toEqual(tempId)
        expect(cart.cartItems[0].quantity).toEqual(2)
    })
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem')

        cart.cartItems = []

        cart.addToCart(tempId, 1)
        console.log(cart.cartItems)
        expect(cart.cartItems.length).toEqual(1)
        expect(cart.cartItems[0].productId).toEqual(tempId)
        expect(cart.cartItems[0].quantity).toEqual(1)
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    })
    it('remove  product from cart', () => {
        spyOn(localStorage, 'setItem')

        cart.cartItems = [
            {
                productId: tempId,
                quantity: 1,
                deliveryOptionId: '1',
            },
        ]
        expect(cart.cartItems.length).toEqual(1)
        cart.removeFromCart(tempId)
        expect(cart.cartItems.length).toEqual(0)
    })
    it('update delivery option ', () => {
        spyOn(localStorage, 'setItem')
        cart.cartItems = [
            {
                productId: tempId,
                quantity: 1,
                deliveryOptionId: '1',
            },
        ]
        cart.updateDeliveryOption(tempId, '2')
        expect(cart.cartItems[0].deliveryOptionId).toEqual('2')
    })
})
