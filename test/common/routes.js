/**
 * The Schema of API Routes
 */
const joi = require('@hapi/joi')
const td = require('./testData')
const ReviewTypes = require('../data/ReviewTypes.json')
const Reviews = require('../data/Reviews.json')
const ReviewSummations = require('../data/ReviewSummations.json')
const Submissions = require('../data/Submissions.json')

module.exports = {
  '/reviewTypes': {
    post: {
      id: td.REVIEW_TYPE_ID,
      schema: {
        entity: joi.object().keys({
          name: joi.string().required(),
          isActive: joi.boolean().required()
        }).required()
      }
    },
    get: {
      records: ReviewTypes,
      schema: {
        query: joi.object().keys({
          name: joi.string(),
          isActive: joi.boolean(),
          page: joi.id(),
          perPage: joi.pageSize()
        })
      }
    }
  },
  '/reviewTypes/:id': {
    get: {
      idProp: 'reviewTypeId',
      schema: {
        reviewTypeId: joi.string().uuid().required()
      }
    },
    put: {
      idProp: 'reviewTypeId',
      schema: {
        reviewTypeId: joi.string().uuid().required(),
        entity: joi.object().keys({
          name: joi.string().required(),
          isActive: joi.boolean().required()
        }).required()
      }
    },
    patch: {
      idProp: 'reviewTypeId',
      schema: {
        reviewTypeId: joi.string().uuid().required(),
        entity: joi.object().keys({
          name: joi.string(),
          isActive: joi.boolean()
        })
      }
    },
    delete: {
      idProp: 'reviewTypeId',
      schema: {
        reviewTypeId: joi.string().uuid().required()
      }
    }
  },
  '/reviews': {
    post: {
      id: td.REVIEW_ID,
      schema: {
        authUser: joi.object().required(),
        entity: joi.object().keys({
          score: joi.score().required(),
          typeId: joi.string().uuid().required(),
          reviewerId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          submissionId: joi.string().uuid().required(),
          metadata: joi.object()
        }).required()
      }
    },
    get: {
      records: Reviews,
      schema: {
        query: joi.object().keys({
          score: joi.score(),
          typeId: joi.string().uuid(),
          reviewerId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionId: joi.string().uuid(),
          page: joi.id(),
          perPage: joi.pageSize()
        })
      }
    }
  },
  '/reviews/:id': {
    get: {
      idProp: 'reviewId',
      schema: {
        authUser: joi.object().required(),
        reviewId: joi.string().uuid().required()
      }
    },
    put: {
      idProp: 'reviewId',
      schema: {
        authUser: joi.object().required(),
        reviewId: joi.string().uuid().required(),
        entity: joi.object().keys({
          score: joi.score().required(),
          typeId: joi.string().uuid().required(),
          reviewerId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          submissionId: joi.string().uuid().required(),
          metadata: joi.object()
        }).required()
      }
    },
    patch: {
      idProp: 'reviewId',
      schema: {
        authUser: joi.object().required(),
        reviewId: joi.string().uuid().required(),
        entity: joi.object().keys({
          score: joi.score(),
          typeId: joi.string().uuid(),
          reviewerId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionId: joi.string().uuid(),
          metadata: joi.object()
        })
      }
    },
    delete: {
      idProp: 'reviewId',
      schema: {
        reviewId: joi.string().uuid().required()
      }
    }
  },
  '/reviewSummations': {
    post: {
      id: td.REVIEW_SUMMATION_ID,
      schema: {
        authUser: joi.object().required(),
        entity: joi.object().keys({
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          submissionId: joi.string().uuid().required(),
          aggregateScore: joi.score().required(),
          isPassing: joi.boolean().required(),
          isFinal: joi.boolean(),
          metadata: joi.object()
        }).required()
      }
    },
    get: {
      records: ReviewSummations,
      schema: {
        query: joi.object().keys({
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionId: joi.string().uuid(),
          aggregateScore: joi.score(),
          isPassing: joi.boolean(),
          isFinal: joi.boolean(),
          page: joi.id(),
          perPage: joi.pageSize()
        })
      }
    }
  },
  '/reviewSummations/:id': {
    get: {
      idProp: 'reviewSummationId',
      schema: {
        reviewSummationId: joi.string().uuid().required()
      }
    },
    put: {
      idProp: 'reviewSummationId',
      schema: {
        authUser: joi.object().required(),
        reviewSummationId: joi.string().uuid().required(),
        entity: joi.object().keys({
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          submissionId: joi.string().uuid().required(),
          aggregateScore: joi.score().required(),
          isPassing: joi.boolean().required(),
          isFinal: joi.boolean(),
          metadata: joi.object()
        }).required()
      }
    },
    patch: {
      idProp: 'reviewSummationId',
      schema: {
        authUser: joi.object().required(),
        reviewSummationId: joi.string().uuid().required(),
        entity: joi.object().keys({
          scoreCardId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionId: joi.string().uuid(),
          aggregateScore: joi.score(),
          isPassing: joi.boolean(),
          isFinal: joi.boolean(),
          metadata: joi.object()
        })
      }
    },
    delete: {
      idProp: 'reviewSummationId',
      schema: {
        reviewSummationId: joi.string().uuid().required()
      }
    }
  },
  '/submissions': {
    post: {
      id: [td.SUBMISSION_ID2, td.SUBMISSION_ID1, td.SUBMISSION_ID2, td.SUBMISSION_ID1, td.SUBMISSION_ID2, td.SUBMISSION_ID1],
      schema: {
        authUser: joi.object().required(),
        files: joi.any(),
        entity: joi.object().keys({
          type: joi.string().required(),
          fileType: joi.string(),
          url: joi.string().uri().trim(),
          memberId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          challengeId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          legacySubmissionId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacyUploadId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionPhaseId: joi.alternatives().try(joi.id(), joi.string().uuid())
        }).required()
      }
    },
    get: {
      records: Submissions,
      schema: {
        query: joi.object().keys({
          type: joi.string(),
          url: joi.string().uri().trim(),
          memberId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          challengeId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacySubmissionId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacyUploadId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionPhaseId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          page: joi.id(),
          perPage: joi.pageSize(),
          'review.score': joi.score(),
          'review.typeId': joi.string().uuid(),
          'review.reviewerId': joi.string().uuid(),
          'review.scoreCardId': joi.string().uuid(),
          'review.submissionId': joi.string().uuid(),
          'reviewSummation.scoreCardId': joi.string().uuid(),
          'reviewSummation.submissionId': joi.string().uuid(),
          'reviewSummation.aggregateScore': joi.score(),
          'reviewSummation.isPassing': joi.boolean()
        })
      }
    }
  },
  '/submissions/:id': {
    get: {
      idProp: 'submissionId',
      schema: {
        authUser: joi.object().required(),
        submissionId: joi.string().uuid().required()
      }
    },
    put: {
      idProp: 'submissionId',
      schema: {
        authUser: joi.object().required(),
        submissionId: joi.string().uuid().required(),
        entity: joi.object().keys({
          type: joi.string(),
          url: joi.string().uri().trim().required(),
          memberId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          challengeId: joi.alternatives().try(joi.id(), joi.string().uuid()).required(),
          legacySubmissionId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacyUploadId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionPhaseId: joi.alternatives().try(joi.id(), joi.string().uuid())
        }).required()
      }
    },
    patch: {
      idProp: 'submissionId',
      schema: {
        authUser: joi.object().required(),
        submissionId: joi.string().uuid().required(),
        entity: joi.object().keys({
          type: joi.string(),
          url: joi.string().uri().trim(),
          memberId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          challengeId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacySubmissionId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          legacyUploadId: joi.alternatives().try(joi.id(), joi.string().uuid()),
          submissionPhaseId: joi.alternatives().try(joi.id(), joi.string().uuid())
        })
      }
    },
    delete: {
      idProp: 'submissionId',
      schema: {
        submissionId: joi.string().guid().required()
      }
    }
  },
  '/submissions/:id/download': {
    get: {
      schema: {
        authUser: joi.object().required(),
        submissionId: joi.string().uuid().required()
      }
    }
  },
  '/submissions/:id/artifacts': {
    post: {
      id: td.ARTIFACT_ID,
      schema: {
        files: joi.any().required(),
        submissionId: joi.string().guid().required(),
        entity: joi.object().keys({
          typeId: joi.string().uuid().required()
        }).required()
      }
    },
    get: {
      schema: {
        submissionId: joi.string().uuid().required()
      }
    }
  },
  '/submissions/:id/artifacts/:file/download': {
    get: {
      schema: {
        submissionId: joi.string().uuid().required(),
        fileName: joi.string().trim().required()
      }
    }
  },
  '/submissions/:id/artifacts/:file': {
    delete: {
      schema: {
        submissionId: joi.string().uuid().required(),
        fileName: joi.string().trim().required()
      }
    }
  }
}
