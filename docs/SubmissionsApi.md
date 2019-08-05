# Submissions Api

All URIs are relative to **SUBMISSION_API_URL** configuration variable.

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchSubmissions**](SubmissionsApi.md#searchSubmissions) | **GET** /submissions | Search submissions.
[**headSubmissions**](SubmissionsApi.md#headSubmissions) | **HEAD** /submissions | Same to search submissions, but only response status and headers information return.
[**createSubmission**](SubmissionsApi.md#createSubmission) | **POST** /submissions | Create a submission.
[**getSubmission**](SubmissionsApi.md#getSubmission) | **GET** /submissions/{submissionId} | Get the submission.
[**headSubmission**](SubmissionsApi.md#headSubmission) | **HEAD** /submissions/{submissionId} | Same to get submission, but only response status and headers information return.
[**updateSubmission**](SubmissionsApi.md#updateSubmission) | **PUT** /submissions/{submissionId} | Fully update submission.
[**patchSubmission**](SubmissionsApi.md#patchSubmission) | **PATCH** /submissions/{submissionId} | Partially update submission.
[**deleteSubmission**](SubmissionsApi.md#deleteSubmission) | **DELETE** /submissions/{submissionId} | Delete the submission.
[**downloadSubmission**](SubmissionsApi.md#downloadSubmission) | **GET** /submissions/{submissionId}/download | Download the submission.
[**createArtifact**](SubmissionsApi.md#createArtifact) | **POST** /submissions/{submissionId}/artifacts | Create artifact for submission.
[**listArtifacts**](SubmissionsApi.md#listArtifacts) | **GET** /submissions/{submissionId}/artifacts | List artifacts of specified submission.
[**downloadArtifact**](SubmissionsApi.md#downloadArtifact) | **GET** /submissions/{submissionId}/artifacts/{artifactId}/download | Download artifact

<a name="searchSubmissions"></a>
# **searchSubmissions**
> searchSubmissions(reqQuery)

Search submissions. Link headers are sent back and they have rel set to prev, next, first, last and contain the relevant URL.

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
  perPage: 10,
  challengeId: 30054692
}

// Promise model
submissionApiM2MClient
  .searchSubmissions(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .searchSubmissions(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .searchSubmissions(reqQuery, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.searchSubmissions(reqQuery)

await submissionApiUserCredentialsClient.searchSubmissions(reqQuery)

await submissionApiJwtMethodArgClient.searchSubmissions(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md)| the search submissions criteria
 **jwt**      | String | the optional json web token

### Return type

Array of [**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headSubmissions"></a>
# **headSubmissions**
> headSubmissions(reqQuery)

Same to search submissions, but only response status and headers information return.

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
  perPage: 10,
  challengeId: 30054692
}

// Promise model
submissionApiM2MClient
  .headSubmissions(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headSubmissions(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headSubmissions(reqQuery, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.headSubmissions(reqQuery)

await submissionApiUserCredentialsClient.headSubmissions(reqQuery)

await submissionApiJwtMethodArgClient.headSubmissions(reqQuery, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md)| the search submissions criteria
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createSubmission"></a>
# **createSubmission**
> createSubmission(reqFormData)

Create a submission.

### Example
```javascript
const path = require('path')
const fs = require('fs')
const fileData = fs.readFileSync(path.resolve(__dirname, './data/fileToUpload.zip'))
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const reqFormData1 = {
  submission: {
    name: 'fileToUpload.zip',
    data: fileData // a Buffer contain file content
  },
  type: 'Contest Submission',
  memberId: 40493050,
  challengeId: 30054692
}

const reqFormData2 = {
  url: 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip',
  type: 'Contest Submission',
  memberId: 40493050,
  challengeId: 30054692
}

// Promise model
submissionApiM2MClient
  .createSubmission(reqFormData1)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .createSubmission(reqFormData1)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .createSubmission(reqFormData1, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.createSubmission(reqFormData2)

await submissionApiUserCredentialsClient.createSubmission(reqFormData2)

await submissionApiJwtMethodArgClient.createSubmission(reqFormData2, config.JWT)
```

### Demo
```javascript
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const submissionApi = require('topcoder-submission-api-wrapper')
const client = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

// setup express app
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('port', process.env.TEST_PORT || 4000)

app.post('/proxy/submit', function (req, res) {
  let formData = req.body
  if (req.files && req.files.submission) {
    formData.submission = req.files.submission
  }
  client
    .createSubmission(formData)
    .then(result => {
      res.send(result.body)
    })
    .catch(err => {
      res.status(err.status).send(err.response.body)
    })
})

app.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`)
})
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqFormData** | [**SubmissionData**](SubmissionData.md)| the submission data
 **jwt**      | String | the optional json web token

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="getSubmission"></a>
# **getSubmission**
> getSubmission(submissionId)

Get submission by id.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .getSubmission(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .getSubmission(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .getSubmission(submissionId, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.getSubmission(submissionId)

await submissionApiUserCredentialsClient.getSubmission(submissionId)

await submissionApiJwtMethodArgClient.getSubmission(submissionId, config.JWT)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **jwt**      | String | the optional json web token

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headSubmission"></a>
# **headSubmission**
> headSubmission(submissionId)

Same to get submission, but only response status and headers information return.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .headSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .headSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .headSubmission(submissionId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.headSubmission(submissionId)

await submissionApiUserCredentialsClient.headSubmission(submissionId)

await submissionApiJwtMethodArgClient.headSubmission(submissionId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateSubmission"></a>
# **updateSubmission**
> updateSubmission(submissionId, reqBody)

Fully update submission.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  url: 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip',
  type: 'Contest Submission',
  memberId: 40493050,
  challengeId: 30054692
}

// Promise model
submissionApiM2MClient
  .updateSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .updateSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .updateSubmission(submissionId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.updateSubmission(submissionId, reqBody)

await submissionApiUserCredentialsClient.updateSubmission(submissionId, reqBody)

await submissionApiJwtMethodArgClient.updateSubmission(submissionId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **reqBody** | [**SubmissionUpdataData**](SubmissionUpdataData.md)| the submission data
 **jwt**      | String | the optional json web token

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchSubmission"></a>
# **patchSubmission**
> patchSubmission(submissionId, reqBody)

Partially update submission.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  url: 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip',
  type: 'Contest Submission'
}

// Promise model
submissionApiM2MClient
  .patchSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .patchSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .patchSubmission(submissionId, reqBody, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.patchSubmission(submissionId, reqBody)

await submissionApiUserCredentialsClient.patchSubmission(submissionId, reqBody)

await submissionApiJwtMethodArgClient.patchSubmission(submissionId, reqBody, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **reqBody** | [**SubmissionUpdataData**](SubmissionUpdataData.md)| the submission data
 **jwt**      | String | the optional json web token

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteSubmission"></a>
# **deleteSubmission**
> deleteSubmission(submissionId)

Delete submission by id.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .deleteSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .deleteSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .deleteSubmission(submissionId, config.JWT)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.deleteSubmission(submissionId)

await submissionApiUserCredentialsClient.deleteSubmission(submissionId)

await submissionApiJwtMethodArgClient.deleteSubmission(submissionId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **jwt**      | String | the optional json web token

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="downloadSubmission"></a>
# **downloadSubmission**
> downloadSubmission(submissionId)

Download submission by id.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .downloadSubmission(submissionId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .downloadSubmission(submissionId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .downloadSubmission(submissionId, config.JWT)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.downloadSubmission(submissionId)

await submissionApiUserCredentialsClient.downloadSubmission(submissionId)

await submissionApiJwtMethodArgClient.downloadSubmission(submissionId, config.JWT)
```

### Demo
```javascript
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const submissionApi = require('topcoder-submission-api-wrapper')
const client = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

// setup express app
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('port', process.env.TEST_PORT || 4000)

app.get('/proxy/download/:submissionId', function (req, res) {
  client
    .downloadSubmission(req.params.submissionId)
    .then(result => {
      res.set(result.headers)
      res.send(result.body)
    })
    .catch(err => {
      res.status(err.status).send(err.response.body)
    })
})

app.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`)
})
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **jwt**      | String | the optional json web token

### Return type

Binary data

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createArtifact"></a>
# **createArtifact**
> createArtifact(submissionId, reqFormData)

Create artifact for submission

### Example
```javascript
const path = require('path')
const fs = require('fs')
const fileData = fs.readFileSync(path.resolve(__dirname, './data/fileToUpload.zip'))
const submissionApi = require('topcoder-submission-api-wrapper')
const submissionApiM2MClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionApiUserCredentialsClient = submissionApi(_.pick(config,
      ['USERNAME', 'PASSWORD', 'TC_AUTHN_URL', 'TC_AUTHZ_URL', 'TC_CLIENT_ID',
       'TC_CLIENT_V2_CONNECTION', 'SUBMISSION_API_URL']))

const submissionApiJwtMethodArgClient = submissionApi(_.pick(config, 'SUBMISSION_API_URL'))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqFormData = {
  artifact: {
    name: 'fileToUpload.zip',
    data: fileData // a Buffer contain file content
  },
  typeId: 'c56a4180-65aa-42ec-a945-5fd21dec0503'
}

// Promise model
submissionApiM2MClient
  .createArtifact(submissionId, reqFormData)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .createArtifact(submissionId, reqFormData)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .createArtifact(submissionId, reqFormData, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.createArtifact(submissionId, reqFormData)

await submissionApiUserCredentialsClient.createArtifact(submissionId, reqFormData)

await submissionApiJwtMethodArgClient.createArtifact(submissionId, reqFormData, config.JWT)
```

### Demo
```javascript
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const submissionApi = require('topcoder-submission-api-wrapper')
const client = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

// setup express app
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('port', process.env.TEST_PORT || 4000)

app.post('/proxy/submission/:submissionId/artifact', function (req, res) {
  let formData = req.body
  if (req.files && req.files.artifact) {
    formData.artifact = req.files.artifact
  }
  client
    .createArtifact(req.params.submissionId, formData)
    .then(result => {
      res.send(result.body)
    })
    .catch(err => {
      res.status(err.status).send(err.response.body)
    })
})

app.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`)
})
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **reqFormData** | [**ArtifactData**](ArtifactData.md)| the artifact
 **jwt**      | String | the optional json web token

### Return type

[**Artifact**](Artifact.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="listArtifacts"></a>
# **listArtifacts**
> listArtifacts(submissionId)

List artifacts of specified submission

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiM2MClient
  .listArtifacts(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .listArtifacts(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .listArtifacts(submissionId, config.JWT)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.listArtifacts(submissionId)

await submissionApiUserCredentialsClient.listArtifacts(submissionId)

await submissionApiJwtMethodArgClient.listArtifacts(submissionId, config.JWT)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **jwt**      | String | the optional json web token

### Return type

[**ListArtifactsData**](ListArtifactsData.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="downloadArtifact"></a>
# **downloadArtifact**
> downloadArtifact(submissionId, artifactId)

Download artifact using submission id and artifact id.

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

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const artifactId = 'c56a4180-65aa-42ec-a945-5fd21dec0503'

// Promise model
submissionApiM2MClient
  .downloadArtifact(submissionId, artifactId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

submissionApiUserCredentialsClient
  .downloadArtifact(submissionId, artifactId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

submissionApiJwtMethodArgClient
  .downloadArtifact(submissionId, artifactId, config.JWT)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

// Async / await model
await submissionApiM2MClient.downloadArtifact(submissionId, artifactId)

await submissionApiUserCredentialsClient.downloadArtifact(submissionId, artifactId)

await submissionApiJwtMethodArgClient.downloadArtifact(submissionId, artifactId, config.JWT)
```

### Demo
```javascript
const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const submissionApi = require('topcoder-submission-api-wrapper')
const client = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

// setup express app
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('port', process.env.TEST_PORT || 4000)

app.get('/proxy/submission/:submissionId/artifact/:artifactId', function (req, res) {
  client
    .downloadArtifact(req.params.submissionId, req.params.artifactId)
    .then(result => {
      res.set(result.headers)
      res.send(result.body)
    })
    .catch(err => {
      res.status(err.status).send(err.response.body)
    })
})

app.listen(app.get('port'), () => {
  console.info(`Express server listening on port ${app.get('port')}`)
})
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **artifactId** | String | the artifact id
 **jwt**      | String | the optional json web token

### Return type

Binary data

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
