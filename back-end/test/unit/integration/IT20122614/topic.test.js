const request = require("supertest");
const RequestSepervisor = require("../../../../models/IT20122614/RequestSepervisor");
let server;

describe("/api/students", () => {
  beforeEach(() => (server = require("../../../../index")));
  afterEach(async () => {
    await server.close();
    await RequestSepervisor.remove({});
  });

  describe("POST/request/topic", () => {
    it("Should insert group members", async () => {
      const topics = {
        uId: "SE0046",
        userRole: "Student",
        field: "Cloud computing",
        topic: "Cloud computing Cloud computing Cloud computing",
        message: "Cloud computingCloud computingCloud computingCloud computing",
        
       
      };
      await request(server)
        .post("/api/students/request/topic")
        .send(topics)
        .then(async (data) => {
          expect(data.status).toBe(200);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  describe("POST/request/topic", () => {
    it("Should not insert topics", async () => {
      const topics = {
        uId: "SE0046",
        userRole: "Student",
        field: "Cloud computing",
        topic: "Cloud computing Cloud computing Cloud computing",
        message: "Cl",
        
       
      };
      await request(server)
        .post("/api/students/request/topic")
        .send(topics)
        .then(async (data) => {
          expect(data.status).toBe(400);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  
});
