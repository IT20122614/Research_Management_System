// import { response } from "express";
// import supertest from "supertest";
// import app from "./index.js";

const request = require("supertest");

const User = require("../../../../models/IT20122614/User_IT20122614");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../../../index")));
  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  describe("GET/usersGet", () => {
    it("should return all Supervisors", async () => {
      const supervisors = [
        {
          userRole: "Supervisor",
          userId: "IT20122614",
          name: "Kavindu",
          email: "kavindu1234@gmail.com",
          password: "123456",
        },
        {
          userRole: "Supervisor",
          userId: "IT20122618",
          name: "Madushan",
          email: "madushan1234@gmail.com",
          password: "123456",
        },
      ];

      await User.collection.insertMany(supervisors);
      const res = await request(server).get("/api/students/usersGet");
      // console.log(res);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});

// describe("POST /users", () => {
//   describe("given a username and password", () => {
//     test("should respond with a 200 status code", () => {
//       const response = request(app).get("/users").send({
//         username: "username",
//         password: "password",
//       });
//       expect(response.status).toBe(200);
//     });
//   });
//   describe("given a username and password", () => {});
// });
