/**
 * Test Data for Nock
 */
const _ = require('lodash')
const url = require('url')
const uuid = require('uuid/v4')
const config = require('../testConfig')

const M2M_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcGNvZGVyLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZW5qdzE4MTBlRHozWFR3U08yUm4yWTljUVRyc3BuM0JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbTJtLnRvcGNvZGVyLWRldi5jb20vIiwiaWF0IjoxNTUyMTE5NDQ4LCJleHAiOjU1NjIyMDU4NDgsImF6cCI6ImVuancxODEwZUR6M1hUd1NPMlJuMlk5Y1FUcnNwbjNCIiwic2NvcGUiOiJhbGw6cmV2aWV3IGFsbDpyZXZpZXdfc3VtbWF0aW9uIGFsbDpyZXZpZXdfdHlwZSBhbGw6c3VibWlzc2lvbiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.uJE97vctfpmzA0HrK9rcmrfWVHZNzERrI-qag3fm_lc'
const M2M_USER = {
  sub: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B@clients'
}
const API_VERSION = url.parse(_.get(config, 'SUBMISSION_API_URL')).pathname
const AUTH_PATH = url.parse(_.get(config, 'AUTH0_URL')).pathname
const REVIEW_TYPE_ID = uuid()
const REVIEW_ID = uuid()
const REVIEW_SUMMATION_ID = uuid()
const SUBMISSION_ID1 = '39454e72-c4ab-4a8f-a1e2-c46a6972e58e'
const SUBMISSION_ID2 = 'b306b6bb-f188-498c-b898-6096694bce98'
const ARTIFACT_ID = 'c56a4180-65aa-42ec-a945-5fd21dec0503'
const SUCCESS_STATUS = 200
const CREATE_SUCCESS_STATUS = 200
const DELETE_SUCCESS_STATUS = 204
const JOI_FAIL_STATUS = 400
const NOT_FOUND_STATUS = 404
const NOT_FOUND_ID = 'e0a789ea-6144-4266-bfae-872f9a26e749'
const SUMMATION_NOTFOUND_ID = 'ace32387-8b33-47f1-8b01-6578b817a188'
const NotFoundError = {
  ReviewType: `Review type with ID = ${NOT_FOUND_ID} is not found`,
  Review: `Review with ID = ${NOT_FOUND_ID} is not found`,
  ReviewSummation: `Review summation with ID = ${SUMMATION_NOTFOUND_ID} is not found`,
  Submission: `Submission with ID = ${NOT_FOUND_ID} is not found`,
  Submission2: `Submission with ID = ${NOT_FOUND_ID} does not exist`,
  Artifact: `Artifact ${NOT_FOUND_ID} doesn't exist for ${SUBMISSION_ID1}`
}
module.exports = {
  M2M_TOKEN,
  M2M_USER,
  API_VERSION,
  AUTH_PATH,
  REVIEW_TYPE_ID,
  REVIEW_ID,
  REVIEW_SUMMATION_ID,
  SUBMISSION_ID1,
  SUBMISSION_ID2,
  ARTIFACT_ID,
  SUCCESS_STATUS,
  CREATE_SUCCESS_STATUS,
  DELETE_SUCCESS_STATUS,
  JOI_FAIL_STATUS,
  NOT_FOUND_STATUS,
  NOT_FOUND_ID,
  SUMMATION_NOTFOUND_ID,
  NotFoundError
}
