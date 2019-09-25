# Search Reviews Criteria

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**page** | **Integer** | The page number. | Default value is 1
**perPage** | **Integer** | The number of items to list per page. | Default value is 20
**sortBy** | **String** | The property by which to sort the result list. | Should be one of the properties of review.
**orderBy** | **String** | The order by which to sort. | One of [`asc`, `desc`, `ASC`, `DESC`]
**score** | **Number** | The score filter for reviews. |
**legacyReviewId** | **Number** | The filter for review id in the legacy system. |
**typeId** | **String** | The review type id filter for reviews. |
**reviewerId** | **Integer or String** | The reviewer id filter for reviews. |
**scoreCardId** | **Integer or String** | The scorecard id filter for reviews. |
**submissionId** | **String** | The submission id filter for reviews. |
**status** | **String** | The review status filter. Can be one of `queued` and `completed`. |
