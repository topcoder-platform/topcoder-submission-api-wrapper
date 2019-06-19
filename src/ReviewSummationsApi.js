/*
 * Wrapper function for Review Summation related endpoints
 */

const helper = require('./common/helper')

/**
 * Function to search review summations with pagination and filter(submissionId, aggregateScore, scoreCardId and isPassing)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), submissionId(the submission id filter),
 *   aggregateScore(the aggregate score filter), scoreCardId(the score card id filter) and isPassing (the passing boolean flag filter)
 * @returns {Promise} searched review summations
 */
const searchReviewSummations = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewSummations`, reqQuery)
  return helper.reqToV5API(config, 'GET', url)
}

/**
 * Function to HEAD the review summations with pagination and filter(submissionId, aggregateScore, scoreCardId and isPassing)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), submissionId(the submission id filter),
 *   aggregateScore(the aggregate score filter), scoreCardId(the score card id filter) and isPassing (the passing boolean flag filter)
 * @returns {Promise} searched review summations
 */
const headReviewSummations = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewSummations`, reqQuery)
  return helper.reqToV5API(config, 'HEAD', url)
}

/**
 * Function to create the review summation.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, including submissionId(submission id), aggregateScore(aggregate score),
 *   scoreCardId(scorecard id), isPassing(passing boolean flag) and metadata(related metadata) properties
 * @returns {Promise} created review summation
 */
const createReviewSummation = async (config, reqBody) => {
  return helper.reqToV5API(config, 'POST', `${config.SUBMISSION_API_URL}/reviewSummations`, reqBody)
}

/**
 * Function to get the review summation by id.
 * @param {Object} config Configuration object
 * @param {String} reviewSummationId the review summation id
 * @returns {Promise}
 */
const getReviewSummation = async (config, reviewSummationId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/reviewSummations/${reviewSummationId}`)
}

/**
 * Function to HEAD review summation by id.
 * @param {Object} config Configuration object
 * @param {String} reviewSummationId the review summation id
 * @returns {Promise}
 */
const headReviewSummation = async (config, reviewSummationId) => {
  return helper.reqToV5API(config, 'HEAD', `${config.SUBMISSION_API_URL}/reviewSummations/${reviewSummationId}`)
}

/**
 * Function to fully update review summation by id.
 * @param {Object} config Configuration object
 * @param {String} reviewSummationId the review summation id
 * @param {Object} reqBody the request body object, including submissionId(submission id), aggregateScore(aggregate score),
 *   scoreCardId(scorecard id), isPassing(passing boolean flag) and metadata(related metadata) properties
 * @returns {Promise} updated review summation
 */
const updateReviewSummation = async (config, reviewSummationId, reqBody) => {
  return helper.reqToV5API(config, 'PUT', `${config.SUBMISSION_API_URL}/reviewSummations/${reviewSummationId}`, reqBody)
}

/**
 * Function to partially update review summation by id.
 * @param {Object} config Configuration object
 * @param {String} reviewSummationId the review summation id
 * @param {Object} reqBody the request body object, including submissionId(submission id), aggregateScore(aggregate score),
 *   scoreCardId(scorecard id), isPassing(passing boolean flag) and metadata(related metadata) properties
 * @returns {Promise} updated review summation
 */
const patchReviewSummation = async (config, reviewSummationId, reqBody) => {
  return helper.reqToV5API(config, 'PATCH', `${config.SUBMISSION_API_URL}/reviewSummations/${reviewSummationId}`, reqBody)
}

/**
 * Function to delete review summation by id.
 * @param {Object} config Configuration object
 * @param {String} reviewSummationId the review summation id
 * @returns {Promise}
 */
const deleteReviewSummation = async (config, reviewSummationId) => {
  return helper.reqToV5API(config, 'DELETE', `${config.SUBMISSION_API_URL}/reviewSummations/${reviewSummationId}`)
}

module.exports = {
  searchReviewSummations,
  headReviewSummations,
  createReviewSummation,
  getReviewSummation,
  headReviewSummation,
  updateReviewSummation,
  patchReviewSummation,
  deleteReviewSummation
}
