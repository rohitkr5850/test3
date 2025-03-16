const sinon = require("sinon");
const mongoose = require("mongoose");
const Todo = require("../server").Todo;

describe("Mocks and Spies for Complex API Logic", () => {
  afterEach(() => {
    sinon.restore();
  });

  test("Spy on Database Save", async () => {
    const saveSpy = sinon.spy(Todo.prototype, "save");

    const todo = new Todo({ title: "Spy Test", completed: false });
    await todo.save();

    expect(saveSpy.calledOnce).toBe(true);
  });

  test("Mock Database Error", async () => {
    const findStub = sinon.stub(Todo, "find").throws(new Error("Database Error"));

    try {
      await Todo.find();
    } catch (error) {
      expect(error.message).toBe("Database Error");
    }
  });
});
