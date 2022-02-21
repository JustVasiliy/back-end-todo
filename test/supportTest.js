describe("tests", () => {
  const { app } = require("../server/server");
  test("Post", async () => {
    const response = await request(app)
      .post("/api/task/create")
      .send({
        name: "123",
        checked: true,
        deleted: false,
        editing: false,
        id: "123",
        createdBy: "123",
      })

      .expect(response.status)
      .toBe(200);
  });
  test("Put", async () => {
    const response = await request(app).post("/api/task/create").send({
      name: "123",
      checked: true,
      deleted: false,
      editing: false,
      id: "123",
      createdBy: "123",
    });

    expect(response.status).toBe(200);
  });
  test("Delete", async () => {
    const response = await request(app).post("/api/task/create").send({
      name: "123",
      checked: true,
      deleted: false,
      editing: false,
      id: "123",
      createdBy: "123",
    });

    expect(response.status).toBe(200);
  });
  test("Get", async () => {
    const response = await request(app).get("/api/task/get");

    expect(response.status).toBe(200);
  });
  // close the server after each test

  afterAll(() => {
    mongoose.connection.close();
    mongoose.disconnect();
    console.log("server closed!");
  });
});
