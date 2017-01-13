/**
 * Step 6
 */
const helper = require('./helper')
const values = new WeakMap()

class Dice {
  constructor() {
    this.roll()
  }

  roll() {
    const value = helper.alea(1, 6)
    values.set(this, value)
    return value
  }

  get value() {
    return values.get(this)
  }

  toString() {
    return `${this.constructor.name}[value=${this.value}]`
  }
}

const DiceFactory = () => new Dice()

module.exports = DiceFactory
