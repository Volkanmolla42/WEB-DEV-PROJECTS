import { addToCart, cart, loadFromStorage } from '../../data/cart.js'
describe('test suite: addToCArt', () => {
  const tempId = 'domates'

  it('adds an existing product to cart', () => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: tempId, quantity: 1, deliveryOptionId: 1 },
      ])
    })
    loadFromStorage()
    addToCart(tempId, 1)
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual(tempId)
    expect(cart[0].quantity).toEqual(2)
  })
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })
    loadFromStorage()
    addToCart(tempId, 1)
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart[0].productId).toEqual(tempId)
    expect(cart[0].quantity).toEqual(1)
  })
})
