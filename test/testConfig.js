/*
 * Config for tests.
 */

const config = {
  AUTH0_CLIENT_ID: process.env.TEST_AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.TEST_AUTH0_CLIENT_SECRET,
  AUTH0_URL: process.env.TEST_AUTH0_URL,
  AUTH0_AUDIENCE: process.env.TEST_AUTH0_AUDIENCE,
  SUBMISSION_API_URL: process.env.TEST_SUBMISSION_API_URL,
  PAGE: process.env.PAGE || 1,
  PER_PAGE: process.env.PER_PAGE || 20,
  MAX_PAGE_SIZE: process.env.MAX_PAGE_SIZE || 100
}

module.exports = config
