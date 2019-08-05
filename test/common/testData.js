/**
 * Test Data for Nock
 */
const _ = require('lodash')
const url = require('url')
const uuid = require('uuid/v4')
const config = require('../testConfig')
const userConfig = require('../userTestConfig')

const M2M_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RvcGNvZGVyLWRldi5hdXRoMC5jb20vIiwic3ViIjoiZW5qdzE4MTBlRHozWFR3U08yUm4yWTljUVRyc3BuM0JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbTJtLnRvcGNvZGVyLWRldi5jb20vIiwiaWF0IjoxNTUyMTE5NDQ4LCJleHAiOjU1NjIyMDU4NDgsImF6cCI6ImVuancxODEwZUR6M1hUd1NPMlJuMlk5Y1FUcnNwbjNCIiwic2NvcGUiOiJhbGw6cmV2aWV3IGFsbDpyZXZpZXdfc3VtbWF0aW9uIGFsbDpyZXZpZXdfdHlwZSBhbGw6c3VibWlzc2lvbiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.uJE97vctfpmzA0HrK9rcmrfWVHZNzERrI-qag3fm_lc'
const M2M_USER = {
  sub: 'enjw1810eDz3XTwSO2Rn2Y9cQTrspn3B@clients'
}
const API_VERSION = url.parse(_.get(config, 'SUBMISSION_API_URL')).pathname
const AUTH_PATH = url.parse(_.get(config, 'AUTH0_URL')).pathname
const AUTHN_PATH = url.parse(_.get(userConfig, 'TC_AUTHN_URL')).pathname
const AUTHN_ID_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IlRvbnlKIiwiZW1haWwiOiJhamVmdHNAdG9wY29kZXIuY29tIiwibmFtZSI6ImFqZWZ0c0B0b3Bjb2Rlci5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZjExODkyYzM4MTQwMzZjNjhjNzhmNGNlMGY2Yzg3NjE_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZhai5wbmciLCJyb2xlcyI6WyJ1c2VyIl0sImFwcF9tZXRhZGF0YSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJjbGllbnRJRCI6IkpGRG83SE1rZjBxMkNrVkZIb2p5M3pIV2FmemlwcmhUIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMjVUMTQ6MzY6NDkuNjQzWiIsInVzZXJfaWQiOiJhdXRoMHw4NTQ3ODk5IiwiaWRlbnRpdGllcyI6W3sidXNlcl9pZCI6Ijg1NDc4OTkiLCJwcm92aWRlciI6ImF1dGgwIiwiY29ubmVjdGlvbiI6IlRDLVVzZXItRGF0YWJhc2UiLCJpc1NvY2lhbCI6ZmFsc2V9XSwiY3JlYXRlZF9hdCI6IjIwMTctMDEtMDhUMTA6MzM6MzAuODQzWiIsImlzcyI6Imh0dHBzOi8vdG9wY29kZXItZGV2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw4NTQ3ODk5IiwiYXVkIjoiSkZEbzdITWtmMHEyQ2tWRkhvankzekhXYWZ6aXByaFQiLCJpYXQiOjE1NjQwNjU0MDksImV4cCI6MTkyNDA2NTQwOX0.RUk8nieOdRPj4dj-ZUhgFrdcAszU9EHW2fFlDul8RH0'
const AUTHN_REFRESH_TOKEN = 'kpHUTupKo7z6dRNdGpPOeIZtaCQg3Se0wit0vQWaABsdS'
const AUTHN_ACCESS_TOKEN = 'IU9HcR5jOrk7LmEzJe43ybE6m8AUZj4D'
const AUTHN_TOKEN_TYPE = 'bearer'
const AUTHZ_PATH = url.parse(_.get(userConfig, 'TC_AUTHZ_URL')).pathname
const AUTHZ_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIiwiQ29ubmVjdCBTdXBwb3J0IiwiYWRtaW5pc3RyYXRvciIsInRlc3RSb2xlIiwiYWFhIiwidG9ueV90ZXN0XzEiLCJDb25uZWN0IE1hbmFnZXIiLCJDb25uZWN0IEFkbWluIiwiY29waWxvdCIsIkNvbm5lY3QgQ29waWxvdCBNYW5hZ2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJUb255SiIsImV4cCI6MTU2NDA2NjkzOCwidXNlcklkIjoiODU0Nzg5OSIsImlhdCI6MTU2NDA2NjMzOCwiZW1haWwiOiJhamVmdHNAdG9wY29kZXIuY29tIiwianRpIjoiMTRkNTliZjctMWI5Ny00Y2ZjLWE3OWUtZmY3NjI2YjI2MzRjIn0.Krh9nQY7M-mpQzbjwKrD_eTSDF7ra8GY-kSY-rstcEg'
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
  AUTHN_PATH,
  AUTHN_REFRESH_TOKEN,
  AUTHN_ID_TOKEN,
  AUTHN_ACCESS_TOKEN,
  AUTHN_TOKEN_TYPE,
  AUTHZ_PATH,
  AUTHZ_TOKEN,
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
