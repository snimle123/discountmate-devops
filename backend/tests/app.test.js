const request = require("supertest");
const app = require("../app");

let server;

beforeAll(() => {
  // start test server on a different port so it doesn’t conflict with Jenkins or Docker
  server = app.listen(4001);
});

afterAll((done) => {
  // close server after all tests finish
  server.close(done);
});

describe("DiscountMate API Tests", () => {
  it("GET /hello should return greeting", async () => {
    const res = await request(server).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello from DiscountMate!");
  });

  it("GET /health should return status UP", async () => {
    const res = await request(server).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "UP");
  });
});
