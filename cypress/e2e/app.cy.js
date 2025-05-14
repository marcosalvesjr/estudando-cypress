import assert from "assert";

class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    urlFeedback: () => cy.get("#urlFeedback"),
    btnSubmit: () => cy.get("#btnSubmit"),
    hitEnter: () => cy.focused().type({ enter }),
  };
  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickSubmit() {
    this.elements.btnSubmit().click();
  }
}

const registerForm = new RegisterForm();
const colors = {
  error: "rgb(220, 53, 69)",
  success: "#198754",
};

describe("Image Registration", () => {
  describe("Submitting an image with invalid inputs", () => {
    after(() => {
      cy.clearAllLocalStorage();
    });
    const input = {
      title: "",
      url: "",
    };
    it("Given I am on the image registration page", () => {
      cy.visit("/");
    });
    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title);
    });
    it(`Then I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url);
    });
    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit();
    });
    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements
        .titleFeedback()
        .should("contains.text", "Please type a title for the image");
    });
    it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements
        .urlFeedback()
        .should("contain.text", "Please type a valid URL");
    });
    it(`And I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.success);
      });
    });
  });

  describe(`Submitting an image with valid inputs using enter key`, () => {
    const input = {
      title: "Alien BR",
      url: "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg",
    };

    after(() => {
      cy.clearAllLocalStorage();
    });

    it("Given I am on the image registration page", () => {
      cy.visit("/");
    });
    it(`When i enter ${input.title} in the title field`, () => {
      registerForm.typeTitle(input.title);
    });
    it(`When i enter ${input.title} in the URL field`, () => {
      registerForm.typeUrl(input.url);
    });
  });
});
