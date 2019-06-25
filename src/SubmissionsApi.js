/*
 * Wrapper function for Submission related endpoints
 */

const helper = require('./common/helper')

/**
 * Function to search submissions with pagination and filter
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), type(The submission type filter), url(The submission url filter),
 *   memberId(The member id filter), challengeId(The challenge id filter), legacySubmissionId(The legacy submission id filter),
 *   legacyUploadId(The legacy upload id filter), submissionPhaseId(The submission phase id filter), review.score(The review score filter),
 *   review.typeId(The review type id filter), review.reviewerId(The reviewer id filter), review.scoreCardId(The review score card id filter),
 *   review.submissionId(The review submission id filter), reviewSummation.scoreCardId(review summation score card id filter),
 *   reviewSummation.submissionId(The review summation submission id filter), reviewSummation.aggregateScore(review summation aggregate score filter),
 *   reviewSummation.isPassing(The review summation is passing flag filter)
 * @returns {Promise} searched submissions
 */
const searchSubmissions = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/submissions`, reqQuery)
  return helper.reqToV5API(config, 'GET', url)
}

/**
 * Function to HEAD the submissions with pagination and filter
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), type(The submission type filter), url(The submission url filter),
 *   memberId(The member id filter), challengeId(The challenge id filter), legacySubmissionId(The legacy submission id filter),
 *   legacyUploadId(The legacy upload id filter), submissionPhaseId(The submission phase id filter), review.score(The review score filter),
 *   review.typeId(The review type id filter), review.reviewerId(The reviewer id filter), review.scoreCardId(The review score card id filter),
 *   review.submissionId(The review submission id filter), reviewSummation.scoreCardId(review summation score card id filter),
 *   reviewSummation.submissionId(The review summation submission id filter), reviewSummation.aggregateScore(review summation aggregate score filter),
 *   reviewSummation.isPassing(The review summation is passing flag filter)
 * @returns {Promise} searched submissions head
 */
const headSubmissions = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/submissions`, reqQuery)
  return helper.reqToV5API(config, 'HEAD', url)
}

/**
 * Function to create the submission.
 * @param {Object} config Configuration object
 * @param {Object} reqFormData the request multiple part form data object,including type(the submission type),
 *   submission(a File object, submission.name indicate the file name, submission.data is a Buffer contain the file data),
 *   fileType(the file type), url(the submission url), memberId(the submitter id), challengeId(the challenge id),
 *   legacySubmissionId(the legacy submission id), legacyUploadId(the legacy upload id),
 *   submissionPhaseId(the submission phase id)
 * @returns {Promise} created submission
 */
const createSubmission = async (config, reqFormData) => {
  return helper.reqToV5APIWithFile(config, `${config.SUBMISSION_API_URL}/submissions`, reqFormData, 'submission')
}

/**
 * Function to get the submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @returns {Promise} the submission with given id
 */
const getSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

/**
 * Function to HEAD submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @returns {Promise}
 */
const headSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'HEAD', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

/**
 * Function to fully update submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @param {Object} reqBody the request body object,including type(the submission type),
 *   url(the submission url), memberId(the submitter id), challengeId(the challenge id),
 *   legacySubmissionId(the legacy submission id), legacyUploadId(the legacy upload id),
 *   submissionPhaseId(the submission phase id)
 * @returns {Promise} updated submission
 */
const updateSubmission = async (config, submissionId, reqBody) => {
  return helper.reqToV5API(config, 'PUT', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`, reqBody)
}

/**
 * Function to partially update submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @param {Object} reqBody the request body object,including type(the submission type),
 *   url(the submission url), memberId(the submitter id), challengeId(the challenge id),
 *   legacySubmissionId(the legacy submission id), legacyUploadId(the legacy upload id),
 *   submissionPhaseId(the submission phase id)
 * @returns {Promise} updated submission
 */
const patchSubmission = async (config, submissionId, reqBody) => {
  return helper.reqToV5API(config, 'PATCH', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`, reqBody)
}

/**
 * Function to delete submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @returns {Promise}
 */
const deleteSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'DELETE', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

/**
 * Function to download submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @returns {Promise} the submission file content
 */
const downloadSubmission = async (config, submissionId) => {
  return helper.reqToV5APIDownload(config, `${config.SUBMISSION_API_URL}/submissions/${submissionId}/download`)
}

/**
 * Function to create artifact for submission with given id
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @param {Object} reqFormData the request multiple part form data object,including typeId(the artifact type id),
 *   artifact(a File object, artifact.name indicate the file name, submission.data is a Buffer contain the file data)
 * @returns {Promise} the created artifact
 */
const createArtifact = async (config, submissionId, reqFormData) => {
  return helper.reqToV5APIWithFile(config, `${config.SUBMISSION_API_URL}/submissions/${submissionId}/artifacts`, reqFormData, 'artifact')
}

/**
 * Function to list artifacts of specified submission
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @returns {Promise} the artifacts of submission
 */
const listArtifacts = async (config, submissionId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/submissions/${submissionId}/artifacts`)
}

/**
 * Function to download artifact using submission id and artifact id
 * @param {Object} config Configuration object
 * @param {String} submissionId the submission id
 * @param {String} artifactId the artifact id
 * @returns {Promise} the artifact file content
 */
const downloadArtifact = async (config, submissionId, artifactId) => {
  return helper.reqToV5APIDownload(config, `${config.SUBMISSION_API_URL}/submissions/${submissionId}/artifacts/${artifactId}/download`)
}

module.exports = {
  searchSubmissions,
  headSubmissions,
  createSubmission,
  getSubmission,
  headSubmission,
  updateSubmission,
  patchSubmission,
  deleteSubmission,
  downloadSubmission,
  createArtifact,
  listArtifacts,
  downloadArtifact
}
