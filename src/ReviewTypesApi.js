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
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const searchReviewTypes = (config, reqQuery, jwt = null) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewTypes`, reqQuery)
  return helper.reqToV5API(config, jwt, 'GET', url)
}

/**
 * Function to HEAD the review types with pagination and filter(name and isActive)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, include page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), name(The name filter for review types.)
 *   and isActive(The active boolean flag filter for review types.)
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const headReviewTypes = (config, reqQuery, jwt = null) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/reviewTypes`, reqQuery)
  return helper.reqToV5API(config, jwt, 'HEAD', url)
}

/**
 * Function to create the review type.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const createReviewType = (config, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'POST', `${config.SUBMISSION_API_URL}/reviewTypes`, reqBody)
}

/**
 * Function to get the review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const getReviewType = (config, reviewTypeId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'GET', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
}

/**
 * Function to HEAD review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const headReviewType = (config, reviewTypeId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'HEAD', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
}

/**
 * Function to fully update review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const updateReviewType = (config, reviewTypeId, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'PUT', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`, reqBody)
}

/**
 * Function to partially update review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {Object} reqBody the request body object, include name(review type name) and isActive(active flag) properties
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const patchReviewType = (config, reviewTypeId, reqBody, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'PATCH', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`, reqBody)
}

/**
 * Function to delete review type by id.
 * @param {Object} config Configuration object
 * @param {String} reviewTypeId the review type id
 * @param {String} jwt The JWT to authenticate the request
 * @returns {Promise}
 */
const deleteReviewType = (config, reviewTypeId, jwt = null) => {
  return helper.reqToV5API(config, jwt, 'DELETE', `${config.SUBMISSION_API_URL}/reviewTypes/${reviewTypeId}`)
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
