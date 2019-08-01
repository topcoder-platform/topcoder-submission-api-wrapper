/*
 * Index file
 */

const _ = require('lodash')
const joi = require('@hapi/joi')

module.exports = (allConfig) => {
  /**
   * The configuration object schema.
   * AUTH0_URL: the auth0 url
   * AUTH0_AUDIENCE: the auth0 audience
   * TOKEN_CACHE_TIME: the token cache time, it is optional field.
   * AUTH0_CLIENT_ID: the auth0 client id, used as credential
   * AUTH0_CLIENT_SECRET: the auth0 client secret, used as credential
   * SUBMISSION_API_URL: the Topcoder v5 submission api base url.
   * AUTH0_PROXY_SERVER_URL: the auth0 proxy server url, it is optional field.
   */
  const m2mSchema = joi.object().keys({
    AUTH0_URL: joi.string().uri().trim().required(),
    AUTH0_AUDIENCE: joi.string().uri().trim().required(),
    TOKEN_CACHE_TIME: joi.number().integer().min(0),
    AUTH0_CLIENT_ID: joi.string().required(),
    AUTH0_CLIENT_SECRET: joi.string().required(),
    SUBMISSION_API_URL: joi.string().uri().trim().required(),
    AUTH0_PROXY_SERVER_URL: joi.string()
  })

  /**
   * The user credentials schema.
   * USERNAME: the username
   * PASSWORD: the user password
   * TC_AUTHN_URL: the tc authn url
   * TC_AUTHZ_URL: the tc authz url
   * TC_CLIENT_ID: the tc client id
   * TC_CLIENT_V2CONNECTION: the tc client v2connection
   */
  const credentialsSchema = joi.object().keys({
    USERNAME: joi.string().trim().required(),
    PASSWORD: joi.string().trim().required(),
    TC_AUTHN_URL: joi.string().trim().uri().required(),
    TC_AUTHZ_URL: joi.string().trim().uri().required(),
    TC_CLIENT_ID: joi.string().trim().required(),
    TC_CLIENT_V2CONNECTION: joi.string().trim().required(),
    SUBMISSION_API_URL: joi.string().uri().trim().required()
  })

  /**
   * The JWT method argument config schema
   */
  const jwtMethodArgSchema = joi.object().keys({
    SUBMISSION_API_URL: joi.string().uri().trim().required()
  }).unknown(false)

  let schema = jwtMethodArgSchema
  let schemaType = 'JWT Method Argument'

  // Pick auth config
  const config = _.pick(allConfig, [
    'AUTH0_URL',
    'AUTH0_AUDIENCE',
    'TOKEN_CACHE_TIME',
    'AUTH0_CLIENT_ID',
    'AUTH0_CLIENT_SECRET',
    'SUBMISSION_API_URL',
    'AUTH0_PROXY_SERVER_URL',
    'USERNAME',
    'PASSWORD',
    'TC_AUTHN_URL',
    'TC_AUTHZ_URL',
    'TC_CLIENT_ID',
    'TC_CLIENT_V2CONNECTION'
  ])
  if (_.has(config, 'AUTH0_URL')) {
    schema = m2mSchema
    schemaType = 'M2M Configuration'
  } else if (_.has(config, 'USERNAME')) {
    schema = credentialsSchema
    schemaType = 'User Credentials Configuration'
  }

  // Validate the arguments
  const result = joi.validate(config, schema)
  if (result.error) {
    throw new Error(`[${schemaType}] ${result.error.details[0].message}`)
  }

  // Export functions
  return {
    // -- review type APIs --

    // Search review types
    searchReviewTypes: (reqQuery, jwt) => {
      return require('./src/ReviewTypesApi').searchReviewTypes(config, reqQuery, jwt)
    },
    // Head review types
    headReviewTypes: (reqQuery, jwt) => {
      return require('./src/ReviewTypesApi').headReviewTypes(config, reqQuery, jwt)
    },
    // Create review type
    createReviewType: (reqBody, jwt) => {
      return require('./src/ReviewTypesApi').createReviewType(config, reqBody, jwt)
    },
    // Get review type
    getReviewType: (reviewTypeId, jwt) => {
      return require('./src/ReviewTypesApi').getReviewType(config, reviewTypeId, jwt)
    },
    // Head review type
    headReviewType: (reviewTypeId, jwt) => {
      return require('./src/ReviewTypesApi').headReviewType(config, reviewTypeId, jwt)
    },
    // Fully update review type
    updateReviewType: (reviewTypeId, reqBody, jwt) => {
      return require('./src/ReviewTypesApi').updateReviewType(config, reviewTypeId, reqBody, jwt)
    },
    // Partially update review type
    patchReviewType: (reviewTypeId, reqBody, jwt) => {
      return require('./src/ReviewTypesApi').patchReviewType(config, reviewTypeId, reqBody, jwt)
    },
    // Delete review type
    deleteReviewType: (reviewTypeId, jwt) => {
      return require('./src/ReviewTypesApi').deleteReviewType(config, reviewTypeId, jwt)
    },

    // -- review APIs --

    // Search reviews
    searchReviews: (reqQuery, jwt) => {
      return require('./src/ReviewsApi').searchReviews(config, reqQuery, jwt)
    },
    // Head reviews
    headReviews: (reqQuery, jwt) => {
      return require('./src/ReviewsApi').headReviews(config, reqQuery, jwt)
    },
    // Create review
    createReview: (reqBody, jwt) => {
      return require('./src/ReviewsApi').createReview(config, reqBody, jwt)
    },
    // Get review
    getReview: (reviewId, jwt) => {
      return require('./src/ReviewsApi').getReview(config, reviewId, jwt)
    },
    // Head review
    headReview: (reviewId, jwt) => {
      return require('./src/ReviewsApi').headReview(config, reviewId, jwt)
    },
    // Fully update review
    updateReview: (reviewId, reqBody, jwt) => {
      return require('./src/ReviewsApi').updateReview(config, reviewId, reqBody, jwt)
    },
    // Partially update review
    patchReview: (reviewId, reqBody, jwt) => {
      return require('./src/ReviewsApi').patchReview(config, reviewId, reqBody, jwt)
    },
    // Delete review
    deleteReview: (reviewId, jwt) => {
      return require('./src/ReviewsApi').deleteReview(config, reviewId, jwt)
    },

    // -- review summation APIs --

    // Search review summations
    searchReviewSummations: (reqQuery, jwt) => {
      return require('./src/ReviewSummationsApi').searchReviewSummations(config, reqQuery, jwt)
    },
    // Head review summations
    headReviewSummations: (reqQuery, jwt) => {
      return require('./src/ReviewSummationsApi').headReviewSummations(config, reqQuery, jwt)
    },
    // Create review summation
    createReviewSummation: (reqBody, jwt) => {
      return require('./src/ReviewSummationsApi').createReviewSummation(config, reqBody, jwt)
    },
    // Get review summation
    getReviewSummation: (reviewSummationId, jwt) => {
      return require('./src/ReviewSummationsApi').getReviewSummation(config, reviewSummationId, jwt)
    },
    // Head review summation
    headReviewSummation: (reviewSummationId, jwt) => {
      return require('./src/ReviewSummationsApi').headReviewSummation(config, reviewSummationId, jwt)
    },
    // Fully update review summation
    updateReviewSummation: (reviewSummationId, reqBody, jwt) => {
      return require('./src/ReviewSummationsApi').updateReviewSummation(config, reviewSummationId, reqBody, jwt)
    },
    // Partially update review summation
    patchReviewSummation: (reviewSummationId, reqBody, jwt) => {
      return require('./src/ReviewSummationsApi').patchReviewSummation(config, reviewSummationId, reqBody, jwt)
    },
    // Delete review summation
    deleteReviewSummation: (reviewSummationId, jwt) => {
      return require('./src/ReviewSummationsApi').deleteReviewSummation(config, reviewSummationId, jwt)
    },

    // -- submission APIs --
    // Search submissions
    searchSubmissions: (reqQuery, jwt) => {
      return require('./src/SubmissionsApi').searchSubmissions(config, reqQuery, jwt)
    },
    // Head submissions
    headSubmissions: (reqQuery, jwt) => {
      return require('./src/SubmissionsApi').headSubmissions(config, reqQuery, jwt)
    },
    // Create submission
    createSubmission: (reqFormData, jwt) => {
      return require('./src/SubmissionsApi').createSubmission(config, reqFormData, jwt)
    },
    // Get submission
    getSubmission: (submissionId, jwt) => {
      return require('./src/SubmissionsApi').getSubmission(config, submissionId, jwt)
    },
    // Head submission
    headSubmission: (submissionId, jwt) => {
      return require('./src/SubmissionsApi').headSubmission(config, submissionId, jwt)
    },
    // Fully update submission
    updateSubmission: (submissionId, reqBody, jwt) => {
      return require('./src/SubmissionsApi').updateSubmission(config, submissionId, reqBody, jwt)
    },
    // Partially update submission
    patchSubmission: (submissionId, reqBody, jwt) => {
      return require('./src/SubmissionsApi').patchSubmission(config, submissionId, reqBody, jwt)
    },
    // Delete review submission
    deleteSubmission: (submissionId, jwt) => {
      return require('./src/SubmissionsApi').deleteSubmission(config, submissionId, jwt)
    },
    // Download submission
    downloadSubmission: (submissionId, jwt) => {
      return require('./src/SubmissionsApi').downloadSubmission(config, submissionId, jwt)
    },
    // Create artifact for submission
    createArtifact: (submissionId, reqFormData, jwt) => {
      return require('./src/SubmissionsApi').createArtifact(config, submissionId, reqFormData, jwt)
    },
    // List artifacts of specified submission
    listArtifacts: (submissionId, jwt) => {
      return require('./src/SubmissionsApi').listArtifacts(config, submissionId, jwt)
    },
    // Download artifact
    downloadArtifact: (submissionId, artifactId, jwt) => {
      return require('./src/SubmissionsApi').downloadArtifact(config, submissionId, artifactId, jwt)
    }
  }
}
