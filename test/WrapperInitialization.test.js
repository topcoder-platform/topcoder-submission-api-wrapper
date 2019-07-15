/*
 * Tests for wrapper initialization.
 */

const _ = require('lodash')
const should = require('chai').should()
const allConfig = require('./testConfig')
const api = require('../index')

// Pick auth config
const config = _.pick(allConfig, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
  'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL', 'AUTH0_PROXY_SERVER_URL' ])

describe('Wrapper Initialization Tests', () => {
  for (const key in config) {
    it(`Configuration ${key} is missing`, () => {
      const cfg = _.omit(_.cloneDeep(config), key)
      try {
        api(cfg)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, `"${key}" is required`)
      }
    })
  }

  for (const key of ['AUTH0_URL', 'AUTH0_AUDIENCE', 'SUBMISSION_API_URL']) {
    it(`Configuration ${key} is invalid, it should be valid uri`, () => {
      const cfg = _.cloneDeep(config)
      cfg[key] = 'invalid'
      try {
        api(cfg)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, `"${key}" must be a valid uri`)
      }
    })
  }

  for (const key of ['AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'AUTH0_PROXY_SERVER_URL']) {
    it(`Configuration ${key} is invalid, it should be valid uri`, () => {
      const cfg = _.cloneDeep(config)
      cfg[key] = true
      try {
        api(cfg)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, `"${key}" must be a string`)
      }
    })
  }

  it(`Configuration TOKEN_CACHE_TIME is invalid, it should be number`, () => {
    const cfg = _.cloneDeep(config)
    cfg['TOKEN_CACHE_TIME'] = 'invalid'
    try {
      api(cfg)
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.message, `"TOKEN_CACHE_TIME" must be a number`)
    }
  })

  it(`Configuration TOKEN_CACHE_TIME is invalid, it should be an integer`, () => {
    const cfg = _.cloneDeep(config)
    cfg['TOKEN_CACHE_TIME'] = 123.45
    try {
      api(cfg)
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.message, `"TOKEN_CACHE_TIME" must be an integer`)
    }
  })

  it(`Configuration TOKEN_CACHE_TIME is invalid, it should not less than 0`, () => {
    const cfg = _.cloneDeep(config)
    cfg['TOKEN_CACHE_TIME'] = -1
    try {
      api(cfg)
      throw new Error('should not throw error here')
    } catch (err) {
      should.equal(err.message, `"TOKEN_CACHE_TIME" must be larger than or equal to 0`)
    }
  })
})
