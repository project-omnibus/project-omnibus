var app = require('../src/app');
var nock = require('nock');
var request = require('supertest');
var should = require('should');

describe('/conversation/api', function () {
  beforeEach(() => {
    nock.cleanAll();
  });
  it('POST to conversation without relevancy or asked questions should return initial user', () => {
    return request(app)
      .post('/conversation/api')
      .send({})
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.should.have.property('relevancy');
      });
  });

  it('POST to conversation with an already existing profile should return a question', () => {
    const profileToSend = {
      'relevancy': [100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      'qAskedID': [],
      'attribute': { 'keywords': [] },
      'currentQ': {
        'qid': 0,
        'question': 'How often do you read  book?',
        'userInput': false,
        'relevancy': 100,
        'specificity': 4,
        'userAttribute': 'readerType',
        'followUpBy': []
      },
      'answer': "I don't read books very often at all"
    };
    return request(app)
      .post('/conversation/api')
      .send(profileToSend)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.should.have.property('relevancy');
      });
  });
});
