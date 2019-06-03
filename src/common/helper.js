const m2mAuth = require('tc-core-library-js').auth.m2m
const request = require('superagent')
const _ = require('lodash')
let m2m = null

/*
 * Function to get M2M token
 * @returns {Promise}
 */
const getM2Mtoken = async (config) => {
  if (_.isNull(m2m)) {
    m2m = m2mAuth(_.pick(config, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME', 'AUTH0_PROXY_SERVER_URL']))
  }
  return m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
}

/**
 * Function to send request to V5 API
 * @param {Object} config Configuration object
 * @param{String} reqType Type of the request POST / PATCH / PUT / GET / DELETE / HEAD
 * @param(String) path Complete path of the review types API URL
 * @param{Object} reqBody Body of the request
 * @returns {Promise}
 */
const reqToV5API = async (config, reqType, path, reqBody) => {
  return getM2Mtoken(config).then((token) => {
    // Based on request type perform necessary action
    switch (reqType) {
      case 'GET':
        return request
          .get(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      case 'HEAD':
        return request
          .head(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      case 'POST':
        return request
          .post(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .send(reqBody)
      case 'PUT':
        return request
          .put(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .send(reqBody)
      case 'PATCH':
        return request
          .patch(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .send(reqBody)
      case 'DELETE':
        return request
          .delete(path)
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
      default:
        throw new Error('Invalid request type')
    }
  })
}

/*
 * Function to build URL with query parameters
 * @param {String} url Bus API URL
 * @param {Object} params Query parameters
 * @returns {String} URL with query parameters
 */
const buildURLwithParams = (url, params) => {
  let queryParams = '?'
  if (params) {
    for (let key in params) {
      queryParams += `${key}=${params[key]}&`
    }
  }
  return url + queryParams
}

module.exports = {
  reqToV5API,
  buildURLwithParams
}
