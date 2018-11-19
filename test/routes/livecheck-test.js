var app = require('../../src/server');
var request = require('supertest');

describe('/livecheck', () => {
  it('HEAD should return OK', () => {
    return request(app)
      .head('/livecheck')
      .expect('Content-Type', /text/)
      .expect(200);
  });

  it('GET should return OK', () => {
    return request(app)
      .get('/livecheck')
      .expect('Content-Type', /text/)
      .expect(200)
      .expect('Running!');
  });
});
