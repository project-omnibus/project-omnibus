var app = require('../src/app');
var nock = require('nock');
var request = require('supertest');

describe('/v1/books', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('GET without required query parameter should return 400', () => {
    return request(app)
      .get('/v1/books')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'Missing required query parameter: q'
      });
  });

  it('GET should return books', () => {
    const bookResponse = {
      items: [
        { volumeInfo: { title: "Philosopher's Stone" } },
        { volumeInfo: { title: 'Chamber Of Secrets' } },
        { volumeInfo: { title: 'Prisoner Of Azkaban' } },
        { volumeInfo: { title: 'Goblet Of Fire' } },
        { volumeInfo: { title: 'Order Of The Phoenix' } }
      ]
    };
    nock('https://www.googleapis.com')
      .get('/books/v1/volumes')
      .query((qs) => {
        return qs.q === 'harry potter' &&
          qs.orderBy === 'relevance' &&
          qs.maxResults === '5' &&
          qs.key.length !== 0;
      })
      .reply(200, bookResponse);

    const expectedBookResponse = {
      relatedBooks: [
        "Philosopher's Stone",
        'Chamber Of Secrets',
        'Prisoner Of Azkaban',
        'Goblet Of Fire',
        'Order Of The Phoenix'
      ]
    };

    return request(app)
      .get('/v1/books?q=harry+potter')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(expectedBookResponse);
  });

  it('GET when error should return error', () => {
    const bookResponse = {
      statusCode: 400,
      error: 'Something is wrong'
    };
    nock('https://www.googleapis.com')
      .get('/books/v1/volumes')
      .query((qs) => {
        return qs.q === 'harry potter' &&
          qs.orderBy === 'relevance' &&
          qs.maxResults === '5' &&
          qs.key.length !== 0;
      })
      .reply(400, bookResponse);

    return request(app)
      .get('/v1/books?q=harry+potter')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(bookResponse);
  });
});
