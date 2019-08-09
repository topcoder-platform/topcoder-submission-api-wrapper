/*
 * Setting up Mock for unit tests
 */

require('./common/bootstrap')

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const nock = require('nock')
const joi = require('@hapi/joi')
const prepare = require('mocha-prepare')
const th = require('./common/testHelper')
const td = require('./common/testData')
const Reviews = require('./data/Reviews.json')
const ReviewSummations = require('./data/ReviewSummations.json')
const store = require('./common/store')

const AUTH_PATH = td.AUTH_PATH
const AUTHN_PATH = td.AUTHN_PATH
const AUTHN_REFRESH_TOKEN = td.AUTHN_REFRESH_TOKEN
const AUTHN_ID_TOKEN = td.AUTHN_ID_TOKEN
const AUTHN_ACCESS_TOKEN = td.AUTHN_ACCESS_TOKEN
const AUTHN_TOKEN_TYPE = td.AUTHN_TOKEN_TYPE
const AUTHZ_PATH = td.AUTHZ_PATH
const AUTHZ_TOKEN = td.AUTHZ_TOKEN

const API_VERSION = td.API_VERSION

store.submissionData = {}
const reviewForGet = Reviews[0]
const reviewSummationForGet = ReviewSummations[0]

prepare(function (done) {
  // called before loading of test cases
  nock(/.com|localhost/)
    .persist()
    .filteringPath((path) => {
      if (path.startsWith(API_VERSION)) {
        return path.substring(API_VERSION.length)
      }
      return path
    })
    .post(AUTH_PATH)
    .reply((_uri, requestBody) => {
      if (requestBody['client_id'] === 'invalid') {
        return [404, {
          message: 'Unknown Error'
        }]
      } else {
        return [200, {
          'access_token': td.M2M_TOKEN,
          'scope': 'all:review all:review_summation all:review_type all:submission',
          'expires_in': 864000,
          'token_type': 'Bearer'
        }]
      }
    })
    .post(AUTHN_PATH)
    .reply((_uri, requestBody) => {
      if (requestBody.password === 'invalid') {
        return [401, {
          message: 'Unknown Error'
        }]
      }
      return [200, {
        'id_token': AUTHN_ID_TOKEN,
        'refresh_token': AUTHN_REFRESH_TOKEN,
        'access_token': AUTHN_ACCESS_TOKEN,
        'token_type': AUTHN_TOKEN_TYPE
      }]
    })
    .post(AUTHZ_PATH)
    .reply(() => [ 200, { result: { content: { token: AUTHZ_TOKEN } } } ])
    .post(`/reviewTypes`)
    .reply(function (uri, body) {
      const result = th.create({
        uri,
        method: this.method.toLowerCase(),
        body
      })
      if (result[0] === td.CREATE_SUCCESS_STATUS) {
        store.reviewTypeData = result[1]
      }
      return result
    })
    .get(`/reviewTypes`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase()
      })
    })
    .head(`/reviewTypes`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase(),
        isHead: true
      })
    })
    .get(/\/reviewTypes\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewTypeData,
        notFound: td.NotFoundError.ReviewType
      })
    })
    .head(/\/reviewTypes\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: null,
        isHead: true,
        notFound: td.NotFoundError.ReviewType
      })
    })
    .put(/\/reviewTypes\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewTypeData,
        body,
        notFound: td.NotFoundError.ReviewType
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewTypeData = result[1]
      }
      return result
    })
    .patch(/\/reviewTypes\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewTypeData,
        body,
        notFound: td.NotFoundError.ReviewType
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewTypeData = result[1]
      }
      return result
    })
    .delete(/\/reviewTypes\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.remove({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewTypeData,
        notFound: td.NotFoundError.ReviewType
      })
      if (result[0] === td.DELETE_SUCCESS_STATUS) {
        store.reviewTypeData = null
      }
      return result
    })
    .post(`/reviews`)
    .reply(function (uri, body) {
      const result = th.create({
        uri,
        method: this.method.toLowerCase(),
        body,
        needUser: true
      })
      if (result[0] === td.CREATE_SUCCESS_STATUS) {
        store.reviewData = result[1]
      }
      return result
    })
    .get(`/reviews`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase()
      })
    })
    .head(`/reviews`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase(),
        isHead: true
      })
    })
    .get(/\/reviews\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: reviewForGet,
        needUser: true,
        notFound: td.NotFoundError.Review
      })
    })
    .head(/\/reviews\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: null,
        isHead: true,
        needUser: true,
        notFound: td.NotFoundError.Review
      })
    })
    .put(/\/reviews\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewData,
        body,
        needUser: true,
        notFound: td.NotFoundError.Review
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewData = result[1]
      }
      return result
    })
    .patch(/\/reviews\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewData,
        body,
        needUser: true,
        notFound: td.NotFoundError.Review
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewData = result[1]
      }
      return result
    })
    .delete(/\/reviews\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.remove({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewData,
        notFound: td.NotFoundError.Review
      })
      if (result[0] === td.DELETE_SUCCESS_STATUS) {
        store.reviewData = null
      }
      return result
    })
    .post(`/reviewSummations`)
    .reply(function (uri, body) {
      const result = th.create({
        uri,
        method: this.method.toLowerCase(),
        body,
        needUser: true
      })
      if (result[0] === td.CREATE_SUCCESS_STATUS) {
        store.reviewSummationData = result[1]
      }
      return result
    })
    .get(`/reviewSummations`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase()
      })
    })
    .head(`/reviewSummations`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase(),
        isHead: true
      })
    })
    .get(/\/reviewSummations\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: reviewSummationForGet,
        notFoundId: td.SUMMATION_NOTFOUND_ID,
        notFound: td.NotFoundError.ReviewSummation
      })
    })
    .head(/\/reviewSummations\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: null,
        isHead: true,
        notFoundId: td.SUMMATION_NOTFOUND_ID,
        notFound: td.NotFoundError.ReviewSummation
      })
    })
    .put(/\/reviewSummations\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewSummationData,
        body,
        needUser: true,
        notFoundId: td.SUMMATION_NOTFOUND_ID,
        notFound: td.NotFoundError.ReviewSummation
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewSummationData = result[1]
      }
      return result
    })
    .patch(/\/reviewSummations\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewSummationData,
        body,
        needUser: true,
        notFoundId: td.SUMMATION_NOTFOUND_ID,
        notFound: td.NotFoundError.ReviewSummation
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.reviewSummationData = result[1]
      }
      return result
    })
    .delete(/\/reviewSummations\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.remove({
        uri,
        method: this.method.toLowerCase(),
        obj: store.reviewSummationData,
        notFoundId: td.SUMMATION_NOTFOUND_ID,
        notFound: td.NotFoundError.ReviewSummation
      })
      if (result[0] === td.DELETE_SUCCESS_STATUS) {
        store.reviewSummationData = null
      }
      return result
    })
    .post(`/submissions`)
    .reply(function (uri, body) {
      const textBody = String(body).includes('form-data') ? body : th.hexToString(body)
      const parsedBody = th.multiPartParse(textBody, this.req.headers['content-type'])
      const result = th.create({
        uri,
        method: this.method.toLowerCase(),
        body: parsedBody,
        needUser: true,
        isMultiPart: true,
        isSubmission: true
      })
      if (result[0] === td.CREATE_SUCCESS_STATUS) {
        store.submissionData[result[1].id] = result[1]
      }
      return result
    })
    .get(`/submissions/${td.NOT_FOUND_ID}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.NOT_FOUND_STATUS, { message: td.NotFoundError.Submission }]
    })
    .get(`/submissions/${td.SUBMISSION_ID1}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.SUCCESS_STATUS, fs.readFileSync(path.resolve(__dirname, './data/fileToUpload.zip'))]
    })
    .get(`/submissions/${td.SUBMISSION_ID2}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.SUCCESS_STATUS, fs.readFileSync(path.resolve(__dirname, './data/good.zip'))]
    })
    .get(`/submissions/${td.SUBMISSION_ID1}/artifacts/${td.ARTIFACT_ID}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.SUCCESS_STATUS, fs.readFileSync(path.resolve(__dirname, './data/fileToUpload.zip'))]
    })
    .get(`/submissions/invalid/artifacts/${td.ARTIFACT_ID}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: `"submissionId" must be a valid GUID` }]
    })
    .get(`/submissions/${td.NOT_FOUND_ID}/artifacts/${td.ARTIFACT_ID}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Submission2 }]
    })
    .get(`/submissions/${td.SUBMISSION_ID1}/artifacts/${td.NOT_FOUND_ID}/download`)
    .query(true)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Artifact }]
    })
    .delete(`/submissions/${td.SUBMISSION_ID1}/artifacts/${td.ARTIFACT_ID}`)
    .reply(function (uri, body) {
      return [td.DELETE_SUCCESS_STATUS, null]
    })
    .delete(`/submissions/invalid/artifacts/${td.ARTIFACT_ID}`)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: `"submissionId" must be a valid GUID` }]
    })
    .delete(`/submissions/${td.NOT_FOUND_ID}/artifacts/${td.ARTIFACT_ID}`)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Submission2 }]
    })
    .delete(`/submissions/${td.SUBMISSION_ID1}/artifacts/${td.NOT_FOUND_ID}`)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Artifact }]
    })
    .get(`/submissions/${td.NOT_FOUND_ID}/artifacts`)
    .query(true)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Submission2 }]
    })
    .get(`/submissions/${td.SUBMISSION_ID1}/artifacts`)
    .query(true)
    .reply(function (uri, body) {
      return [td.SUCCESS_STATUS, { artifacts: [store.artifactData.artifact.split('.')[0]] }]
    })
    .get(`/submissions/invalid/artifacts`)
    .query(true)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: `"submissionId" must be a valid GUID` }]
    })
    .post(`/submissions/${td.NOT_FOUND_ID}/artifacts`)
    .reply(function (uri, body) {
      return [td.JOI_FAIL_STATUS, { message: td.NotFoundError.Submission2 }]
    })
    .post(`/submissions/${td.SUBMISSION_ID1}/artifacts`)
    .reply(function (uri, body) {
      const textBody = String(body).includes('form-data') ? body : th.hexToString(body)
      const parsedBody = th.multiPartParse(textBody, this.req.headers['content-type'])
      const route = th.findRoute({ method: 'post', path: '/submissions/:id/artifacts' })
      const joiParam = {
        files: _.get(parsedBody, 'files'),
        submissionId: td.SUBMISSION_ID1,
        entity: {
          typeId: _.get(parsedBody, 'typeId')
        }
      }
      if (!joiParam.files) {
        return [td.JOI_FAIL_STATUS, { message: 'Artifact is missing or not under attribute `artifact`' }]
      }
      const result = joi.validate(joiParam, route.schema)
      if (result.error) {
        return [td.JOI_FAIL_STATUS, { message: result.error.details[0].message }]
      }
      if (store.artifactData) {
        return [409, { message: `Artifact ${route.id}.zip already exists for Submission ${td.SUBMISSION_ID1}` }]
      }
      store.artifactData = { artifact: `${route.id}.zip` }
      return [td.SUCCESS_STATUS, store.artifactData]
    })
    .get(`/submissions`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase()
      })
    })
    .head(`/submissions`)
    .query(true)
    .reply(function (uri) {
      return th.search({
        uri,
        method: this.method.toLowerCase(),
        isHead: true
      })
    })
    .get(/\/submissions\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: store.submissionData,
        isSubmission: true,
        needUser: true,
        notFound: td.NotFoundError.Submission
      })
    })
    .head(/\/submissions\/.*/)
    .query(true)
    .reply(function (uri) {
      return th.get({
        uri,
        method: this.method.toLowerCase(),
        obj: null,
        isHead: true,
        needUser: true,
        notFound: td.NotFoundError.Submission
      })
    })
    .put(/\/submissions\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.submissionData,
        isSubmission: true,
        body,
        needUser: true,
        notFound: td.NotFoundError.Submission
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.submissionData[result[1].id] = result[1]
      }
      return result
    })
    .patch(/\/submissions\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.put({
        uri,
        method: this.method.toLowerCase(),
        obj: store.submissionData,
        isSubmission: true,
        body,
        needUser: true,
        notFound: td.NotFoundError.Submission
      })
      if (result[0] === td.SUCCESS_STATUS) {
        store.submissionData[result[1].id] = result[1]
      }
      return result
    })
    .delete(/\/submissions\/.*/)
    .query(true)
    .reply(function (uri, body) {
      const result = th.remove({
        uri,
        method: this.method.toLowerCase(),
        obj: store.submissionData,
        isSubmission: true,
        notFound: td.NotFoundError.Submission
      })
      if (result[0] === td.DELETE_SUCCESS_STATUS) {
        store.submissionData[result[1]] = null
        result[1] = null
      }
      return result
    })
    .get(() => true)
    .query(true)
    .reply(404)
    .post(() => true)
    .query(true)
    .reply(404)
    .delete(() => true)
    .query(true)
    .reply(404)
    .put(() => true)
    .query(true)
    .reply(404)
    .patch(() => true)
    .query(true)
    .reply(404)
  done()
}, function (done) {
  // called after all test completes (regardless of errors)
  nock.cleanAll()
  done()
})
