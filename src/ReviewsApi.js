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
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise} searched reviews
 */
const searchReviews = (config, reqQuery, jwt = null) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviews`, reqQuery)
  return helper.reqToV5API(config, jwt, 'GET', url)
}

/**
 * Function to HEAD the reviews with pagination and filter(score, typeId, reviewerId, scoreCardId and submissionId)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), score(The score filter for reviews.),
 *   typeId(the review type id filter), reviewerId(reviewer id filter), scoreCardId (scorecard id filter)
 *   and submissionId(submission id filter)
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise} searched reviews head
 */
const headReviews = (config, reqQuery, jwt = null) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviews`, reqQuery)
  return helper.reqToV5API(config, jwt, 'HEAD', url)
}

/**
 * Function to create the review.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise} created review
 */
const createReview = (config, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'POST', `${config.SUBMISSION_API_URL}/reviews`, reqBody)
}

/**
 * Function to get the review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const getReview = (config, reviewId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'GET', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
}

/**
 * Function to HEAD review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const headReview = (config, reviewId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'HEAD', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
}

/**
 * Function to fully update review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise} updated review
 */
const updateReview = (config, reviewId, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'PUT', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`, reqBody)
}

/**
 * Function to partially update review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {Object} reqBody the request body object, including score(review score), typeId (review type id),
 *   reviewerId(reviewer id), scoreCardId(scorecard id), submissionId(submission id) and metadata(related metadata) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise} updated review
 */
const patchReview = (config, reviewId, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'PATCH', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`, reqBody)
}

/**
 * Function to delete review by id.
 * @param {Object} config Configuration object
 * @param {String} reviewId the review id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const deleteReview = (config, reviewId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'DELETE', `${config.SUBMISSION_API_URL}/reviews/${reviewId}`)
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
