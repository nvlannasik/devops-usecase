describe("API Test", () => {
  it("should return 403", () => {
    cy.request({
      url: "https://api.annasik.my.id/v1/order/",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});
