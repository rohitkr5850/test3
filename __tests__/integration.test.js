const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Integration Tests for To-Do API", () => {
  let todoId;

  test("Create a To-Do", async () => {
    const res = await request(app).post("/todos").send({
      title: "Integration Test To-Do",
      completed: false,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Integration Test To-Do");
    todoId = res.body._id;
  });

  test("Fetch all To-Dos", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test("Update a To-Do", async () => {
    const res = await request(app).put(`/todos/${todoId}`).send({
      completed: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test("Delete a To-Do", async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
  });
});
