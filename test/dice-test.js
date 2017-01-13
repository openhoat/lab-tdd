/**
 * Step 9 : au fait... un dé est forcément asynchrone !
 */
const Promise = require('bluebird')
const chai = require('chai')
const expect = chai.expect
const helper = require('./test-helper')

describe('dice factory', function() {

  this.timeout(30000)

  const DiceFactory = require('../lib/dice')
  const notUniqueIterations = 10

  after(() => {
    console.log('done.')
  })

  it('should be a factory function', () => {
    expect(DiceFactory).to.be.a('function')
  })

  describe('async dice', () => {

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
      return dice.roll()
        .then(value => {
          expect(value).to.be.a('number')
        })
    })

    it('should roll and have a random number value between 1 and 6', () => dice.roll()
      .then(value => {
        expect(value).to.be.a('number')
        expect(value).to.be.gte(1)
        expect(value).to.be.lte(6)
        const start = new Date().getTime()
        return Promise.all(helper.iterate(notUniqueIterations, () => dice.roll()))
          .then(values => {
            const notUnique = helper.checkNotUniqueValues(values)
            expect(notUnique).to.equal(true, 'dice values are not random ')
            const end = new Date().getTime()
            const duration = end - start
            expect(duration).to.be.gte(DiceFactory.Dice.minDuration * notUniqueIterations)
            expect(duration).to.be.lte(DiceFactory.Dice.maxDuration * (notUniqueIterations + 1))
          })
      })
    )

    it('should roll two dices', () => {
      const otherDice = DiceFactory()
      expect(otherDice === dice).to.be.false
      return Promise.all(helper.iterate(notUniqueIterations, () => dice.roll()))
        .then(values => Promise
          .all(helper.iterate(notUniqueIterations, () => otherDice.roll()))
          .then(otherValues => {
            expect(otherValues).to.not.eql(values)
          })
        )
    })

    it('should provide a value getter that returns its value', () => {
      expect(dice).to.have.property('value')
      const value = dice.value
      expect(value).to.be.a('number')
      expect(value).to.be.gte(1)
      expect(value).to.be.lte(6)
      return dice.roll()
        .then(lastValue => {
          expect(dice.value).to.equal(lastValue)
          const keys = Object.keys(dice)
          expect(keys).to.be.empty
          expect(() => {
            dice.value(3)
          }).to.throw(TypeError)
        })
    })

    it('should provide a string representation', () => {
      expect(dice + '').to.equal(`Dice[value=${dice.value}]`)
    })

  })

  describe('async fake dice', () => {

    it('should be an instance of Dice', () => {
      const fakeDice = DiceFactory({fake: true})
      expect(fakeDice).to.be.ok
      expect(fakeDice).to.be.an('object')
      expect(fakeDice).to.be.instanceof(DiceFactory.Dice)
    })

    it('should roll and alsways return 6', () => {
      const fakeDice = DiceFactory({fake: true})
      expect(fakeDice.value).to.equal(6)
      return Promise.all(helper.iterate(notUniqueIterations, () => fakeDice.roll()))
        .each(value => {
          expect(value).to.equal(6)
        })
    })

  })

})
