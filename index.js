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
  const schema = joi.object().keys({
    AUTH0_URL: joi.string().uri().trim().required(),
    AUTH0_AUDIENCE: joi.string().uri().trim().required(),
    TOKEN_CACHE_TIME: joi.number().integer().min(0),
    AUTH0_CLIENT_ID: joi.string().required(),
    AUTH0_CLIENT_SECRET: joi.string().required(),
    SUBMISSION_API_URL: joi.string().uri().trim().required(),
    AUTH0_PROXY_SERVER_URL: joi.string()
  })

  // Pick auth config
  const config = _.pick(allConfig, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
    'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL', 'AUTH0_PROXY_SERVER_URL' ])
  // Validate the arguments
  const result = joi.validate(config, schema)

  if (result.error) {
    throw new Error(result.error.details[0].message)
  }

  // Export functions
  return {
    // -- review type APIs --

    // Search review types
    searchReviewTypes: async (reqQuery) => {
      return require('./src/ReviewTypesApi').searchReviewTypes(config, reqQuery)
    },
    // Head review types
    headReviewTypes: async (reqQuery) => {
      return require('./src/ReviewTypesApi').headReviewTypes(config, reqQuery)
    },
    // Create review type
    createReviewType: async (reqBody) => {
      return require('./src/ReviewTypesApi').createReviewType(config, reqBody)
    },
    // Get review type
    getReviewType: async (reviewTypeId) => {
      return require('./src/ReviewTypesApi').getReviewType(config, reviewTypeId)
    },
    // Head review type
    headReviewType: async (reviewTypeId) => {
      return require('./src/ReviewTypesApi').headReviewType(config, reviewTypeId)
    },
    // Fully update review type
    updateReviewType: async (reviewTypeId, reqBody) => {
      return require('./src/ReviewTypesApi').updateReviewType(config, reviewTypeId, reqBody)
    },
    // Partially update review type
    patchReviewType: async (reviewTypeId, reqBody) => {
      return require('./src/ReviewTypesApi').patchReviewType(config, reviewTypeId, reqBody)
    },
    // Delete review type
    deleteReviewType: async (reviewTypeId) => {
      return require('./src/ReviewTypesApi').deleteReviewType(config, reviewTypeId)
    },

    // -- review APIs --

    // Search reviews
    searchReviews: async (reqQuery) => {
      return require('./src/ReviewsApi').searchReviews(config, reqQuery)
    },
    // Head reviews
    headReviews: async (reqQuery) => {
      return require('./src/ReviewsApi').headReviews(config, reqQuery)
    },
    // Create review
    createReview: async (reqBody) => {
      return require('./src/ReviewsApi').createReview(config, reqBody)
    },
    // Get review
    getReview: async (reviewId) => {
      return require('./src/ReviewsApi').getReview(config, reviewId)
    },
    // Head review
    headReview: async (reviewId) => {
      return require('./src/ReviewsApi').headReview(config, reviewId)
    },
    // Fully update review
    updateReview: async (reviewId, reqBody) => {
      return require('./src/ReviewsApi').updateReview(config, reviewId, reqBody)
    },
    // Partially update review
    patchReview: async (reviewId, reqBody) => {
      return require('./src/ReviewsApi').patchReview(config, reviewId, reqBody)
    },
    // Delete review
    deleteReview: async (reviewId) => {
      return require('./src/ReviewsApi').deleteReview(config, reviewId)
    },

    // -- review summation APIs --

    // Search review summations
    searchReviewSummations: async (reqQuery) => {
      return require('./src/ReviewSummationsApi').searchReviewSummations(config, reqQuery)
    },
    // Head review summations
    headReviewSummations: async (reqQuery) => {
      return require('./src/ReviewSummationsApi').headReviewSummations(config, reqQuery)
    },
    // Create review summation
    createReviewSummation: async (reqBody) => {
      return require('./src/ReviewSummationsApi').createReviewSummation(config, reqBody)
    },
    // Get review summation
    getReviewSummation: async (reviewSummationId) => {
      return require('./src/ReviewSummationsApi').getReviewSummation(config, reviewSummationId)
    },
    // Head review summation
    headReviewSummation: async (reviewSummationId) => {
      return require('./src/ReviewSummationsApi').headReviewSummation(config, reviewSummationId)
    },
    // Fully update review summation
    updateReviewSummation: async (reviewSummationId, reqBody) => {
      return require('./src/ReviewSummationsApi').updateReviewSummation(config, reviewSummationId, reqBody)
    },
    // Partially update review summation
    patchReviewSummation: async (reviewSummationId, reqBody) => {
      return require('./src/ReviewSummationsApi').patchReviewSummation(config, reviewSummationId, reqBody)
    },
    // Delete review summation
    deleteReviewSummation: async (reviewSummationId) => {
      return require('./src/ReviewSummationsApi').deleteReviewSummation(config, reviewSummationId)
    },

    // -- submission APIs --
    // Search submissions
    searchSubmissions: async (reqQuery) => {
      return require('./src/SubmissionsApi').searchSubmissions(config, reqQuery)
    },
    // Head submissions
    headSubmissions: async (reqQuery) => {
      return require('./src/SubmissionsApi').headSubmissions(config, reqQuery)
    },
    // Create submission
    createSubmission: async (reqFormData) => {
      return require('./src/SubmissionsApi').createSubmission(config, reqFormData)
    },
    // Get submission
    getSubmission: async (submissionId) => {
      return require('./src/SubmissionsApi').getSubmission(config, submissionId)
    },
    // Head submission
    headSubmission: async (submissionId) => {
      return require('./src/SubmissionsApi').headSubmission(config, submissionId)
    },
    // Fully update submission
    updateSubmission: async (submissionId, reqBody) => {
      return require('./src/SubmissionsApi').updateSubmission(config, submissionId, reqBody)
    },
    // Partially update submission
    patchSubmission: async (submissionId, reqBody) => {
      return require('./src/SubmissionsApi').patchSubmission(config, submissionId, reqBody)
    },
    // Delete review submission
    deleteSubmission: async (submissionId) => {
      return require('./src/SubmissionsApi').deleteSubmission(config, submissionId)
    },
    // Download submission
    downloadSubmission: async (submissionId) => {
      return require('./src/SubmissionsApi').downloadSubmission(config, submissionId)
    },
    // Create artifact for submission
    createArtifact: async (submissionId, reqFormData) => {
      return require('./src/SubmissionsApi').createArtifact(config, submissionId, reqFormData)
    },
    // List artifacts of specified submission
    listArtifacts: async (submissionId) => {
      return require('./src/SubmissionsApi').listArtifacts(config, submissionId)
    },
    // Download artifact
    downloadArtifact: async (submissionId, artifactId) => {
      return require('./src/SubmissionsApi').downloadArtifact(config, submissionId, artifactId)
    }
  }
}
