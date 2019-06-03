/*
 * Wrapper function for Review Type related end points
 */

const helper = require('./common/helper')

/**
 * Function to search review types with pagination and filter(name and isActive)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, include page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), name(The name filter for review types.)
 *   and isActive(The active boolean flag filter for review types.)
 * @returns {Promise}
 */
const searchReviewTypes = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewTypes`, reqQuery)
  return helper.reqToV5API(config, 'GET', url)
}

/**
 * Function to HEAD the review types with pagination and filter(name and isActive)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, include page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), name(The name filter for review types.)
 *   and isActive(The active boolean flag filter for review types.)
 * @returns {Promise}
 */
const headReviewTypes = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewTypes`, reqQuery)
  return helper.reqToV5API(config, 'HEAD', url)
}

/**
 * Function to create the review type.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @returns {Promise}
 */
const createReviewType = async (config, reqBody) => {
  return helper.reqToV5API(config, 'POST', `${config.SUBMISSION_API_URL}/reviewTypes`, reqBody)
}

/**
 * Function to get the review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @returns {Promise}
 */
const getReviewType = async (config, reviewTypeId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
}

/**
 * Function to HEAD review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @returns {Promise}
 */
const headReviewType = async (config, reviewTypeId) => {
  return helper.reqToV5API(config, 'HEAD', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
}

/**
 * Function to fully update review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @returns {Promise}
 */
const updateReviewType = async (config, reviewTypeId, reqBody) => {
  return helper.reqToV5API(config, 'PUT', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`, reqBody)
}

/**
 * Function to partially update review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @returns {Promise}
 */
const patchReviewType = async (config, reviewTypeId, reqBody) => {
  return helper.reqToV5API(config, 'PATCH', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`, reqBody)
}

/**
 * Function to delete review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @returns {Promise}
 */
const deleteReviewType = async (config, reviewTypeId) => {
  return helper.reqToV5API(config, 'DELETE', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
}

module.exports = {
  searchReviewTypes,
  headReviewTypes,
  createReviewType,
  getReviewType,
  headReviewType,
  updateReviewType,
  patchReviewType,
  deleteReviewType
}
