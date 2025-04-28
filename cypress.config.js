const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin =
	require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin =
	require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
// const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
// const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify')

async function setupNodeEvents(on, config) {
	await addCucumberPreprocessorPlugin(on, config)
	on(
		'file:preprocessor',
		createBundler({
			plugins: [createEsbuildPlugin(config)],
		})
	)
	return config
}

// async function setupNodeEvents(on, config) {
// 	// await preprocessor.addCucumberPreprocessorPlugin(on, config)
// 	// on('file:preprocessor', await browserify.default(config))
// 	// return config

// 	await preprocessor.addCucumberPreprocessorPlugin(on, config)
// 	const bundler = await browserify.default(config) // <- perbaikan di sini
// 	on('file:preprocessor', bundler)
// 	return config
// }

module.exports = defineConfig({
	// video: false,
	// defaultCommandTimeout: 5000,
	// pageLoadTimeout: 10000,
	e2e: {
		baseUrl: 'https://www.saucedemo.com/v1',
		specPattern: '**/*.feature',
		supportFile: 'cypress/support/e2e.js',
		setupNodeEvents,
	},
})
