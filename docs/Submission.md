# Submission

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The submission id. |
**type** | **String** | The submission type. |
**fileType** | **String** | The submission file type. |
**url** | **String** | The submission file url. |
**memberId** | **Integer or String** | The submitter's member id. |
**challengeId** | **Integer or String** | The challenge id. |
**legacySubmissionId** | **Integer or String** | The legacy submission id. |
**legacyUploadId** | **Integer or String** | The legacy upload id. |
**submissionPhaseId** | **Integer or String** | The submission phase id. |
**isFileSubmission** | **Boolean** | The boolean flag indicate the submission is file uploaded or url. |
**filename** | **String** | The file name of submission if the submission is file uploaded. |
**review**| Array of [**Review**](Review.md)| The submission review. |
**reviewSummation**| Array of [**ReviewSummation**](ReviewSummation.md)| The submission review summation. |
**created** | **String** | The ISO date string of created date. |
**updated** | **String** | The ISO date string of updated date. |
**createdBy** | **String** | The created by user. |
**updatedBy** | **String** | The updated by user. |
