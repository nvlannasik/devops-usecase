const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

chai.use(chaiHttp);

describe("Order Service Integration Test", function () {
  this.timeout(20000);

  let jwtToken = "";

  before((done) => {
    chai
      .request("https://api.annasik.my.id")
      .post("/v1/user/login")
      .send({ Email: "devops@gmail.com", Password: "devops123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        jwtToken = res.body.token;
        done();
      });
  });

  describe("GET /orders", () => {
    it("should return 200", (done) => {
      chai
        .request("https://api.annasik.my.id")
        .get("/v1/order/")
        .set("auth-token", `${jwtToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
