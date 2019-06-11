/*
 * Tests for Review Type API
 */

const _ = require('lodash')
const should = require('chai').should()
const config = require('./testConfig')
const api = require('../index')

const client = api(config)
const failClient = api(_.assign(_.cloneDeep(config), { 'AUTH0_CLIENT_ID': 'invalid' }))
let reviewTypeId
const notFoundId = 'e0a789ea-6144-4266-bfae-872f9a26e749'

describe('Review Type API Tests', () => {
  describe('Test search review types', () => {
    it(`search review types by criteria success`, async () => {
      const res = await client.searchReviewTypes({ page: 1, perPage: 3, name: 'Iterative Review', isActive: true })
      should.equal(res.status, 200)
      should.exist(res.header['x-page'])
      should.exist(res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (let i = 0; i < 3; i++) {
        should.equal('Iterative Review', res.body[i].name)
        should.exist(res.body[i].id)
        should.equal(true, res.body[i].isActive)
      }
    })

    it(`search review types no criteria success`, async () => {
      const res = await client.searchReviewTypes({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (let i = 0; i < 20; i++) {
        should.exist(res.body[i].name)
        should.exist(res.body[i].id)
        should.exist(res.body[i].isActive)
      }
    })

    it(`failure - search review types with invalid criteria`, async () => {
      try {
        await client.searchReviewTypes({ isActive: 'invalid' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isActive" must be a boolean')
      }
    })

    it(`failure - search review types with invalid m2m credential`, async () => {
      try {
        await failClient.searchReviewTypes({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test head review types', () => {
    it(`Head review types by criteria success`, async () => {
      const res = await client.headReviewTypes({ page: 1, perPage: 3, name: 'Iterative Review', isActive: true })
      should.equal(res.status, 200)
      should.exist(res.header['x-page'])
      should.exist(res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`Head review types no criteria success`, async () => {
      const res = await client.headReviewTypes({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`failure - head review types with invalid criteria`, async () => {
      try {
        await client.headReviewTypes({ isActive: 'invalid' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review types with invalid m2m credential`, async () => {
      try {
        await failClient.headReviewTypes({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test create review type', () => {
    it(`Create review type success`, async () => {
      const res = await client.createReviewType({ name: 'test-for-create', isActive: true })
      reviewTypeId = res.body.id
      should.equal(res.body.name, 'test-for-create')
      should.equal(res.body.isActive, true)
    })

    it(`failure - Create review with invalid m2m credential`, async () => {
      try {
        await failClient.createReviewType({ name: 'test-for-create', isActive: true })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Create review type with invalid request body, name is wrong`, async () => {
      try {
        await client.createReviewType({ name: 123, isActive: true })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"name" must be a string`)
      }
    })

    it(`failure - Create review type with invalid request body, name is missing`, async () => {
      try {
        await client.createReviewType({ isActive: true })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"name" is required`)
      }
    })

    it(`failure - Create review type with invalid request body, isActive is wrong`, async () => {
      try {
        await client.createReviewType({ name: 'test-for-create', isActive: 123 })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"isActive" must be a boolean`)
      }
    })

    it(`failure - Create review type with invalid request body, isActive is missing`, async () => {
      try {
        await client.createReviewType({ name: 'test-for-create' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"isActive" is required`)
      }
    })
  })

  describe('Test get review type by id', () => {
    it(`Get review type by id success`, async () => {
      const res = await client.getReviewType(reviewTypeId)
      should.exist(res.body.id)
      should.equal(res.body.name, 'test-for-create')
      should.equal(res.body.isActive, true)
    })

    it(`failure - Get review type with invalid m2m credential`, async () => {
      try {
        await failClient.getReviewType(reviewTypeId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Get review type by id not found`, async () => {
      try {
        await client.getReviewType(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review type with ID = ${notFoundId} is not found`)
      }
    })
  })

  describe('Test head review type by id', () => {
    it(`Head review type by id success`, async () => {
      const res = await client.headReviewType(reviewTypeId)
      should.equal(res.status, 200)
    })

    it(`failure - Head review type with invalid m2m credential`, async () => {
      try {
        await failClient.headReviewType(reviewTypeId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Head review type by id not found`, async () => {
      try {
        await client.headReviewType(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
      }
    })
  })

  describe('Test put review type by id', () => {
    it(`Put review type by id success`, async () => {
      const res = await client.updateReviewType(reviewTypeId, { name: 'test-for-put', isActive: false })
      should.equal(res.status, 200)
      should.exist(res.body.id)
      should.equal(res.body.name, 'test-for-put')
      should.equal(res.body.isActive, false)
    })

    it(`failure - Put review type with invalid m2m credential`, async () => {
      try {
        await failClient.updateReviewType(reviewTypeId, { name: 'test-for-put', isActive: false })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Put review type by id with invalid request body`, async () => {
      try {
        await client.updateReviewType(reviewTypeId, { name: 123, isActive: true })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"name" must be a string`)
      }
    })

    it(`failure - Put review type by id not found`, async () => {
      try {
        await client.updateReviewType(notFoundId, { name: 'test-for-put', isActive: false })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review type with ID = ${notFoundId} is not found`)
      }
    })
  })

  describe('Test patch review type by id', () => {
    it(`Patch review type by id success`, async () => {
      const res = await client.patchReviewType(reviewTypeId, { name: 'test-for-patch' })
      should.equal(res.status, 200)
      should.exist(res.body.id)
      should.equal(res.body.name, 'test-for-patch')
      should.equal(res.body.isActive, false)
    })

    it(`failure - Patch review type with invalid m2m credential`, async () => {
      try {
        await failClient.patchReviewType(reviewTypeId, { name: 'test-for-patch' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Patch review type by id with invalid request body`, async () => {
      try {
        await client.patchReviewType(reviewTypeId, { name: 123 })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"name" must be a string`)
      }
    })

    it(`failure - Patch review type by id not found`, async () => {
      try {
        await client.patchReviewType(notFoundId, { name: 'test-for-patch' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review type with ID = ${notFoundId} is not found`)
      }
    })
  })

  describe('Test delete review type by id', () => {
    it(`Delete review type by id success`, async () => {
      const res = await client.deleteReviewType(reviewTypeId)
      should.equal(res.status, 204)
    })

    it(`failure - Delete review type with invalid m2m credential`, async () => {
      try {
        await failClient.deleteReviewType(reviewTypeId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Delete review type by id not found`, async () => {
      try {
        await client.deleteReviewType(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review type with ID = ${notFoundId} is not found`)
      }
    })
  })
})
