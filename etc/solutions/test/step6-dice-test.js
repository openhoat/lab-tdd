/**
 * Step 6 : un peu de sécurité et de qualité
 * - la valeur du dé ne doit pas pouvoir être modifiée
 * - le dé ne doit exposer rien d'autre que l'utile
 * - le dé doit offrir une représentation string
 */
const chai = require('chai')
const expect = chai.expect
const helper = require('./test-helper')

describe('dice factory', () => {

  const DiceFactory = require('../lib/dice')
  const notUniqueIterations = 100

  it('should be a factory function', () => {
    expect(DiceFactory).to.be.a('function')
  })

  describe('dice', () => {

    let dice

    beforeEach(() => {
      dice = DiceFactory()
    })

    it('should be ok', () => {
      expect(dice).to.be.ok
      expect(dice).to.be.an('object')
    })

    it('should provide a roll method', () => {
      expect(dice).to.respondTo('roll')
      expect(dice.roll()).to.be.a('number')
    })

    it('should roll and have a random number value between 1 and 6', () => {
      const value = dice.roll()
      expect(value).to.be.a('number')
      expect(value).to.be.gte(1)
      expect(value).to.be.lte(6)
      const values = helper.iterate(notUniqueIterations, () => dice.roll())
      const notUnique = helper.checkNotUniqueValues(values)
      expect(notUnique).to.equal(true, 'dice values are not random ')
    })

    it('should roll two dices', () => {
      const otherDice = DiceFactory()
      expect(otherDice === dice).to.be.false
      const values = helper.iterate(notUniqueIterations, () => dice.roll())
      const otherValues = helper.iterate(notUniqueIterations, () => otherDice.roll())
      expect(otherValues).to.not.eql(values)
    })

    it('should provide a value getter that returns its value', () => {
      expect(dice).to.have.property('value')
      const value = dice.value
      expect(value).to.be.a('number')
      expect(value).to.be.gte(1)
      expect(value).to.be.lte(6)
      const lastValue = dice.roll()
      expect(dice.value).to.equal(lastValue)
      const keys = Object.keys(dice)
      expect(keys).to.be.empty
      expect(() => {
        dice.value(3)
      }).to.throw(TypeError)
    })

    it('should provide a string representation', () => {
      expect(dice + '').to.equal(`Dice[value=${dice.value}]`)
    })

  })

})
