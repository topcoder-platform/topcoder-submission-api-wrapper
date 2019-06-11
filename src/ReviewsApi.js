/*
 * Wrapper function for Review related endpoints
 */

const helper = require('./common/helper')

/**
 * Function to search reviews with pagination and filter(score, typeId, reviewerId, scoreCardId and submissionId)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), score(The score filter for reviews.),
 *   typeId(the review type id filter), reviewerId(reviewer id filter), scoreCardId (scorecard id filter)
 *   and submissionId(submission id filter)
 * @returns {Promise} searched reviews
 */
const searchReviews = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviews`, reqQuery)
  return helper.reqToV5API(config, 'GET', url)
}

/**
 * Function to HEAD the reviews with pagination and filter(score, typeId, reviewerId, scoreCardId and submissionId)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), score(The score filter for reviews.),
 *   typeId(the review type id filter), reviewerId(reviewer id filter), scoreCardId (scorecard id filter)
 *   and submissionId(submission id filter)
 * @returns {Promise} searched reviews head
 */
const headReviews = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviews`, reqQuery)
  return helper.reqToV5API(config, 'HEAD', url)
}

/**
 * Function to create the review.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @returns {Promise} created review
 */
const createReview = async (config, reqBody) => {
  return helper.reqToV5API(config, 'POST', `${config.SUBMISSION_API_URL}/reviews`, reqBody)
}

/**
 * Function to get the review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @returns {Promise}
 */
const getReview = async (config, reviewId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
}

/**
 * Function to HEAD review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @returns {Promise}
 */
const headReview = async (config, reviewId) => {
  return helper.reqToV5API(config, 'HEAD', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
}

/**
 * Function to fully update review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @returns {Promise} updated review
 */
const updateReview = async (config, reviewId, reqBody) => {
  return helper.reqToV5API(config, 'PUT', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`, reqBody)
}

/**
 * Function to partially update review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @returns {Promise} updated review
 */
const patchReview = async (config, reviewId, reqBody) => {
  return helper.reqToV5API(config, 'PATCH', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`, reqBody)
}

/**
 * Function to delete review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @returns {Promise}
 */
const deleteReview = async (config, reviewId) => {
  return helper.reqToV5API(config, 'DELETE', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
}

module.exports = {
  searchReviews,
  headReviews,
  createReview,
  getReview,
  headReview,
  updateReview,
  patchReview,
  deleteReview
}
