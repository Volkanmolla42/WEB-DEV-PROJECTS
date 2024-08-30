export class Car {
    #brand
    #model
    speed = 0
    isTrunkOpen = false
    constructor(CarDetails) {
        this.#brand = CarDetails.brand
        this.#model = CarDetails.model
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed'
        console.log(
            `Brand: ${this.#brand}, Model: ${this.#model} Speed: ${
                this.speed
            } Trunk: ${trunkStatus}`,
        )
    }
    go() {
        if (!this.isTrunkOpen) {
            this.speed += 5
        }
        if (this.speed > 200) {
            this.speed = 200
        }
    }
    brake() {
        this.speed -= 5
        if (this.speed < 0) {
            this.speed = 0
        }
    }

    toggleTrunk() {
        if (!this.isTrunkOpen && this.speed === 0) {
            this.isTrunkOpen = true
        } else {
            this.isTrunkOpen = false
        }
    }
}

class RaceCar extends Car {
    acceleration

    constructor(CarDetails) {
        super(CarDetails)
        this.acceleration = CarDetails.acceleration
    }

    go() {
        this.speed += this.acceleration

        if (this.speed > 300) {
            this.speed = 300
        }
    }
    toggleTrunk() {
        console.log('Race cars do not have a trunk.')
    }
}

const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
})
const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
})

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20,
})

car1.go()
car1.go()
car1.go()
car1.go()
car1.go()
car1.go()
car1.brake()
car1.brake()
car1.brake()
car1.brake()
car1.brake()
car1.toggleTrunk()
car1.displayInfo()
car2.displayInfo()
car2.go()
car2.go()
car2.go()
car2.go()
car2.go()
car2.brake()
car2.brake()
car2.brake()
car2.brake()
car2.brake()
car2.toggleTrunk()
car2.displayInfo()

raceCar.go()
raceCar.go()
raceCar.go()

raceCar.displayInfo()
raceCar.toggleTrunk()
raceCar.displayInfo()
raceCar.brake()
raceCar.displayInfo()
