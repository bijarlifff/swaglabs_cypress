import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

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

When('The cart should contain the products', () => {
	cy.get('.fa-layers-counter.shopping_cart_badge')
		.should('be.visible')
		.and('contain.text', 2)
})

Then('I should see products in the cart', () => {
	cy.get('.shopping_cart_link').click()
	cy.url().should('include', 'cart.html')
	cy.get('.cart_item').should('be.visible')
})

When('I remove the products from the cart', () => {
	cy.get('.shopping_cart_link').click()
	cy.get('.btn_secondary.cart_button').each($btn => {
		cy.wrap($btn).click()
	})
})

Then('I should see the cart is empty', () => {
	cy.get('cart_item').should('not.exist')
})
