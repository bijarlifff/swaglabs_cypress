import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am logged in as a standard user', () => {
	cy.visit('/index.html')
	cy.fixture('user').then(user => {
		cy.loginForm(user.username, user.password)
	})
	cy.get('#login-button').click()
})

When('I click the menu button', () => {
	cy.get('.bm-burger-button').click()
})

When('I click the logout button', () => {
	cy.get('#logout_sidebar_link').click()
})

Then(
	'I should be logged out successfully and i should see the login page',
	() => {
		cy.url().should('include', '/index.html')
		cy.get('form').should('be.visible')
		cy.get('.bot_column').should('be.visible')
	}
)
