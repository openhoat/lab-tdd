/**
 * Step 5
 */
const helper = require('./helper')

class Dice {
  constructor() {
    this.roll()
  }

  roll() {
    return this._value = helper.alea(1, 6)
  }

  value() {
    return this._value
  }
}

const DiceFactory = () => new Dice()

module.exports = DiceFactory
