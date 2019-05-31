import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json'
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			// so Rollup can find `ms`
			json(),
			babel({
				babelrc: false,
				runtimeHelpers: true,
				exclude: ['/node_modules/**'],
				presets: ['@babel/preset-env'],
				plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
			})
		]
	}
];