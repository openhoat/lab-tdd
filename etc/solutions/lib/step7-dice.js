/**
 * Step 7
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

class FakeDice extends Dice {
  roll() {
    return 6
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

module.exports = DiceFactory
