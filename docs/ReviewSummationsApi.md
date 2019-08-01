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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqQuery = {
  page: 1,
  perPage: 3,
  submissionId: 'a12a4180-65aa-42ec-a945-5fd21dec1567',
  aggregateScore: 90.5,
  scoreCardId: 30001850,
  isPassing: true
}

// Promise model
submissionApiM2MClient
  .searchReviewSummations(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .searchReviewSummations(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .searchReviewSummations(reqQuery, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.searchReviewSummations(reqQuery)

await submissionApiUserCredentialsClient.searchReviewSummations(reqQuery)

await submissionApiJwtMethodArgClient.searchReviewSummations(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewSummationsCriteria**](SearchReviewSummationsCriteria.md) | the search review summations criteria
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqQuery = {
  page: 1,
  perPage: 3,
  submissionId: 'a12a4180-65aa-42ec-a945-5fd21dec1567',
  aggregateScore: 90.5,
  scoreCardId: 30001850,
  isPassing: true
}

// Promise model
submissionApiM2MClient
  .headReviewSummations(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headReviewSummations(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headReviewSummations(reqQuery, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.headReviewSummations(reqQuery)

await submissionApiUserCredentialsClient.headReviewSummations(reqQuery)

await submissionApiJwtMethodArgClient.headReviewSummations(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchReviewSummationsCriteria**](SearchReviewSummationsCriteria.md) | the search reviews criteria
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqBody = {
  submissionId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  aggregateScore: 87.5,
  scoreCardId: 30001850,
  isPassing: true,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiM2MClient
  .createReviewSummation(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .createReviewSummation(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .createReviewSummation(reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.createReviewSummation(reqBody)

await submissionApiUserCredentialsClient.createReviewSummation(reqBody)

await submissionApiJwtMethodArgClient.createReviewSummation(reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .getReviewSummation(reviewSummationId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .getReviewSummation(reviewSummationId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .getReviewSummation(reviewSummationId, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.getReviewSummation(reviewSummationId)

await submissionApiUserCredentialsClient.getReviewSummation(reviewSummationId)

await submissionApiJwtMethodArgClient.getReviewSummation(reviewSummationId, config.JWT)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .headReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headReviewSummation(reviewSummationId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.headReviewSummation(reviewId)

await submissionApiUserCredentialsClient.headReviewSummation(reviewId)

await submissionApiJwtMethodArgClient.headReviewSummation(reviewId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  submissionId: 'a3d891ef-4002-48fc-ae35-e8623e6bd4b9',
  aggregateScore: 73.5,
  scoreCardId: 30002853,
  isPassing: false,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiM2MClient
  .updateReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .updateReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .updateReviewSummation(reviewSummationId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.updateReviewSummation(reviewSummationId, reqBody)

await submissionApiUserCredentialsClient.updateReviewSummation(reviewSummationId, reqBody)

await submissionApiJwtMethodArgClient.updateReviewSummation(reviewSummationId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  aggregateScore: 99,
  metadata: { abc: 'def' }
}

// Promise model
submissionApiM2MClient
  .patchReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .patchReviewSummation(reviewSummationId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .patchReviewSummation(reviewSummationId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.patchReviewSummation(reviewSummationId, reqBody)

await submissionApiUserCredentialsClient.patchReviewSummation(reviewSummationId, reqBody)

await submissionApiJwtMethodArgClient.patchReviewSummation(reviewSummationId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id
 **reqBody** | [**ReviewSummationData**](ReviewSummationData.md) | the review summation data
 **jwt**      | String | the optional json web token

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
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reviewSummationId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .deleteReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .deleteReviewSummation(reviewSummationId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .deleteReviewSummation(reviewSummationId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiM2MClient.deleteReviewSummation(reviewSummationId)

await submissionApiUserCredentialsClient.deleteReviewSummation(reviewSummationId)

await submissionApiJwtMethodArgClient.deleteReviewSummation(reviewSummationId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reviewSummationId** | String | the review summation id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
