/**
 * Step 9
 */
const Promise = require('bluebird')
const _ = require('lodash')

class DiceCup {
  constructor(...dices) {
    this.dices = _.flatten(dices)
  }

  throw() {
    return Promise.all(this.dices.map(dice => dice.roll()))
      .then(values => values.reduce((acc, value) => acc + value, 0))
  }
}

const DiceCupFactory = (...args) => new DiceCup(...args)
DiceCupFactory.DiceCup = DiceCup

module.exports = DiceCupFactory
