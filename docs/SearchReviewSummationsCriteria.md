# Search Review Summations Criteria

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**page** | **Integer** | The page number. | Default value is 1
**perPage** | **Integer** | The number of items to list per page. | Default value is 20
**sortBy** | **String** | The property by which to sort the result list. | Should be one of the properties of review summation.
**orderBy** | **String** | The order by which to sort. | One of [`asc`, `desc`, `ASC`, `DESC`]
**submissionId** | **String** | The submission id filter for review summations. |
**aggregateScore** | **Number** | Theaggregate score filter for review summations. |Double
**scoreCardId** | **Number or String** | The score card id filter for review summations.        |GUID string in swagger but integer in implementation
**isPassing** | **Boolean** | The passing boolean flag filter for review summations. |
