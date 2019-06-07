module.exports = {
	extends: ['@fizzmod/eslint-config', 'prettier'],
	plugins: ['babel', 'prettier'],
	parser: 'babel-eslint',
	rules: {
		'prettier/prettier': 'error'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.json'],
				moduleDirectory: [
					'node_modules',
					'src'
				]
			}
		}
	}
}

