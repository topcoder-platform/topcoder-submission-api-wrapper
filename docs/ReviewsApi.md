# Reviews Api

All URIs are relative to **SUBMISSION_API_URL** configuration variable.

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchReviews**](ReviewsApi.md#searchReviews) | **GET** /reviews | Search reviews.
[**headReviews**](ReviewsApi.md#headReviews) | **HEAD** /reviews | Same to search reviews, but only response status and headers information return.
[**createReview**](ReviewsApi.md#createReview) | **POST** /reviews | Create a review.
[**getReview**](ReviewsApi.md#getReview) | **GET** /reviews/{reviewId} | Get the review.
[**headReview**](ReviewsApi.md#headReview) | **HEAD** /reviews/{reviewId} | Same to get review, but only response status and headers information return.
[**updateReview**](ReviewsApi.md#updateReview) | **PUT** /reviews/{reviewId} | Fully update review.
[**patchReview**](ReviewsApi.md#patchReview) | **PATCH** /reviews/{reviewId} | Partially update review.
[**deleteReview**](ReviewsApi.md#deleteReview) | **DELETE** /reviews/{reviewId} | Delete the review.

<a name="searchReviews"></a>
# **searchReviews**
> searchReviews(reqQuery)

Search reviews. Link headers are sent back and they have rel set to prev, next, first, last and contain the relevant URL.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 10,
  typeId: '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b1'
}

// Promise model
submissionApiClient
  .searchReviews(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.searchReviews(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewsCriteria**](SearchReviewsCriteria.md)| the search reviews criteria

### Return type

Array of [**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReviews"></a>
# **headReviews**
> headReviews(reqQuery)

Same to search reviews, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 10,
  typeId: '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
}

// Promise model
submissionApiClient
  .headReviews(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headReviews(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewsCriteria**](SearchReviewsCriteria.md)| the search reviews criteria

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createReview"></a>
# **createReview**
> createReview(reqBody)

Create a review.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqBody = {
  score: 89,
  reviewerId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  submissionId: 'e328821a-6829-4214-b0d4-d7f7bf44dc98',
  scoreCardId: 30001850,
  typeId: '68c5a381-c8ab-48af-92a7-7a869a4ee6c3',
  metadata: { abc: 'def' }
}

// Promise model
submissionApiClient
  .createReview(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.createReview(reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getReview"></a>
# **getReview**
> getReview(reviewId)

Get the review by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .getReview(reviewId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.getReview(reviewId)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReview"></a>
# **headReview**
> headReview(reviewId)

Same to get review, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .headReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headReview(reviewId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateReview"></a>
# **updateReview**
> updateReview(reviewId, reqBody)

Fully update review.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  score: 100,
  reviewerId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  submissionId: 'e328821a-6829-4214-b0d4-d7f7bf44dc98',
  scoreCardId: 30001850,
  typeId: '68c5a381-c8ab-48af-92a7-7a869a4ee6c3',
  metadata: { abc: 'xyz' }
}

// Promise model
submissionApiClient
  .updateReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.updateReview(reviewId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchReview"></a>
# **patchReview**
> patchReview(reviewId, reqBody)

Partially update review.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  score: 99,
  reviewerId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  typeId: '68c5a381-c8ab-48af-92a7-7a869a4ee6c3',
  metadata: { abc: 'def' }
}

// Promise model
submissionApiClient
  .patchReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.patchReview(reviewId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteReview"></a>
# **deleteReview**
> deleteReview(reviewId)

Delete review by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .deleteReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.deleteReview(reviewId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
