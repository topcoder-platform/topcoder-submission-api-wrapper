/*
 * Tests for Review APIs
 */

const _ = require('lodash')
const should = require('chai').should()
const config = require('./testConfig')
const userConfig = require('./userTestConfig')
const api = require('../index')
const { makeJwtClient } = require('./common/testHelper.js')

const m2mClient = api(config)
const m2mFailClient = api(_.assign(_.cloneDeep(config), { 'AUTH0_CLIENT_ID': 'invalid' }))
const userClient = api(userConfig)
const userFailClient = api(_.assign(_.cloneDeep(userConfig), { 'PASSWORD': 'invalid' }))
const jwtClient = makeJwtClient(api(_.pick(userConfig, 'SUBMISSION_API_URL')), userConfig.JWT)
const jwtFailClient = makeJwtClient(api(_.pick(userConfig, 'SUBMISSION_API_URL')), null)

const notFoundId = 'e0a789ea-6144-4266-bfae-872f9a26e749'

for (const c of [ [ m2mClient, m2mFailClient, 'M2M' ],
  [ userClient, userFailClient, 'User Credentials' ],
  [ jwtClient, jwtFailClient, 'JWT argument' ]]) {
  const [client, failClient, clientName] = c

  // data got from searched reviews
  let reviewId
  let score
  let typeId
  let reviewerId
  let scoreCardId
  let submissionId
  let metadata
  let typeId2
  let reviewerId2
  let scoreCardId2
  let submissionId2

  // review id created in test
  let createdReviewId

  describe(`Review API Tests (${clientName})`, () => {
    describe('Test search reviews', () => {
      it(`search reviews no criteria success`, async () => {
        const res = await client.searchReviews({})
        should.equal(res.status, 200)
        should.equal('1', res.header['x-page'])
        should.equal('20', res.header['x-per-page'])
        should.exist(res.header['x-total'])
        should.exist(res.header['x-total-pages'])
        for (const item of res.body) {
          should.exist(item.id)
          should.exist(item.typeId)
          should.exist(item.submissionId)
          should.exist(item.reviewerId)
          should.exist(item.scoreCardId)
          should.exist(item.score)
        }

        // set test data from searched reviews
        reviewId = res.body[0].id
        score = res.body[0].score
        typeId = res.body[0].typeId
        reviewerId = res.body[0].reviewerId
        scoreCardId = res.body[0].scoreCardId
        submissionId = res.body[0].submissionId
        metadata = res.body[0].metadata || {}
        for (const item of res.body) {
          if (!typeId2 || typeId2 === typeId) {
            typeId2 = item.typeId
          }
          if (!reviewerId2 || reviewerId2 === reviewerId) {
            reviewerId2 = item.reviewerId
          }
          if (!scoreCardId2 || scoreCardId2 === scoreCardId) {
            scoreCardId2 = item.scoreCardId
          }
          if (!submissionId2 || submissionId2 === submissionId) {
            submissionId2 = item.submissionId
          }
        }
      })

      it(`search reviews by criteria success`, async () => {
        const res = await client.searchReviews({
          page: 1,
          perPage: 3,
          score,
          typeId,
          reviewerId,
          scoreCardId,
          submissionId
        })
        should.equal(res.status, 200)
        should.exist(res.header['x-page'])
        should.exist(res.header['x-per-page'])
        should.exist(res.header['x-total'])
        should.exist(res.header['x-total-pages'])
        should.equal(true, res.body.length > 0)
        for (const item of res.body) {
          should.exist(item.id)
          should.equal(item.typeId, typeId)
          should.equal(item.submissionId, submissionId)
          should.equal(item.reviewerId, reviewerId)
          should.equal(item.scoreCardId, scoreCardId)
          should.equal(item.score, score)
        }
      })

      it(`failure - search reviews with invalid page`, async () => {
        try {
          await client.searchReviews({ page: -1 })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"page" must be larger than or equal to 1')
        }
      })

      it(`failure - search reviews with invalid perPage`, async () => {
        try {
          await client.searchReviews({ perPage: -1 })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"perPage" must be larger than or equal to 1')
        }
      })

      it(`failure - search reviews with invalid score`, async () => {
        try {
          await client.searchReviews({ score: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"score" must be a number')
        }
      })

      it(`failure - search reviews with invalid typeId`, async () => {
        try {
          await client.searchReviews({ typeId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"typeId" must be a valid GUID')
        }
      })

      it(`failure - search reviews with invalid reviewerId`, async () => {
        try {
          await client.searchReviews({ reviewerId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewerId" must be a number')
        }
      })

      it(`failure - search reviews with invalid scoreCardId`, async () => {
        try {
          await client.searchReviews({ scoreCardId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"scoreCardId" must be a number')
        }
      })

      it(`failure - search reviews with invalid submissionId`, async () => {
        try {
          await client.searchReviews({ submissionId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
        }
      })

      it(`failure - search reviews with invalid credential`, async () => {
        try {
          await failClient.searchReviews({})
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })
    })

    describe('Test head reviews', () => {
      it(`head reviews no criteria success`, async () => {
        const res = await client.headReviews({})
        should.equal(res.status, 200)
        should.equal('1', res.header['x-page'])
        should.equal('20', res.header['x-per-page'])
        should.exist(res.header['x-total'])
        should.exist(res.header['x-total-pages'])
      })

      it(`head reviews by criteria success`, async () => {
        const res = await client.headReviews({
          page: 1,
          perPage: 3,
          score,
          typeId,
          reviewerId,
          scoreCardId,
          submissionId
        })
        should.equal(res.status, 200)
        should.exist(res.header['x-page'])
        should.exist(res.header['x-per-page'])
        should.exist(res.header['x-total'])
        should.exist(res.header['x-total-pages'])
      })

      it(`failure - head reviews with invalid page`, async () => {
        try {
          await client.headReviews({ page: -1 })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid perPage`, async () => {
        try {
          await client.headReviews({ perPage: -1 })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid score`, async () => {
        try {
          await client.headReviews({ score: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid typeId`, async () => {
        try {
          await client.headReviews({ typeId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid reviewerId`, async () => {
        try {
          await client.headReviews({ reviewerId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid scoreCardId`, async () => {
        try {
          await client.headReviews({ scoreCardId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid submissionId`, async () => {
        try {
          await client.headReviews({ submissionId: 'abc' })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })

      it(`failure - head reviews with invalid credential`, async () => {
        try {
          await failClient.headReviews({})
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })
    })

    describe('Test create review', () => {
      it(`Create review success`, async () => {
        const res = await client.createReview({
          score: 88,
          typeId,
          reviewerId: reviewerId2,
          scoreCardId,
          submissionId: submissionId2,
          metadata: { abc: 'def' }
        })
        createdReviewId = res.body.id
        should.equal(res.status, 200)
        should.equal(res.body.score, 88)
        should.equal(res.body.typeId, typeId)
        should.equal(res.body.reviewerId, reviewerId2)
        should.equal(res.body.scoreCardId, scoreCardId)
        should.equal(res.body.submissionId, submissionId2)
        should.equal(true, _.isEqual(res.body.metadata, { abc: 'def' }))
      })

      it(`failure - Create review with invalid credential`, async () => {
        try {
          await failClient.createReview({
            score: 100,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Create review with invalid request body, invalid score`, async () => {
        try {
          await client.createReview({
            score: 'abc',
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"score" must be a number')
        }
      })

      it(`failure - Create review with invalid request body, invalid typeId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId: 'abc',
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"typeId" must be a valid GUID')
        }
      })

      it(`failure - Create review with invalid request body, null typeId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId: null,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"typeId" must be a string')
        }
      })

      it(`failure - Create review with invalid request body, invalid reviewerId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId,
            reviewerId: 'abc',
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewerId" must be a number')
        }
      })

      it(`failure - Create review with invalid request body, invalid scoreCardId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId,
            reviewerId,
            scoreCardId: 'abc',
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"scoreCardId" must be a number')
        }
      })

      it(`failure - Create review with invalid request body, invalid submissionId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId: 'abc'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
        }
      })

      it(`failure - Create review with invalid request body, empty submissionId`, async () => {
        try {
          await client.createReview({
            score: 88,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId: ''
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"submissionId" is not allowed to be empty')
        }
      })
    })

    describe('Test get review by id', () => {
      it(`Get review by id success`, async () => {
        const res = await client.getReview(reviewId)
        should.equal(res.status, 200)
        should.equal(res.body.id, reviewId)
        should.equal(res.body.score, score)
        should.equal(res.body.typeId, typeId)
        should.equal(res.body.reviewerId, reviewerId)
        should.equal(res.body.scoreCardId, scoreCardId)
        should.equal(res.body.submissionId, submissionId)
        should.equal(true, _.isEqual(res.body.metadata || {}, metadata))
      })

      it(`failure - Get review with invalid credential`, async () => {
        try {
          await failClient.getReview(reviewId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Get review by id not found`, async () => {
        try {
          await client.getReview(notFoundId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 404)
          should.equal(err.response.body.message, `Review with ID = ${notFoundId} is not found`)
        }
      })

      it(`failure - Get review by invalid id`, async () => {
        try {
          await client.getReview('abc')
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewId" must be a valid GUID')
        }
      })
    })

    describe('Test head review by id', () => {
      it(`Head review by id success`, async () => {
        const res = await client.headReview(reviewId)
        should.equal(res.status, 200)
      })

      it(`failure - Head review with invalid credential`, async () => {
        try {
          await failClient.headReview(reviewId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Head review by id not found`, async () => {
        try {
          await client.headReview(notFoundId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 404)
        }
      })

      it(`failure - Head review by invalid id`, async () => {
        try {
          await client.headReview('abc')
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
        }
      })
    })

    describe('Test put review by id', () => {
      it(`Put review by id success`, async () => {
        const res = await client.updateReview(createdReviewId, {
          score: 99,
          typeId: typeId2,
          reviewerId,
          scoreCardId: scoreCardId2,
          submissionId,
          metadata: { aa: 12 }
        })
        should.equal(res.status, 200)
        should.equal(res.body.id, createdReviewId)
        should.equal(res.body.score, 99)
        should.equal(res.body.typeId, typeId2)
        should.equal(res.body.reviewerId, reviewerId)
        should.equal(res.body.scoreCardId, scoreCardId2)
        should.equal(res.body.submissionId, submissionId)
        should.equal(true, _.isEqual(res.body.metadata, { aa: 12 }))
      })

      it(`failure - Put review with invalid credential`, async () => {
        try {
          await failClient.updateReview(createdReviewId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Put review by invalid id`, async () => {
        try {
          await client.updateReview('abc', {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewId" must be a valid GUID')
        }
      })

      it(`failure - Put review by id with invalid score`, async () => {
        try {
          await client.updateReview(createdReviewId, {
            score: 'abc',
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"score" must be a number')
        }
      })

      it(`failure - Put review by id with invalid typeId`, async () => {
        try {
          await client.updateReview(createdReviewId, {
            score: 99,
            typeId: 'abc',
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"typeId" must be a valid GUID')
        }
      })

      it(`failure - Put review by id with invalid reviewerId`, async () => {
        try {
          await client.updateReview(createdReviewId, {
            score: 99,
            typeId,
            reviewerId: 'tt',
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewerId" must be a number')
        }
      })

      it(`failure - Put review by id with invalid scoreCardId`, async () => {
        try {
          await client.updateReview(createdReviewId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId: 'rr',
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"scoreCardId" must be a number')
        }
      })

      it(`failure - Put review by id with invalid submissionId`, async () => {
        try {
          await client.updateReview(createdReviewId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId: 'invalid'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
        }
      })

      it(`failure - Put review by id not found`, async () => {
        try {
          await client.updateReview(notFoundId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 404)
          should.equal(err.response.body.message, `Review with ID = ${notFoundId} is not found`)
        }
      })
    })

    describe('Test patch review by id', () => {
      it(`Patch review by id success 1`, async () => {
        const res = await client.patchReview(createdReviewId, {
          score: 77,
          reviewerId: reviewerId2,
          submissionId: submissionId2,
          metadata: { a: 1, b: 'c' }
        })
        should.equal(res.status, 200)
        should.equal(res.body.id, createdReviewId)
        should.equal(res.body.score, 77)
        should.equal(res.body.typeId, typeId2)
        should.equal(res.body.reviewerId, reviewerId2)
        should.equal(res.body.scoreCardId, scoreCardId2)
        should.equal(res.body.submissionId, submissionId2)
        should.equal(true, _.isEqual(res.body.metadata, { a: 1, b: 'c' }))
      })

      it(`Patch review by id success 2`, async () => {
        const res = await client.patchReview(createdReviewId, {
          score: 56,
          typeId,
          reviewerId,
          scoreCardId,
          submissionId,
          metadata: { abc: 123 }
        })
        should.equal(res.status, 200)
        should.equal(res.body.id, createdReviewId)
        should.equal(res.body.score, 56)
        should.equal(res.body.typeId, typeId)
        should.equal(res.body.reviewerId, reviewerId)
        should.equal(res.body.scoreCardId, scoreCardId)
        should.equal(res.body.submissionId, submissionId)
        should.equal(true, _.isEqual(res.body.metadata, { abc: 123 }))
      })

      it(`failure - Patch review with invalid credential`, async () => {
        try {
          await failClient.patchReview(createdReviewId, {
            score: 9
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Patch review by invalid id`, async () => {
        try {
          await client.patchReview('abc', {
            score: 9
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewId" must be a valid GUID')
        }
      })

      it(`failure - Patch review by id with invalid score`, async () => {
        try {
          await client.patchReview(createdReviewId, {
            score: 'abc'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"score" must be a number')
        }
      })

      it(`failure - Patch review by id with invalid typeId`, async () => {
        try {
          await client.patchReview(createdReviewId, {
            typeId: 'abc'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"typeId" must be a valid GUID')
        }
      })

      it(`failure - Patch review by id with invalid reviewerId`, async () => {
        try {
          await client.patchReview(createdReviewId, {
            reviewerId: 'tt'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewerId" must be a number')
        }
      })

      it(`failure - Patch review by id with invalid scoreCardId`, async () => {
        try {
          await client.patchReview(createdReviewId, {
            scoreCardId: 'rr'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"scoreCardId" must be a number')
        }
      })

      it(`failure - Patch review by id with invalid submissionId`, async () => {
        try {
          await client.patchReview(createdReviewId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId: 'invalid'
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
        }
      })

      it(`failure - Patch review by id not found`, async () => {
        try {
          await client.patchReview(notFoundId, {
            score: 99,
            typeId,
            reviewerId,
            scoreCardId,
            submissionId
          })
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 404)
          should.equal(err.response.body.message, `Review with ID = ${notFoundId} is not found`)
        }
      })
    })

    describe('Test delete review by id', () => {
      it(`Delete review by id success`, async () => {
        const res = await client.deleteReview(createdReviewId)
        should.equal(res.status, 204)
      })

      it(`failure - Delete review with invalid credential`, async () => {
        try {
          await failClient.deleteReview(reviewId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.not.equal(err.message, 'should not throw error here')
        }
      })

      it(`failure - Delete review by id not found`, async () => {
        try {
          await client.deleteReview(notFoundId)
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 404)
          should.equal(err.response.body.message, `Review with ID = ${notFoundId} is not found`)
        }
      })

      it(`failure - Delete review by invalid id`, async () => {
        try {
          await client.deleteReview('abc')
          throw new Error('should not throw error here')
        } catch (err) {
          should.equal(err.status, 400)
          should.equal(err.response.body.message, '"reviewId" must be a valid GUID')
        }
      })
    })
  })
}
