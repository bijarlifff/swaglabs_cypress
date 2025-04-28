import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const fillItems = {
	'in the checkout information without mandatory data': {
		btn: () => {
			cy.get('.btn_primary.cart_button').click()
		},
	},
	'only the first name': {
		btn: () => {
			cy.fixture('user').then(user => {
				cy.get('#first-name').type(user.firstName)
			})
			cy.get('.btn_primary.cart_button').click()
		},
	},
	'only the first name, last name': {
		btn: () => {
			cy.fixture('user').then(user => {
				cy.get('#first-name').clear().type(user.firstName)
				cy.get('#last-name').type(user.lastName)
			})
			cy.get('.btn_primary.cart_button').click()
		},
	},
}

const erorrItems = {
	'first name': {
		text: 'First Name is required',
	},
	'last name': {
		text: 'Last Name is required',
	},
	'postal code': {
		text: 'Postal Code is required',
	},
}

Given('I am logged in as a standard user', () => {
	cy.visit('/index.html')
	cy.fixture('user').then(user => {
		cy.loginForm(user.username, user.password)
	})
	cy.get('#login-button').click()
})

When('I add a products to the cart', () => {
	cy.productsToCart()
})

When('I proceed to checkout', () => {
	cy.get('.shopping_cart_link').click()
	cy.get('.btn_action.checkout_button').click()
})

When('I fill in the checkout information with complete data', () => {
	cy.url().should('include', 'checkout-step-one.html')
	cy.fixture('user').then(user => {
		cy.get('#first-name').type(user.firstName)
		cy.get('#last-name').type(user.lastName)
		cy.get('#postal-code').type(user.postalCode)
	})
	cy.get('.btn_primary.cart_button').click()
})

When('I should see the checkout overview page and click on finish', () => {
	cy.url().should('include', 'checkout-step-two.html')
	cy.get('.cart_item').should('be.visible')
	cy.get('.btn_action.cart_button').click()
})

Then('I should see the checkout complete page', () => {
	cy.url().should('include', 'checkout-complete.html')
	cy.get('.complete-header')
		.should('be.visible')
		.and('contain.text', 'THANK YOU FOR YOUR ORDER')
})

When('I fill {string} and click on continue', fillType => {
	fillItems[fillType].btn()
})

Then(
	'I should see an error message indicating that {string} fields are required',
	errorType => {
		cy.get('h3')
			.should('be.visible')
			.and('contain.text', erorrItems[errorType].text)
	}
)
