Feature: Product Navigation

	Scenario: Navigate to product details page
		Given I am logged in as a standard user
		When I click on a product
		Then I should see the product detail page

	Scenario: Sort product from Z - A
		Given I am logged in as a standard user
		When I click on filter button and choose "name Z to A"
		Then I see the product has been sorted to "name Z to A"

	Scenario: Sort products from low to high price
		Given I am logged in as a standard user
		When I click on filter button and choose "price low to high"
		Then I see the product has been sorted to "price low to high"

	Scenario: Sort products from high to low price
		Given I am logged in as a standard user
		When I click on filter button and choose "price high to low"
		Then I see the product has been sorted to "price high to low"