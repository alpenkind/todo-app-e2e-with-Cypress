//Tag for IntelliSense
/// <reference types="cypress" />

// Describe & for each
describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  beforeEach(() => {
    let firstItem = "Learn Ruby";
    let secondItem = "Learn Rust";
    let thirdItem = "Learn Vue.js";
    // Create first todo
    cy.visit("http://localhost:3000");
    cy.get("#new-todo").type(firstItem);
    cy.get("#add-todo").click();

    // Create second todo
    cy.get("#new-todo").type(secondItem);
    cy.get("#add-todo").click();
    //Create third Todo
    cy.get("#new-todo").type(thirdItem);
    cy.get("#add-todo").click();
  });

  //Check for empty todo list to start
  //it("displays zero itmes by default", () => {
  //cy.get(".todo-list li").should("have.length", 0);
  //});
  // Testing for adding new todo
  it("can add new items", () => {
    const firstNewItem = "Learn CSS";
    //select input field and type for first todo
    cy.get("#new-todo").type(firstNewItem);
    //select Add new todo button and click
    cy.get("#add-todo").click();
    //Testing for todo list length 1
    cy.get(".todo-list li").should("have.length", 4);

    //adding another todo
    const secondNewItem = "Learn HTML";
    cy.get("#new-todo").type(secondNewItem);
    //select Add new todo button and click
    cy.get("#add-todo").click();
    //Testing for todo list length 1
    cy.get(".todo-list li")
      //Testing for todo list lenght 2
      .should("have.length", 5)
      //select last item in list and test if text is correct
      .last()
      .should("have.text", secondNewItem);
  }),
    //Testing for todo done
    it("can check off items", () => {
      cy.get("#filter-all").click();
      //get todo, find
      cy.contains("Learn Rust")
        .parent()
        //find
        .find("input[type='checkbox']")
        //and check Checkbox
        .check();
      //check for done
      cy.contains("Learn Rust").should("have.class", "done");
    });
  //Testing for filtering todo

  //Filter for done todos
  context("with a checked task", () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      cy.contains("Learn Vue.js").find("input[type=checkbox]").check();
    });
    it("filter for done todos", () => {
      cy.get("#filter-done").click();

      //check if done only contains one todo
      cy.get(".todo-list li")
        .filter(":not([hidden])")
        .should("have.class", "done")
        .should("have.length", 1);
    });

    //Filter for active todos
    it("filter for open todos", () => {
      cy.get("#filter-open").click();

      //check if open only contains x todo
      cy.get(".todo-list li").should("have.length", 3);
    });
    //Testing for done todo delete
    it("Delete all done tasks", () => {
      //Select 'Delete done todos' Button and click
      cy.get("#delete-todos").click();
      //Select radio Button 'Show done todos' and click
      cy.get("#filter-done").click();
      //testing if list lenght is now 0
      cy.get(".todo-list li").filter(":not([hidden])").should("have.length", 0);
    });
  });
});

//Testing for not adding Empty todo

//testing for not existing todo delete try
