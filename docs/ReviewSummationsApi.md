# Review Summations Api

All URIs are relative to **SUBMISSION_API_URL** configuration variable.

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchReviewSummations**](ReviewSummationsApi.md#searchReviewSummations) | **GET** /reviewSummations | Search review summations.
[**headReviewSummations**](ReviewSummationsApi.md#headReviewSummations) | **HEAD** /reviewSummations | Same to search review summations, but only response status and headers information return.
[**createReviewSummation**](ReviewSummationsApi.md#createReviewSummation) | **POST** /reviewSummations | Create a review summation.
[**getReviewSummation**](ReviewSummationsApi.md#getReviewSummation) | **GET** /reviewSummations/{reviewSummationId} | Get the review summation.
[**headReviewSummation**](ReviewSummationsApi.md#headReviewSummation) | **HEAD** /reviewSummations/{reviewSummationId} | Same to get review summation, but only response status and headers information return.
[**updateReviewSummation**](ReviewSummationsApi.md#updateReviewSummation) | **PUT** /reviewSummations/{reviewSummationId} | Fully update review summation.
[**patchReviewSummation**](ReviewSummationsApi.md#patchReviewSummation) | **PATCH** /reviewSummations/{reviewSummationId} | Partially update review summation.
[**deleteReviewSummation**](ReviewSummationsApi.md#deleteReviewSummation) | **DELETE** /reviewSummations/{reviewSummationId} | Delete the review summation.

<a name="searchReviewSummations"></a>
# **searchReviewSummations**
> searchReviewSummations(reqQuery)

Search review summations. Link headers are sent back and they have rel set to prev, next, first, last and contain the relevant URL.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 3,
  submissionId: 'a12a4180-65aa-42ec-a945-5fd21dec1567',
  aggregateScore: 90.5,
  scoreCardId: 30001850,
  isPassing: true
}

// Promise model
submissionApiClient
  .searchReviewSummations(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.searchReviewSummations(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewSummationsCriteria**](SearchReviewSummationsCriteria.md) | the search review summations criteria 

### Return type

Array of [**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReviewSummations"></a>

# **headReviewSummations**
> headReviewSummations(reqQuery)

Same to search review summations, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 3,
  submissionId: 'a12a4180-65aa-42ec-a945-5fd21dec1567',
  aggregateScore: 90.5,
  scoreCardId: 30001850,
  isPassing: true
}

// Promise model
submissionApiClient
  .headReviewSummations(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headReviewSummations(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewSummationsCriteria**](SearchReviewSummationsCriteria.md) | the search reviews criteria

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createReviewSummation"></a>

# **createReviewSummation**
> createReviewSummation(reqBody)

Create a review summation.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqBody = {
  submissionId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  aggregateScore: 87.5,
  scoreCardId: 30001850,
  isPassing: true,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiClient
  .createReviewSummation(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.createReviewSummation(reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data 

### Return type

[**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getReviewSummation"></a>

# **getReviewSummation**
> getReviewSummation(reviewSummationId)

Get the review summation by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .getReviewSummation(reviewSummationId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.getReviewSummation(reviewSummationId)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id 

### Return type

[**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headReviewSummation"></a>

# **headReviewSummation**
> headReviewSummation(reviewSummationId)

Same to get review summation, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .headReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.headReviewSummation(reviewId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id 

### Return type

[**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateReviewSummation"></a>

# **updateReviewSummation**
> updateReviewSummation(reviewSummationId, reqBody)

Fully update review summation.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  submissionId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  aggregateScore: 73.5,
  scoreCardId: 30002853,
  isPassing: false,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiClient
  .updateReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.updateReviewSummation(reviewSummationId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id 
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data 

### Return type

[**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchReviewSummation"></a>

# **patchReviewSummation**
> patchReviewSummation(reviewSummationId, reqBody)

Partially update review summation.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  aggregateScore: 99,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiClient
  .patchReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.patchReviewSummation(reviewSummationId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id 
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data 

### Return type

[**ReviewSummation**](ReviewSummation.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteReviewSummation"></a>

# **deleteReviewSummation**
> deleteReviewSummation(reviewSummationId)

Delete review summation by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .deleteReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.deleteReviewSummation(reviewSummationId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
