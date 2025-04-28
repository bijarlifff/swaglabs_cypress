import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

const sortItems = {
	'name Z to A': {
		choose: 'za',
		expectedFirstItem: 'Test.allTheThings() T-Shirt (Red)',
	},
	'price low to high': {
		choose: 'lohi',
		expectedFirstItem: 'Sauce Labs Onesie',
	},
	'price high to low': {
		choose: 'hilo',
		expectedFirstItem: 'Sauce Labs Fleece Jacket',
	},
}

Given('I am logged in as a standard user', () => {
	cy.visit('/index.html')
	cy.fixture('user').then(user => {
		cy.loginForm(user.username, user.password)
	})
	cy.get('#login-button').click()
})

When('I click on a product', () => {
	cy.get('.inventory_item').first().find('.inventory_item_name').click()
})

Then('I should see the product detail page', () => {
	cy.url().should('include', 'inventory-item.html?id=')
	cy.get('.inventory_details').should('be.visible')
})

When('I click on filter button and choose {string}', sortType => {
	cy.get('.product_sort_container').select(sortItems[sortType].choose)
})

Then('I see the product has been sorted to {string}', sortType => {
	cy.get('.inventory_item')
		.first()
		.find('.inventory_item_name')
		.should('have.text', sortItems[sortType].expectedFirstItem)
})
