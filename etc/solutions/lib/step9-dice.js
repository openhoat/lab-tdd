/**
 * Step 9
 */
const Promise = require('bluebird')
const helper = require('./helper')
const values = new WeakMap()
const headPromise = new WeakMap()

function alea() {
  return helper.alea(1, 6)
}

class Dice {

  constructor() {
    values.set(this, alea())
    headPromise.set(this, Promise.resolve())
  }

  roll() {
    const promise = headPromise.get(this)
      .delay(helper.alea(Dice.minDuration, Dice.maxDuration))
      .then(() => {
        const value = alea()
        values.set(this, value)
        //console.log('rolling done : ', value)
        return value
      })
    headPromise.set(this, promise)
    return promise
  }

  get value() {
    return values.get(this)
  }

  toString() {
    return `${this.constructor.name}[value=${this.value}]`
  }

}

Dice.minDuration = 10
Dice.maxDuration = 30

class FakeDice extends Dice {

  roll() {
    return super.roll()
      .return(6)
  }

  get value() {
    return 6
  }

}


const DiceFactory = opt => {
  opt = opt || {}
  return opt.fake ? new FakeDice() : new Dice()
}
DiceFactory.Dice = Dice
DiceFactory.FakeDice = FakeDice

module.exports = DiceFactory
