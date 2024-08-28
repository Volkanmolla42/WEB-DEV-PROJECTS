import {
    addToCart,
    cart,
    loadFromStorage,
    removeFromCart,
} from '../../data/cart.js'
describe('test suite: addToCArt', () => {
    const tempId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'

    beforeEach(() => {
        spyOn(localStorage, 'setItem')
    })
    it('adds an existing product to cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                { productId: tempId, quantity: 1, deliveryOptionId: '1' },
            ])
        })
        loadFromStorage()

        addToCart(tempId, 1)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1',
                },
            ]),
        )

        expect(cart[0].productId).toEqual(tempId)
        expect(cart[0].quantity).toEqual(2)
    })
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([])
        })
        loadFromStorage()
        addToCart(tempId, 1)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',
            JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1',
                },
            ]),
        )
        expect(cart[0].productId).toEqual(tempId)
        expect(cart[0].quantity).toEqual(1)
    })
})
