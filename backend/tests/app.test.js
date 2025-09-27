const request = require('supertest');
const app = require('../app');

describe('DiscountMate API Tests', () => {
  it('GET /hello should return greeting', async () => {
    const res = await request(app).get('/hello');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello from DiscountMate!');
  });

  it('GET /health should return status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });
});
