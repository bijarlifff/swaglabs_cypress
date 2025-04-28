import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I visit the Sauce Demo login page', () => {
	cy.visit('/index.html')
})

When('I enter a valid username and password', () => {
	cy.fixture('user').then(user => {
		cy.loginForm(user.username, user.password)
	})
})

Then('I should be redirected to the products page', () => {
	cy.url().should('include', 'inventory.html')
})

When('I enter an invalid username or password', () => {
	cy.fixture('user').then(user => {
		cy.loginForm(user.wrongUsername, user.wrongPassword)
	})
})

When('I only enter a username', () => {
	cy.fixture('user').then(user => {
		// cy.get('#user-name').type(user.username)
		cy.loginForm(user.wrongUsername, ' ').clear()
	})
})

When('I click the login button', () => {
	cy.get('#login-button').click()
})

Then('I should see an error message', () => {
	cy.get('[data-test="error"]').should('be.visible')
})
