const _ = require('lodash')

const testHelper = {
  checkNotUniqueValues: values => _.uniq(values).length !== 1,
  iterate: (n, iterator) => Array(n).fill().map((v, i) => iterator(i))
}

module.exports = testHelper
