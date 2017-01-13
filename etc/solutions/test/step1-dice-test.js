/**
 * Step 1 : avoir un composant Dé
 */
const chai = require('chai')
const expect = chai.expect

describe('dice', () => {

  const dice = require('../lib/dice')

  it('should be ok', () => {
    expect(dice).to.be.ok
    expect(dice).to.be.an('object')
  })

})
