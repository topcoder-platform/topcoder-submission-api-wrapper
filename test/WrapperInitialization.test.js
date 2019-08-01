/*
 * Tests for wrapper initialization.
 */

const _ = require('lodash')
const should = require('chai').should()
const m2mConfig = require('./testConfig')
const userConfig = require('./userTestConfig')
const api = require('../index')

// Pick auth config
const m2mDesc = {
  name: 'M2M',
  schemaType: '[M2M Configuration]',
  config: _.pick(m2mConfig, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
    'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL', 'AUTH0_PROXY_SERVER_URL' ]),
  uriFields: ['AUTH0_URL', 'AUTH0_AUDIENCE', 'SUBMISSION_API_URL'],
  stringFields: ['AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'AUTH0_PROXY_SERVER_URL'],
  intervalFields: ['TOKEN_CACHE_TIME']
}

const userDesc = {
  name: 'User Credentials',
  schemaType: '[User Credentials Configuration]',
  config: _.pick(userConfig, [
    'USERNAME',
    'PASSWORD',
    'TC_AUTHN_URL',
    'TC_AUTHZ_URL',
    'TC_CLIENT_ID',
    'TC_CLIENT_V2CONNECTION',
    'SUBMISSION_API_URL'
  ]),
  uriFields: [
    'TC_AUTHN_URL',
    'TC_AUTHZ_URL'
  ],
  stringFields: [
    'USERNAME',
    'PASSWORD',
    'TC_AUTHN_URL',
    'TC_AUTHZ_URL',
    'TC_CLIENT_ID',
    'TC_CLIENT_V2CONNECTION'
  ],
  intervalFields: []
}

const jwtDesc = {
  name: 'JWT Method Argument',
  schemaType: '[JWT Method Argument]',
  config: _.pick(userConfig, 'SUBMISSION_API_URL'),
  uriFields: ['SUBMISSION_API_URL'],
  stringFields: ['SUBMISSION_API_URL'],
  intervalFields: []
}

for (const c of [m2mDesc, userDesc, jwtDesc]) {
  const { name, schemaType, config, uriFields, stringFields, intervalFields } = c
  describe(`Wrapper Initialization Tests (${name})`, () => {
    for (const key in config) {
      it(`Configuration ${key} is missing`, () => {
        const cfg = _.omit(_.cloneDeep(config), key)
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, `should not throw error here`)
        }
      })
    }

    for (const key of uriFields) {
      it(`Configuration ${key} is invalid, it should be valid uri`, () => {
        const cfg = _.cloneDeep(config)
        cfg[key] = 'invalid'
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.message, `${schemaType} "${key}" must be a valid uri`)
        }
      })
    }

    for (const key of stringFields) {
      it(`Configuration ${key} is invalid, it should be valid string`, () => {
        const cfg = _.cloneDeep(config)
        cfg[key] = true
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.message, `${schemaType} "${key}" must be a string`)
        }
      })
    }

    for (const key of intervalFields) {
      it(`Configuration ${key} is invalid, it should be number`, () => {
        const cfg = _.cloneDeep(config)
        cfg[key] = 'invalid'
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.message, `${schemaType} "${key}" must be a number`)
        }
      })

      it(`Configuration ${key} is invalid, it should be an integer`, () => {
        const cfg = _.cloneDeep(config)
        cfg[key] = 123.45
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.message, `${schemaType} "${key}" must be an integer`)
        }
      })

      it(`Configuration ${key} is invalid, it should not less than 0`, () => {
        const cfg = _.cloneDeep(config)
        cfg[key] = -1
        try {
          api(cfg)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.message, `${schemaType} "${key}" must be larger than or equal to 0`)
        }
      })
    }
  })
}
