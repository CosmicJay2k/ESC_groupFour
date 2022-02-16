describe("Using Cypress", () => {
  it("to visit ESC on localhost", () => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("to find a link and click it", () => {
    cy.contains("Play online").click();
  });

  it("to verify that the link was clicked", () => {
    cy.contains("Filter challenges");
  });

  it("to visit ESC on GitHub Pages", () => {
    cy.visit("https://cosmicjay2k.github.io/ESC_groupFour/");
  });

  it("to find a link and click it", () => {
    cy.contains("Play online").click();
  });

  it("to verify that the link was clicked", () => {
    cy.contains("Filter challenges");
  });
});
