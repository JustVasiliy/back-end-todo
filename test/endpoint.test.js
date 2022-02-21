import request from "supertest";
const baseUrl = "http://localhost:3000";
const app = require("../server/server");
const jwt = require("jsonwebtoken");

describe("Todos endpoint", () => {
  let server;
  beforeAll(() => {
    server = app.listen(3000);
  });

  const token = jwt.sign(
    { nickname: "uio", id: "e93f9316-6430-4d0e-99b5-cb71eaedd281" },
    "myKey",
    {
      expiresIn: 60 * 60,
    }
  );
  it("GET", async () => {
    const response = await request(baseUrl)
      .get("/api/task/get/")
      .set("Authorization", token);

    expect(response.statusCode).toBe(200);
  });

  it("POST", async () => {
    const response = await request(baseUrl)
      .post("/api/task/create")
      .set("Authorization", token)
      .send({
        name: "test",
        checked: false,
        deleted: false,
        id: "tests",
        createdBy: "e93f9316-6430-4d0e-99b5-cb71eaedd281",
      });

    expect(response.statusCode).toBe(200);
  });
  it("PUT", async () => {
    const response = await request(baseUrl)
      .post("/api/task/put")
      .set("Authorization", token)
      .send({
        name: "test",
        checked: false,
        deleted: false,
        id: 1643618690402,
        createdBy: "e93f9316-6430-4d0e-99b5-cb71eaedd281",
      });

    expect(response.statusCode).toBe(200);
  });
  it("DELETE", async () => {
    const response = await request(baseUrl)
      .post("/api/task/delete")
      .set("Authorization", token)
      .send({
        name: "test",
        checked: false,
        deleted: true,
        id: 1643618690402,
        createdBy: "e93f9316-6430-4d0e-99b5-cb71eaedd281",
      });

    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    server.close();
  });
});
