/**
 * Step 4
 */
const helper = require('./helper')

class Dice {
  roll() {
    return helper.alea(1, 6)
  }
}

const DiceFactory = () => new Dice()

module.exports = DiceFactory
