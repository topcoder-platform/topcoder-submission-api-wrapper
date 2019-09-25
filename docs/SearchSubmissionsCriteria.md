# Search Submissions Criteria

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**page** | **Integer** | The page number. | Default value is 1
**perPage** | **Integer** | The number of items to list per page. | Default value is 20
**sortBy** | **String** | The property by which to sort the result list. | Should be one of the properties of submission.
**orderBy** | **String** | The order by which to sort. | One of [`asc`, `desc`, `ASC`, `DESC`]
**type** | **String** | The type filter for submissions. |
**url** | **String** | The url filter for submissions. |
**memberId** | **Integer or String** | The member id filter for submissions. |
**challengeId** | **Integer or String** | The challenge id filter for submissions. |
**legacySubmissionId** | **Integer or String** | The legacy submission id filter for submissions. |
**legacyUploadId** | **Integer or String** | The legacy upload id filter for submissions. |
**submissionPhaseId** | **Integer or String** | The submission phase id filter for submissions. |
**review.score** | **Number** | The review score filter for submissions. | Double
**review.legacyReviewId** | **Number** | The review legacy review id filter for submissions. |
**review.typeId** | **String** | The review type id filter for submissions. |
**review.reviewerId** | **String** | The reviewer id filter for submissions. |
**review.scoreCardId** | **String** | The review score card id filter for submissions. |
**review.submissionId** | **String** | The review submission id filter for submissions. |
**review.status** | **String** | The review status filter for submissions. |
**reviewSummation.scoreCardId** | **String** | The review summation score card id filter for submissions. |
**reviewSummation.submissionId** | **String** | The review summation submission id filter for submissions. |
**reviewSummation.aggregateScore** | **Number** | The review summation aggregate score filter for submissions. | Double
**reviewSummation.isPassing** | **Boolean** | The review summation is passing boolean flag filter for submissions. |
