/*
 * Index file
 */

const joi = require('@hapi/joi')

module.exports = (config) => {
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

  // Validate the arguments
  const result = joi.validate(config, schema)

  if (result.error) {
    throw new Error(result.error.details[0].message)
  }

  // Export functions
  return {
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
    }
  }
}
