/**
 * Step 2 : le dé doit rouler
 */
const chai = require('chai')
const expect = chai.expect

describe('dice', () => {

  const dice = require('../lib/dice')

  it('should be ok', () => {
    expect(dice).to.be.ok
    expect(dice).to.be.an('object')
  })

  it('should provide a roll method', () => {
    expect(dice).to.respondTo('roll')
    expect(dice.roll()).to.be.a('number')
  })

})
