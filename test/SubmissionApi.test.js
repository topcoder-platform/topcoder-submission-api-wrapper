/*
 * Tests for Review APIs
 */

const _ = require('lodash')
const should = require('chai').should()
const config = require('./testConfig')
const api = require('../index')
const path = require('path')
const fs = require('fs')

const client = api(config)
const failClient = api(_.assign(_.cloneDeep(config), { 'AUTH0_CLIENT_ID': 'invalid' }))
const fileData1 = fs.readFileSync(path.resolve(__dirname, './data/fileToUpload.zip'))
const fileData2 = fs.readFileSync(path.resolve(__dirname, './data/good.zip'))
const notFoundId = 'e0a789ea-6144-4266-bfae-872f9a26e749'
const type = 'ContestSubmission'
const memberId = 40493050
const challengeId = 30054692
const url = 'https://tc-test-submission-scan.s3.amazonaws.com/good.zip'
const submission = {
  name: 'fileToUpload.zip',
  data: fileData1
}
const artifactId = 'c56a4180-65aa-42ec-a945-5fd21dec0503'

// submission id created in test
let createdSubmissionId1
let createdSubmissionId2

describe('Submission API Tests', () => {
  describe('Test create submission', () => {
    it(`Create submission with file upload success`, async () => {
      const res = await client.createSubmission({
        type,
        memberId,
        challengeId,
        submission
      })
      createdSubmissionId1 = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.fileType, 'zip')
      should.exist(res.body.url)
    })

    it(`Create submission with url success`, async () => {
      const res = await client.createSubmission({
        type,
        memberId,
        challengeId,
        url
      })
      createdSubmissionId2 = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.fileType, 'zip')
      should.equal(res.body.url, url)
    })

    it(`failure - Create submission with both file upload and url`, async () => {
      try {
        await client.createSubmission({
          type,
          memberId,
          challengeId,
          submission,
          url
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Either file to be uploaded or URL should be present')
      }
    })

    it(`failure - Create submission without file upload and url`, async () => {
      try {
        await client.createSubmission({
          type,
          memberId,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Either file to be uploaded or URL should be present')
      }
    })

    it(`failure - Create submission with invalid memberId`, async () => {
      try {
        await client.createSubmission({
          type,
          memberId: 'invalid',
          challengeId,
          url
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" must be a number')
      }
    })

    it(`failure - Create submission with invalid m2m credential`, async () => {
      try {
        await failClient.createSubmission({
          type,
          memberId,
          challengeId,
          submission,
          url
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test download submission', () => {
    it(`Download submission 1 success`, async () => {
      const res = await client.downloadSubmission(createdSubmissionId1)
      should.equal(Buffer.compare(res.body, fileData1), 0)
    })

    it(`Download submission 2 success`, async () => {
      const res = await client.downloadSubmission(createdSubmissionId2)
      should.equal(Buffer.compare(res.body, fileData2), 0)
    })

    it(`failure - Download submission with not found id`, async () => {
      try {
        await client.downloadSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Download submission with invalid m2m credential`, async () => {
      try {
        await failClient.downloadSubmission(createdSubmissionId2)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test search submissions', () => {
    it(`Search submissions 1 success`, async () => {
      const res = await client.searchSubmissions({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (const item of res.body) {
        should.exist(item.id)
        should.exist(item.type)
        should.exist(item.memberId)
        should.exist(item.challengeId)
        should.exist(item.url)
      }
    })

    it(`Search submissions 2 success`, async () => {
      const res = await client.searchSubmissions({
        page: 1,
        perPage: 3,
        challengeId,
        memberId
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (const item of res.body) {
        should.exist(item.id)
        should.exist(item.type)
        should.equal(item.memberId, memberId)
        should.equal(item.challengeId, challengeId)
        should.exist(item.fileType)
        should.exist(item.url)
      }
    })

    it(`failure - Search submissions with invalid parameter challengeId`, async () => {
      try {
        await client.searchSubmissions({ challengeId: 'abc' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"challengeId" must be a number`)
      }
    })

    it(`failure - Search submissions with invalid m2m credential`, async () => {
      try {
        await failClient.searchSubmissions({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test head submissions', () => {
    it(`Head submissions 1 success`, async () => {
      const res = await client.headSubmissions({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`Head submissions 2 success`, async () => {
      const res = await client.searchSubmissions({
        page: 1,
        perPage: 3,
        challengeId,
        memberId
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`failure - Head submissions with invalid parameter challengeId`, async () => {
      try {
        await client.headSubmissions({ challengeId: 'abc' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - Head submissions with invalid m2m credential`, async () => {
      try {
        await failClient.searchSubmissions({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test get submission', () => {
    it(`Get submission 1 success`, async () => {
      const res = await client.getSubmission(createdSubmissionId1)
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.fileType, 'zip')
      should.exist(res.body.url)
    })

    it(`Get submission 2 success`, async () => {
      const res = await client.getSubmission(createdSubmissionId2)
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.fileType, 'zip')
      // should.equal(res.body.url, url) Can't test if url matches because url changes after AV processor is done with its task
      should.exist(res.body.url)
    })

    it(`failure - Get submission with not found id`, async () => {
      try {
        await client.getSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Get submission with invalid m2m credential`, async () => {
      try {
        await failClient.getSubmission(createdSubmissionId2)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test head submission', () => {
    it(`Head submission 1 success`, async () => {
      const res = await client.headSubmission(createdSubmissionId1)
      should.equal(res.status, 200)
    })

    it(`Head submission 2 success`, async () => {
      const res = await client.headSubmission(createdSubmissionId2)
      should.equal(res.status, 200)
    })

    it(`failure - Head submission with not found id`, async () => {
      try {
        await client.headSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
      }
    })

    it(`failure - Head submission with invalid m2m credential`, async () => {
      try {
        await failClient.headSubmission(createdSubmissionId2)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test put submission', () => {
    it(`Put submission success`, async () => {
      const res = await client.updateSubmission(createdSubmissionId2, {
        type: 'challenge submission',
        memberId,
        challengeId,
        url,
        legacySubmissionId: 30003000
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSubmissionId2)
      should.equal(res.body.type, 'challenge submission')
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.url, url)
      should.equal(res.body.legacySubmissionId, 30003000)
    })

    it(`failure - Put submission with invalid legacySubmissionId parameter`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId1, {
          type,
          memberId,
          challengeId,
          url,
          legacySubmissionId: 'abcde'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"legacySubmissionId" must be a number`)
      }
    })

    it(`failure - Put submission not found`, async () => {
      try {
        await client.updateSubmission(notFoundId, {
          type,
          memberId,
          challengeId,
          url
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Put submission with invalid m2m credential`, async () => {
      try {
        await failClient.updateSubmission(createdSubmissionId1, {
          type,
          memberId,
          challengeId,
          url
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test patch submission', () => {
    it(`Patch submission success`, async () => {
      const res = await client.patchSubmission(createdSubmissionId2, {
        type: 'contestSubmission',
        legacyUploadId: 1000000
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSubmissionId2)
      should.equal(res.body.type, 'contestSubmission')
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
      should.equal(res.body.url, url)
      should.equal(res.body.legacySubmissionId, 30003000)
      should.equal(res.body.legacyUploadId, 1000000)
    })

    it(`failure - Patch submission with invalid submissionPhaseId parameter`, async () => {
      try {
        await client.patchSubmission(createdSubmissionId1, { submissionPhaseId: 'abcde' })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"submissionPhaseId" must be a number`)
      }
    })

    it(`failure - Patch submission not found`, async () => {
      try {
        await client.patchSubmission(notFoundId, { type })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Patch submission with invalid m2m credential`, async () => {
      try {
        await failClient.patchSubmission(createdSubmissionId1, { type })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test create artifact for submission', () => {
    it(`Create artifact success`, async () => {
      const res = await client.createArtifact(createdSubmissionId1, {
        artifact: submission,
        typeId: artifactId
      })
      should.equal(res.status, 200)
      should.equal(res.body.artifact, `${artifactId}.zip`)
    })

    it(`failure - Create artifact already exist`, async () => {
      try {
        await client.createArtifact(createdSubmissionId1, {
          artifact: submission,
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 409)
        should.equal(err.response.body.message, `Artifact ${artifactId}.zip already exists for Submission ${createdSubmissionId1}`)
      }
    })

    it(`failure - Create artifact no file 1`, async () => {
      try {
        await client.createArtifact(createdSubmissionId1, {
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Artifact is missing or not under attribute `artifact`')
      }
    })

    it(`failure - Create artifact file data incomplete`, async () => {
      try {
        await client.createArtifact(createdSubmissionId1, {
          artifact: { name: 'test' },
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Artifact is missing or not under attribute `artifact`')
      }
    })

    it(`failure - Create artifact file data incomplete`, async () => {
      try {
        await client.createArtifact(createdSubmissionId1, {
          artifact: { data: fileData1 },
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Artifact is missing or not under attribute `artifact`')
      }
    })

    it(`failure - Create artifact for submission not found`, async () => {
      try {
        await client.createArtifact(notFoundId, {
          artifact: submission,
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} does not exist`)
      }
    })

    it(`failure - Create artifact with invalid m2m credential`, async () => {
      try {
        await failClient.createArtifact(createdSubmissionId1, {
          artifact: submission,
          typeId: artifactId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test download artifact for submission', () => {
    it(`Download artifact success`, async () => {
      const res = await client.downloadArtifact(createdSubmissionId1, artifactId)
      should.equal(res.status, 200)
      should.equal(Buffer.compare(res.body, fileData1), 0)
    })

    it(`failure - Download artifact invalid submissionId`, async () => {
      try {
        await client.downloadArtifact('invalid', artifactId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"submissionId" must be a valid GUID`)
      }
    })

    it(`failure - Download artifact submission not found`, async () => {
      try {
        await client.downloadArtifact(notFoundId, artifactId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} does not exist`)
      }
    })

    it(`failure - Download artifact artifact not found`, async () => {
      try {
        await client.downloadArtifact(createdSubmissionId1, notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `Artifact ${notFoundId} doesn't exist for ${createdSubmissionId1}`)
      }
    })

    it(`failure - Download artifact with invalid m2m credential`, async () => {
      try {
        await failClient.downloadArtifact(createdSubmissionId1, artifactId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test list artifacts for submission', () => {
    it(`List artifacts success`, async () => {
      const res = await client.listArtifacts(createdSubmissionId1)
      should.equal(res.status, 200)
      should.equal(res.body.artifacts.length > 0, true)
      should.equal(res.body.artifacts.includes(artifactId), true)
    })

    it(`failure - List artifacts submission invalid submissionId`, async () => {
      try {
        await client.listArtifacts('invalid')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `"submissionId" must be a valid GUID`)
      }
    })

    it(`failure - List artifacts submission not found`, async () => {
      try {
        await client.listArtifacts(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} does not exist`)
      }
    })

    it(`failure - List artifacts with invalid m2m credential`, async () => {
      try {
        await failClient.listArtifacts(createdSubmissionId1)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test delete submission', () => {
    it(`Delete submission 1 success`, async () => {
      const res = await client.deleteSubmission(createdSubmissionId1)
      should.equal(res.status, 204)
    })

    it(`Delete submission 2 success`, async () => {
      const res = await client.deleteSubmission(createdSubmissionId2)
      should.equal(res.status, 204)
    })

    it(`failure - Delete submission with not found id`, async () => {
      try {
        await client.deleteSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Delete submission with invalid m2m credential`, async () => {
      try {
        await failClient.deleteSubmission(createdSubmissionId2)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })
})
