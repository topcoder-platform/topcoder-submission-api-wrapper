/*
 * Config for tests.
 */

const config = {
  JWT: process.env.TEST_JWT,
  USERNAME: process.env.TEST_USERNAME,
  PASSWORD: process.env.TEST_PASSWORD,
  TC_AUTHN_URL: process.env.TEST_TC_AUTHN_URL,
  TC_AUTHZ_URL: process.env.TEST_TC_AUTHZ_URL,
  TC_CLIENT_ID: process.env.TEST_TC_CLIENT_ID,
  TC_CLIENT_V2CONNECTION: process.env.TEST_TC_CLIENT_V2CONNECTION,
  SUBMISSION_API_URL: process.env.TEST_SUBMISSION_API_URL,
  PAGE: process.env.PAGE || 1,
  PER_PAGE: process.env.PER_PAGE || 20,
  MAX_PAGE_SIZE: process.env.MAX_PAGE_SIZE || 100
}

module.exports = config
