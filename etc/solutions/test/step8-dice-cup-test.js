/**
 * Step 8 : le gobelet fait son apparition
 * - on doit pouvoir lui associer plusieurs dés
 * - et jouer avec
 */
const chai = require('chai')
const expect = chai.expect
const helper = require('./test-helper')

describe('dice cup factory ', () => {

  const DiceFactory = require('../lib/dice')
  const DiceCupFactory = require('../lib/dice-cup')
  const notUniqueIterations = 100

  it('should be a factory function', () => {
    expect(DiceCupFactory).to.be.a('function')
  })

  it('should provide a constructor that accepts several dices', () => {
    const dices = [DiceFactory(), DiceFactory()]
    const diceCup = DiceCupFactory(dices)
    expect(diceCup).to.have.property('dices').that.is.an('array').of.length(dices.length)
    expect(diceCup.dices).to.include(dices[0])
    expect(diceCup.dices).to.include(dices[1])
  })

  it('should provide a throw method', () => {
    const diceCup = DiceCupFactory(DiceFactory(), DiceFactory())
    expect(diceCup).to.respondTo('throw')
    const value = diceCup.throw()
    expect(value).to.be.a('number')
    expect(value).to.be.gte(2)
    expect(value).to.be.lte(12)
    const values = helper.iterate(notUniqueIterations, () => diceCup.throw())
    const notUnique = helper.checkNotUniqueValues(values)
    expect(notUnique).to.equal(true, 'cup values are not random ')
  })

  it('should throw with a fake dice', () => {
    const diceCup = DiceCupFactory(DiceFactory(), DiceFactory({fake: true}))
    expect(diceCup).to.respondTo('throw')
    const value = diceCup.throw()
    expect(value).to.be.a('number')
    expect(value).to.be.gte(7)
    expect(value).to.be.lte(12)
    const values = helper.iterate(notUniqueIterations, () => diceCup.throw())
    const notUnique = helper.checkNotUniqueValues(values)
    expect(notUnique).to.equal(true, 'cup values are not random ')
  })

})
