const request = require('supertest');
const app = require('../server/app');


describe("Server Spec", () => {
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
});
