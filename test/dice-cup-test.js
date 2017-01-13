/**
 * Step 9 : au fait... un gobelet composé de dés asynchrones est forcément asynchrone !
 */
const Promise = require('bluebird')
const chai = require('chai')
const expect = chai.expect
const helper = require('./test-helper')

describe('dice cup factory ', function() {

  this.timeout(30000)

  const DiceFactory = require('../lib/dice')
  const DiceCupFactory = require('../lib/dice-cup')
  const notUniqueIterations = 10

  after(() => {
    console.log('done.')
  })

  it('should be a factory function', () => {
    expect(DiceCupFactory).to.be.a('function')
  })

  describe('async dice cup', () => {

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
      return diceCup.throw()
        .then(value => {
          expect(value).to.be.a('number')
          expect(value).to.be.gte(2)
          expect(value).to.be.lte(12)
          return Promise.all(helper.iterate(notUniqueIterations, () => diceCup.throw()))
            .then(values => {
              const notUnique = helper.checkNotUniqueValues(values)
              expect(notUnique).to.equal(true, 'cup values are not random ')
            })
        })
    })

    it('should throw with a fake dice', () => {
      const diceCup = DiceCupFactory(DiceFactory(), DiceFactory({fake: true}))
      expect(diceCup).to.respondTo('throw')
      return diceCup.throw()
        .then(value => {
          expect(value).to.be.a('number')
          expect(value).to.be.gte(7)
          expect(value).to.be.lte(12)
          return Promise.all(helper.iterate(notUniqueIterations, () => diceCup.throw()))
            .then(values => {
              const notUnique = helper.checkNotUniqueValues(values)
              expect(notUnique).to.equal(true, 'cup values are not random ')
            })
        })
    })

  })

})
