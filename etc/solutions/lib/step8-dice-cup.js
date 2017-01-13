/**
 * Step 8
 */
const _ = require('lodash')

class DiceCup {
  constructor(...dices) {
    this.dices = _.flatten(dices)
  }

  throw() {
    return this.dices.reduce((acc, dice) => acc + dice.roll(), 0)
  }
}

const DiceCupFactory = (...args) => new DiceCup(...args)
DiceCupFactory.DiceCup = DiceCup

module.exports = DiceCupFactory
