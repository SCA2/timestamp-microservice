var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHttp);

describe('timestamp microservice', () => {
  describe('/GET', () => {
    it('should return null with no query', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("{\"unix\":null,\"natural\":null}");
        done();
      })
    })

    it('should convert a unix timestamp', (done) => {
      chai.request(server)
      .get('/1496041200')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("{\"unix\":\"1496041200\",\"natural\":\"May 29, 2017\"}");
        done();
      })
    })

    it('should convert a natural date', (done) => {
      chai.request(server)
      .get('/May 29, 2017')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.equal("{\"unix\":\"1496041200\",\"natural\":\"May 29, 2017\"}");
        done();
      })
    })
  })
})