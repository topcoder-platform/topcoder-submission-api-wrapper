# Topcoder Submission API Wrapper

Wrapper library for Topcoder Submission API

## How to use this Wrapper

1. Include the wrapper in package.json as follows

    ```bash
    "topcoder-submission-api-wrapper": "topcoder-platform/topcoder-submission-api-wrapper.git"
    ```

2. Create an instance of this wrapper with the configuration variables listed below

    ```javascript
    const submissionApi = require('topcoder-submission-api-wrapper')
    const submissionApiClient = submissionApi(_.pick(config,
          ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
            'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
            'AUTH0_PROXY_SERVER_URL']))
    ```

    **Configuration / Environment variables:**

    - AUTH0_URL - the auth0 url
    - AUTH0_AUDIENCE - the auth0 audience
    - TOKEN_CACHE_TIME - (optional) the token cache time
    - AUTH0_CLIENT_ID - the auth0 client id, used as credential
    - AUTH0_CLIENT_SECRET - the auth0 client secret, used as credential
    - AUTH0_PROXY_SERVER_URL - (optional) the auth0 proxy server url
    - SUBMISSION_API_URL - Topcoder V5 Submission API URL. E.g. `https://api.topcoder-dev.com/v5`
    - PAGE - the page number
    - PER_PAGE - the page size
    - MAX_PAGE_SIZE - the max number of page size

3. Every function in this wrapper will return a promise, Handling promises is at the caller end. Call the functions with appropriate arguments

E.g.

```bash
const reviewTypeId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

submissionApiClient
  .createReviewType({ name: 'test-for-create', isActive: true })
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

await submissionApiClient.deleteReviewType(reviewTypeId)

const result = await submissionApiClient.searchReviews({ page: 2, perPage: 30 })
```

Refer `index.js` for the list of available wrapper functions

## Documentation for wrapper methods

All URIs are relative to **SUBMISSION_API_URL** configuration variable.

### Review Types wrapper methods

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchReviewTypes**](docs/ReviewTypesApi.md#searchReviewTypes) | **GET** /reviewTypes | Search review types.
[**headReviewTypes**](docs/ReviewTypesApi.md#headReviewTypes) | **HEAD** /reviewTypes | Same to search review types, but only response status and headers information return.
[**createReviewType**](docs/ReviewTypesApi.md#createReviewType) | **POST** /reviewTypes | Create a review type.
[**getReviewType**](docs/ReviewTypesApi.md#getReviewType) | **GET** /reviewTypes/{reviewTypeId} | Get the review type.
[**headReviewType**](docs/ReviewTypesApi.md#headReviewType) | **HEAD** /reviewTypes/{reviewTypeId} | Same to get review type, but only response status and headers information return.
[**updateReviewType**](docs/ReviewTypesApi.md#updateReviewType) | **PUT** /reviewTypes/{reviewTypeId} | Fully update review type.
[**patchReviewType**](docs/ReviewTypesApi.md#patchReviewType) | **PATCH** /reviewTypes/{reviewTypeId} | Partially update review type.
[**deleteReviewType**](docs/ReviewTypesApi.md#deleteReviewType) | **DELETE** /reviewTypes/{reviewTypeId} | Delete the review type.

### Reviews wrapper methods

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchReviews**](docs/ReviewsApi.md#searchReviews) | **GET** /reviews | Search reviews.
[**headReviews**](docs/ReviewsApi.md#headReviews) | **HEAD** /reviews | Same to search reviews, but only response status and headers information return.
[**createReview**](docs/ReviewsApi.md#createReview) | **POST** /reviews | Create a review.
[**getReview**](docs/ReviewsApi.md#getReview) | **GET** /reviews/{reviewId} | Get the review.
[**headReview**](docs/ReviewsApi.md#headReview) | **HEAD** /reviews/{reviewId} | Same to get review, but only response status and headers information return.
[**updateReview**](docs/ReviewsApi.md#updateReview) | **PUT** /reviews/{reviewId} | Fully update review.
[**patchReview**](docs/ReviewsApi.md#patchReview) | **PATCH** /reviews/{reviewId} | Partially update review.
[**deleteReview**](docs/ReviewsApi.md#deleteReview) | **DELETE** /reviews/{reviewId} | Delete the review.

### Review Summations wrapper methods

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchReviewSummations**](docs/ReviewSummationsApi.md#searchReviewSummations) | **GET** /reviewSummations | Search review summations.
[**headReviewSummations**](docs/ReviewSummationsApi.md#headReviewSummations) | **HEAD** /reviewSummations | Same to search review summations, but only response status and headers information return.
[**createReviewSummation**](docs/ReviewSummationsApi.md#createReviewSummation) | **POST** /reviewSummations | Create a review summation.
[**getReviewSummation**](docs/ReviewSummationsApi.md#getReviewSummation) | **GET** /reviewSummations/{reviewSummationId} | Get the review summation.
[**headReviewSummation**](docs/ReviewSummationsApi.md#headReviewSummation) | **HEAD** /reviewSummations/{reviewSummationId} | Same to get review summation, but only response status and headers information return.
[**updateReviewSummation**](docs/ReviewSummationsApi.md#updateReviewSummation) | **PUT** /reviewSummations/{reviewSummationId} | Fully update review summation.
[**patchReviewSummation**](docs/ReviewSummationsApi.md#patchReviewSummation) | **PATCH** /reviewSummations/{reviewSummationId} | Partially update review summation.
[**deleteReviewSummation**](docs/ReviewSummationsApi.md#deleteReviewSummation) | **DELETE** /reviewSummations/{reviewSummationId} | Delete the review summation.

### Submissions wrapper methods

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchSubmissions**](docs/SubmissionsApi.md#searchSubmissions) | **GET** /submissions | Search submissions.
[**headSubmissions**](docs/SubmissionsApi.md#headSubmissions) | **HEAD** /submissions | Same to search submissions, but only response status and headers information return.
[**createSubmission**](docs/SubmissionsApi.md#createSubmission) | **POST** /submissions | Create a submission.
[**getSubmission**](docs/SubmissionsApi.md#getSubmission) | **GET** /submissions/{submissionId} | Get the submission.
[**headSubmission**](docs/SubmissionsApi.md#headSubmission) | **HEAD** /submissions/{submissionId} | Same to get submission, but only response status and headers information return.
[**updateSubmission**](docs/SubmissionsApi.md#updateSubmission) | **PUT** /submissions/{submissionId} | Fully update submission.
[**patchSubmission**](docs/SubmissionsApi.md#patchSubmission) | **PATCH** /submissions/{submissionId} | Partially update submission.
[**deleteSubmission**](docs/SubmissionsApi.md#deleteSubmission) | **DELETE** /submissions/{submissionId} | Delete the submission.
[**downloadSubmission**](docs/SubmissionsApi.md#downloadSubmission) | **GET** /submissions/{submissionId}/download | Download the submission.
[**createArtifact**](docs/SubmissionsApi.md#createArtifact) | **POST** /submissions/{submissionId}/artifacts | Create artifact for submission.
[**listArtifacts**](docs/SubmissionsApi.md#listArtifacts) | **GET** /submissions/{submissionId}/artifacts | List artifacts of specified submission.
[**downloadArtifact**](docs/SubmissionsApi.md#downloadArtifact) | **GET** /submissions/{submissionId}/artifacts/{artifactId}/download | Download artifact

## Authorization

The wrapper internally generates a **JWT token using Auth0 credentials** and pass it in the `Authorization` header.

## Running tests

Following environment variables need to be set up before running the tests

```bash
- TEST_AUTH0_URL
- TEST_AUTH0_AUDIENCE
- TEST_AUTH0_CLIENT_ID
- TEST_AUTH0_CLIENT_SECRET
- TEST_SUBMISSION_API_URL
```

Refer to Step # 2 in [this section](#how-to-use-this-wrapper) to learn more about the configuration variables.

To run the tests alone, execute the command

```bash
npm run test
```

To run tests with coverage report, execute the command

```bash
npm run cov
```
