module.exports = {
	moduleFileExtensions: [
		'js',
		'json'
	],
	transformIgnorePatterns: [
		'/node_modules/',
		'/vendor/'
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	testMatch: [
		'**/**/*.test.(js)|**/tests/unit/*.(js)'
	],
	testURL: 'http://localhost:5001/'
};
