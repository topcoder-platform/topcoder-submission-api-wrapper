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
> searchReviews(reqQuery[, jwt])

Search reviews. Link headers are sent back and they have rel set to prev, next, first, last and contain the relevant URL.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config,
      ['SUBMISSION_API_URL']))

const reqQuery = {
  page: 1,
  perPage: 10,
  typeId: '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b1'
}

// Promise model
submissionApiM2MClient
  .searchReviews(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .searchReviews(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))


submissionApiJwtMethodArgClient
  .searchReviews(reqQuery, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.searchReviews(reqQuery)

await submissionApiUserCredentialsClient.searchReviews(reqQuery)

await submissionApiJwtMethodArgClient.searchReviews(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewsCriteria**](SearchReviewsCriteria.md)| the search reviews criteria
 **jwt**      | String | the optional json web token

### Return type

Array of [**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReviews"></a>
# **headReviews**
> headReviews(reqQuery[, jwt])

Same to search reviews, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqQuery = {
  page: 1,
  perPage: 10,
  typeId: '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
}

// Promise model
submissionApiM2MClient
  .headReviews(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headReviews(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headReviews(reqQuery, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.headReviews(reqQuery)

await submissionApiUserCredentialsClient.headReviews(reqQuery)

await submissionApiJwtMethodArgClient.headReviews(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewsCriteria**](SearchReviewsCriteria.md)| the search reviews criteria
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createReview"></a>
# **createReview**
> createReview(reqBody[, jwt])

Create a review.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqBody = {
  score: 89,
  reviewerId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  submissionId: 'e328821a-6829-4214-b0d4-d7f7bf44dc98',
  scoreCardId: 30001850,
  typeId: '68c5a381-c8ab-48af-92a7-7a869a4ee6c3',
  metadata: { abc: 'def' }
}

// Promise model
submissionApiM2MClient
  .createReview(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .createReview(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .createReview(reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.createReview(reqBody)

await submissionApiUserCredentialsClient.createReview(reqBody)

await submissionApiJwtMethodArgClient.createReview(reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data
 **jwt**      | String | the optional json web token

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getReview"></a>
# **getReview**
> getReview(reviewId[, jwt])

Get the review by id.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .getReview(reviewId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .getReview(reviewId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .getReview(reviewId, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.getReview(reviewId)

await submissionApiUserCredentialsClient.getReview(reviewId)

await submissionApiJwtMethodArgClient.getReview(reviewId, config.JWT)

```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **jwt**      | String | the optional json web token

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReview"></a>
# **headReview**
> headReview(reviewId[, jwt])

Same to get review, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .headReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headReview(reviewId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.headReview(reviewId)

await submissionApiUserCredentialsClient.headReview(reviewId)

await submissionApiJwtMethodArgClient.headReview(reviewId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateReview"></a>
# **updateReview**
> updateReview(reviewId, reqBody[, jwt])

Fully update review.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArg = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

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
submissionApiM2MClient
  .updateReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .updateReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .updateReview(reviewId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.updateReview(reviewId, reqBody)

await submissionApiUserCredentialsClient.updateReview(reviewId, reqBody)

await submissionApiJwtMethodArgClient.updateReview(reviewId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data
 **jwt**      | String | the optional json web token

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchReview"></a>
# **patchReview**
> patchReview(reviewId, reqBody[, jwt])

Partially update review.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArg = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  score: 99,
  reviewerId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  typeId: '68c5a381-c8ab-48af-92a7-7a869a4ee6c3',
  metadata: { abc: 'def' }
}

// Promise model
submissionApiM2MClient
  .patchReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .patchReview(reviewId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .patchReview(reviewId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.patchReview(reviewId, reqBody)

await submissionApiUserCredentialsClient.patchReview(reviewId, reqBody)

await submissionApiJwtMethodArgClient.patchReview(reviewId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **reqBody** | [**ReviewData**](ReviewData.md)| the review data
 **jwt**      | String | the optional json web token

### Return type

[**Review**](Review.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteReview"></a>
# **deleteReview**
> deleteReview(reviewId[, jwt])

Delete review by id.

### Example
```javascript
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArg = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .deleteReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .deleteReview(reviewId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .deleteReview(reviewId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.deleteReview(reviewId)

await submissionApiUserCredentialsClient.deleteReview(reviewId)

await submissionApiJwtMethodArgClient.deleteReview(reviewId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewId** | String | the review id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
