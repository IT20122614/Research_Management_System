const request = require("supertest");
const RequestSepervisor = require("../../../../models/IT20122614/RequestSepervisor");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../../../index")));
  afterEach(async () => {
    await server.close();
    //await RequestSepervisor.remove({});
  });

  describe("GET/topic/add", () => {
    it("Should insert group members", async () => {
      const res = await request(server).get("/api/students/getAllTopics");
      expect(res.status).toBe(200);
    });
  });
});
