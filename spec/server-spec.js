const request = require('supertest');
const app = require('../server/app');
const URL = require('../server/models/url');


describe("Server Spec", () => {
    describe('*', () => {
        it("returns the react client", (done) =>  {
            request(app)
                .post('/')
                .end((err, res) => {
                    expect(res.status).toBe(200);
                    done();
                });
        });
    });
    describe("GET /", () => {
        it("returns status code 200", (done) =>  {
            request(app)
                .get('/')
                .end((err, res) => {
                    expect(res.status).toBe(200);
                    done();
                });
            done();
        });
    });

    describe('POST /api/v1/shorten', () => {
        it("returns a 400 for an invalid url", (done) => {
            request(app)
                .post('/api/v1/shorten')
                .send({
                    url: 'invalidurl.com',
                })
                .end((err, res) => {
                    expect(res.status).toBe(400);
                    done()
                })
        })
    });

    describe('POST /api/v1/shorten', () => {
        it("returns a 201 and shortens a valid url", (done) => {
            request(app)
                .post('/api/v1/shorten')
                .send({
                    url: 'http://validurl.com',
                })
                .end((err, res) => {
                    expect(res.status).toBe(201);
                    done();
                })
        });
    });

    describe('POST /api/v1/shorten', () => {
        it("returns a 200 and when the user tries to shorten a url that already exists", (done) => {
            request(app)
                .post('/api/v1/shorten')
                .send({
                    url: 'http://validurl.com',
                })
                .end(() => {
                request(app)
                    .post('/api/v1/shorten')
                    .send({
                        url: 'http://validurl.com',
                    })
                    .end((err, res) => {
                        expect(res.status).toBe(200);
                        done();
                    })
                });
        });
    });

    describe('GET /id', () => {
        it('redirects a short url to its long url', (done) => {
            request(app)
                .post('/api/v1/shorten')
                .send({
                    url: 'http://validurl.com',
                })
                .end((err, res) => {
                    request(app)
                        .get(`/${res.body.id}`)
                        .end((err, res) => {
                            expect(res.status).toBe(301);
                            done()
                        })
                })
        });
    });

    describe('GET /id', () => {
        it('redirects to the homepage when you pass an id that doesn\'t exist', (done) => {
            request(app)
                .get('/123')
                .end((err, res) => {
                    expect(res.status).toBe(302);
                    done()
                })
        });
    });

    afterEach((done) => {
        URL.remove({}, () => {
            done();
        });
        done();
    });
});
