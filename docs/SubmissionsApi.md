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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 10,
  challengeId: 30054692
}

// Promise model
submissionApiClient
  .searchSubmissions(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.searchSubmissions(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md)| the search submissions criteria

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 10,
  challengeId: 30054692
}

// Promise model
submissionApiClient
  .headSubmissions(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headSubmissions(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md)| the search submissions criteria

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

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
submissionApiClient
  .createSubmission(reqFormData1)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.createSubmission(reqFormData2)
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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .getSubmission(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.getSubmission(submissionId)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .headSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headSubmission(submissionId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  url: 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip',
  type: 'Contest Submission',
  memberId: 40493050,
  challengeId: 30054692
}

// Promise model
submissionApiClient
  .updateSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.updateSubmission(submissionId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **reqBody** | [**SubmissionUpdataData**](SubmissionUpdataData.md)| the submission data

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  url: 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip',
  type: 'Contest Submission'
}

// Promise model
submissionApiClient
  .patchSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.patchSubmission(submissionId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id
 **reqBody** | [**SubmissionUpdataData**](SubmissionUpdataData.md)| the submission data

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .deleteSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.deleteSubmission(submissionId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .downloadSubmission(submissionId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.downloadSubmission(submissionId)
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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqFormData = {
  artifact: {
    name: 'fileToUpload.zip',
    data: fileData // a Buffer contain file content
  },
  typeId: 'c56a4180-65aa-42ec-a945-5fd21dec0503'
}

// Promise model
submissionApiClient
  .createArtifact(submissionId, reqFormData)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.createArtifact(submissionId, reqFormData)
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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .listArtifacts(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.listArtifacts(submissionId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id

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
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const artifactId = 'c56a4180-65aa-42ec-a945-5fd21dec0503'

// Promise model
submissionApiClient
  .downloadArtifact(submissionId, artifactId)
  .then(result => console.log(result.status, result.body))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.downloadArtifact(submissionId, artifactId)
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

### Return type

Binary data

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
