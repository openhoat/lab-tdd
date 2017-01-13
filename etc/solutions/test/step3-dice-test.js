/**
 * Step 3 : le dé doit retourner une valeur aléatoire comprise entre 1 et 6
 */
const chai = require('chai')
const expect = chai.expect
const helper = require('./test-helper')

describe('dice', () => {

  const dice = require('../lib/dice')
  const notUniqueIterations = 100

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

})
