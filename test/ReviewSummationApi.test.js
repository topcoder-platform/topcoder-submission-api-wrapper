/*
 * Tests for Review Summation APIs
 */

const _ = require('lodash')
const should = require('chai').should()
const config = require('./testConfig')
const api = require('../index')

const client = api(config)
const failClient = api(_.assign(_.cloneDeep(config), { 'AUTH0_CLIENT_ID': 'invalid' }))
const notFoundId = 'ace32387-8b33-47f1-8b01-6578b817a188'

let createdSummationId

let summationId
let submissionId
let aggregateScore
let scoreCardId
let isPassing
let metadata
let submissionId2
let aggregateScore2
let scoreCardId2
let isPassing2

describe('Review Summation API Tests', () => {
  describe('Test search review summations', () => {
    it(`search review summations no criteria success`, async () => {
      const res = await client.searchReviewSummations({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (const item of res.body) {
        should.exist(item.id)
        should.exist(item.submissionId)
        should.exist(item.aggregateScore)
        should.exist(item.scoreCardId)
        should.exist(item.isPassing)
        should.exist(item.created)
        should.exist(item.updated)
        should.exist(item.createdBy)
        should.exist(item.updatedBy)
      }

      // set test data from searched reviews
      summationId = res.body[0].id
      submissionId = res.body[0].submissionId
      aggregateScore = res.body[0].aggregateScore
      scoreCardId = res.body[0].scoreCardId
      isPassing = res.body[0].isPassing
      metadata = res.body[0].metadata || {}

      for (const item of res.body) {
        if (!submissionId2 || submissionId2 === submissionId) {
          submissionId2 = item.submissionId
        }
        if (!aggregateScore2 || aggregateScore2 === aggregateScore) {
          aggregateScore2 = item.aggregateScore
        }
        if (!scoreCardId2 || scoreCardId2 === scoreCardId) {
          scoreCardId2 = item.scoreCardId
        }
        if (!isPassing2 || isPassing2 === isPassing) {
          isPassing2 = item.isPassing
        }
      }
    })

    it('search review summations by criteria success', async () => {
      const res = await client.searchReviewSummations({
        page: 1,
        perPage: 3,
        submissionId,
        aggregateScore,
        scoreCardId,
        isPassing
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      should.equal(true, res.body.length > 0)
      for (const item of res.body) {
        should.exist(item.id)
        should.equal(item.submissionId, submissionId)
        should.equal(item.aggregateScore, aggregateScore)
        should.equal(item.scoreCardId, scoreCardId)
        should.equal(item.isPassing, isPassing)
      }
    })

    it('failure - search review summations with invalid page', async () => {
      try {
        await client.searchReviewSummations({
          page: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"page" must be larger than or equal to 1')
      }
    })

    it(`failure - search review summations with invalid perPage`, async () => {
      try {
        await client.searchReviewSummations({
          perPage: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"perPage" must be larger than or equal to 1')
      }
    })

    it(`failure - search review summations with invalid submissionId`, async () => {
      try {
        await client.searchReviewSummations({
          submissionId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - search review summations with invalid aggregateScore`, async () => {
      try {
        await client.searchReviewSummations({
          aggregateScore: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" must be a number')
      }
    })

    it(`failure - search review summations with invalid scoreCardId`, async () => {
      try {
        await client.searchReviewSummations({
          scoreCardId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" must be a number')
      }
    })

    it(`failure - search review summations with invalid isPassing`, async () => {
      try {
        await client.searchReviewSummations({
          isPassing: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" must be a boolean')
      }
    })

    it(`failure - search review summations with invalid m2m credential`, async () => {
      try {
        await failClient.searchReviewSummations({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test head review summations', () => {
    it(`head review summations no criteria success`, async () => {
      const res = await client.headReviewSummations({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`head review summations by criteria success`, async () => {
      const res = await client.headReviewSummations({
        page: 1,
        perPage: 3,
        submissionId,
        aggregateScore,
        scoreCardId,
        isPassing
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`failure - head review summations with invalid page`, async () => {
      try {
        await client.headReviewSummations({
          page: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid perPage`, async () => {
      try {
        await client.headReviewSummations({
          perPage: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid submissionId`, async () => {
      try {
        await client.headReviewSummations({
          submissionId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid aggregateScore`, async () => {
      try {
        await client.headReviewSummations({
          aggregateScore: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid scoreCardId`, async () => {
      try {
        await client.headReviewSummations({
          scoreCardId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid isPassing`, async () => {
      try {
        await client.headReviewSummations({
          isPassing: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head review summations with invalid m2m credential`, async () => {
      try {
        await failClient.headReviewSummations({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test create review summation', () => {
    it(`Create review summation success`, async () => {
      const res = await client.createReviewSummation({
        submissionId,
        aggregateScore,
        scoreCardId,
        isPassing,
        metadata: {
          abc: 'def'
        }
      })
      createdSummationId = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.submissionId, submissionId)
      should.equal(res.body.aggregateScore, aggregateScore)
      should.equal(res.body.scoreCardId, scoreCardId)
      should.equal(res.body.isPassing, isPassing)
      should.equal(true, _.isEqual(res.body.metadata, {
        abc: 'def'
      }))
    })

    it(`failure - Create review summation with invalid m2m credential`, async () => {
      try {
        await failClient.createReviewSummation({
          submissionId,
          aggregateScore,
          scoreCardId,
          isPassing,
          metadata: {
            abc: 'def'
          }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Create review summation with invalid request body, invalid submissionId`, async () => {
      try {
        await client.createReviewSummation({
          submissionId: 'abc',
          aggregateScore,
          scoreCardId,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - Create review summation with invalid request body, empty submissionId`, async () => {
      try {
        await client.createReviewSummation({
          submissionId: '',
          aggregateScore,
          scoreCardId,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" is not allowed to be empty')
      }
    })

    it(`failure - Create review summation with invalid request body, missing submissionId`, async () => {
      try {
        await client.createReviewSummation({
          aggregateScore,
          scoreCardId,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" is required')
      }
    })

    it(`failure - Create review summation with invalid request body, invalid aggregateScore`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore: 'abc',
          scoreCardId,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" must be a number')
      }
    })

    it(`failure - Create review summation with invalid request body, missing aggregateScore`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          scoreCardId,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" is required')
      }
    })

    it(`failure - Create review summation with invalid request body, invalid scoreCardId`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore,
          scoreCardId: 'abc',
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" must be a number')
      }
    })

    it(`failure - Create review summation with invalid request body, missing scoreCardId`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore,
          isPassing
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" is required')
      }
    })

    it(`failure - Create review summation with invalid request body, invalid isPassing`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore,
          scoreCardId,
          isPassing: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" must be a boolean')
      }
    })

    it(`failure - Create review summation with invalid request body, missing isPassing`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore,
          scoreCardId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" is required')
      }
    })

    it(`failure - Create review summation with invalid request body, invalid metadata`, async () => {
      try {
        await client.createReviewSummation({
          submissionId,
          aggregateScore,
          scoreCardId,
          isPassing,
          metadata: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"metadata" must be an object')
      }
    })
  })

  describe('Test get review summation by id', () => {
    it('Get review summation by id success', async () => {
      const res = await client.getReviewSummation(summationId)
      should.equal(res.status, 200)
      should.equal(res.body.id, summationId)
      should.equal(res.body.submissionId, submissionId)
      should.equal(res.body.aggregateScore, aggregateScore)
      should.equal(res.body.scoreCardId, scoreCardId)
      should.equal(res.body.isPassing, isPassing)
      should.equal(true, _.isEqual(res.body.metadata || {}, metadata))
    })

    it(`failure - Get review summation with invalid m2m credential`, async () => {
      try {
        await failClient.getReviewSummation(summationId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Get review summation by id not found`, async () => {
      try {
        await client.getReviewSummation(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review summation with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Get review summation by invalid id`, async () => {
      try {
        await client.getReviewSummation('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"reviewSummationId" must be a valid GUID')
      }
    })
  })

  describe('Test head review summation by id', () => {
    it(`Head review summation by id success`, async () => {
      const res = await client.headReviewSummation(summationId)
      should.equal(res.status, 200)
    })

    it(`failure - Head review summation with invalid m2m credential`, async () => {
      try {
        await failClient.headReviewSummation(summationId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Head review summation by id not found`, async () => {
      try {
        await client.headReviewSummation(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
      }
    })

    it(`failure - Head review summation by invalid id`, async () => {
      try {
        await client.headReviewSummation('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })
  })

  describe('Test put review summation by id', () => {
    it(`Put review summation by id success`, async () => {
      const res = await client.updateReviewSummation(createdSummationId, {
        submissionId: submissionId2,
        aggregateScore: aggregateScore2,
        scoreCardId: scoreCardId2,
        isPassing: isPassing2,
        metadata: { aa: 12 }
      })
      should.equal(res.status, 200)
      should.equal(res.body.submissionId, submissionId2)
      should.equal(res.body.aggregateScore, aggregateScore2)
      should.equal(res.body.scoreCardId, scoreCardId2)
      should.equal(res.body.isPassing, isPassing2)
      should.equal(true, _.isEqual(res.body.metadata, { aa: 12 }))
    })

    it(`failure - Put review summation with invalid m2m credential`, async () => {
      try {
        await failClient.updateReviewSummation(createdSummationId, {
          ubmissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Put review summation by invalid id`, async () => {
      try {
        await client.updateReviewSummation('abc', {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"reviewSummationId" must be a valid GUID')
      }
    })

    it(`failure - Put review summation by id not found`, async () => {
      try {
        await client.updateReviewSummation(notFoundId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review summation with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Put review summation by id with invalid submissionId`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: 'abc',
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - Put review summation by id with missing submissionId`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" is required')
      }
    })

    it(`failure - Put review summation by id with empty submissionId`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: '',
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" is not allowed to be empty')
      }
    })

    it(`failure - Put review summation by id with invalid aggregateScore`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: 'abc',
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" must be a number')
      }
    })

    it(`failure - Put review summation by id with missing aggregateScore`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" is required')
      }
    })

    it(`failure - Put review summation by id with invalid scoreCardId`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: 'abc',
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" must be a number')
      }
    })

    it(`failure - Put review summation by id with missing scoreCardId`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          isPassing: isPassing2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" is required')
      }
    })

    it(`failure - Put review summation by id with invalid isPassing`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: 'abc',
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" must be a boolean')
      }
    })

    it(`failure - Put review summation by id with missing isPassing`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          metadata: { aa: 12 }
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" is required')
      }
    })

    it(`failure - Put review summation by id with invalid metadata`, async () => {
      try {
        await client.updateReviewSummation(createdSummationId, {
          submissionId: submissionId2,
          aggregateScore: aggregateScore2,
          scoreCardId: scoreCardId2,
          isPassing: isPassing2,
          metadata: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"metadata" must be an object')
      }
    })
  })

  describe('Test patch review summation by id', () => {
    it(`Patch review summation by id success 1`, async () => {
      const res = await client.patchReviewSummation(createdSummationId, {
        submissionId,
        aggregateScore,
        metadata: { a: 1, b: 'c' }
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSummationId)
      should.equal(res.body.submissionId, submissionId)
      should.equal(res.body.aggregateScore, aggregateScore)
      should.equal(res.body.scoreCardId, scoreCardId2)
      should.equal(res.body.isPassing, isPassing2)
      should.equal(true, _.isEqual(res.body.metadata, { a: 1, b: 'c' }))
    })

    it(`Patch review summation by id success 2`, async () => {
      const res = await client.patchReviewSummation(createdSummationId, {
        submissionId: submissionId2,
        aggregateScore: aggregateScore2,
        scoreCardId,
        isPassing,
        metadata: { abc: 123 }
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSummationId)
      should.equal(res.body.submissionId, submissionId2)
      should.equal(res.body.aggregateScore, aggregateScore2)
      should.equal(res.body.scoreCardId, scoreCardId)
      should.equal(res.body.isPassing, isPassing)
      should.equal(true, _.isEqual(res.body.metadata, { abc: 123 }))
    })

    it(`failure - Patch review summation with invalid m2m credential`, async () => {
      try {
        await failClient.patchReviewSummation(createdSummationId, {
          aggregateScore: 90.5
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Patch review summation by invalid id`, async () => {
      try {
        await client.patchReviewSummation('abc', {
          aggregateScore: 90.5
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"reviewSummationId" must be a valid GUID')
      }
    })

    it(`failure - Patch review summation by id not found`, async () => {
      try {
        await client.patchReviewSummation(notFoundId, {
          aggregateScore: 90.5
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review summation with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Patch review summation by id with invalid submissionId`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          submissionId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - Patch review summation by id with empty submissionId`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          submissionId: ''
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" is not allowed to be empty')
      }
    })

    it(`failure - Patch review summation by id with invalid aggregateScore`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          aggregateScore: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"aggregateScore" must be a number')
      }
    })

    it(`failure - Patch review summation by id with invalid scoreCardId`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          scoreCardId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"scoreCardId" must be a number')
      }
    })

    it(`failure - Patch review summation by id with invalid isPassing`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          isPassing: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"isPassing" must be a boolean')
      }
    })

    it(`failure - Patch review summation by id with invalid metadata`, async () => {
      try {
        await client.patchReviewSummation(createdSummationId, {
          metadata: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"metadata" must be an object')
      }
    })
  })

  describe('Test delete review summation by id', () => {
    it(`Delete review summation by id success`, async () => {
      const res = await client.deleteReviewSummation(createdSummationId)
      should.equal(res.status, 204)
    })

    it(`failure - Delete review summation with invalid m2m credential`, async () => {
      try {
        await failClient.deleteReviewSummation(summationId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Delete review summation by id not found`, async () => {
      try {
        await client.deleteReviewSummation(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Review summation with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Delete review summation by invalid id`, async () => {
      try {
        await client.deleteReviewSummation('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"reviewSummationId" must be a valid GUID')
      }
    })
  })
})
