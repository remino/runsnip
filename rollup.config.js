import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { readFileSync } from 'fs'
import postcss from 'postcss'
import sass from 'rollup-plugin-sass'
import uglify from '@lopatnov/rollup-plugin-uglify'

const {
	author: { name: authorName, url: authorUrl }, license, name, version,
} = JSON.parse(readFileSync('./package.json'))

const currentYear = new Date().getFullYear()
const banner = `/*! ${name} v${version} | (c) 2022-${currentYear} ${authorName} <${authorUrl}> | ${license} Licence */`
const output = { banner }
const outputCompact = { ...output, compact: true }

const sassPlugin = sass({
	options: {
		outputStyle: 'compressed',
	},
	processor: css => postcss([autoprefixer, cssnano])
		.process(css, { from: undefined })
		.then(result => result.css),
})

const uglifyPlugin = uglify({
	compress: {
		passes: 2,
	},
	toplevel: true,
})

const options = {
	plugins: [sassPlugin],
	watch: {
		clearScreen: false,
	},
}

const pluginsCompact = [sassPlugin, uglifyPlugin]

export default [
	{
		...options,
		input: 'src/runsnip.js',
		output: [
			{
				...output,
				file: 'dist/runsnip.cjs',
				format: 'umd',
				name: 'runsnip',
			},
			{
				...output,
				file: 'dist/runsnip.mjs',
				format: 'es',
			},
		],
	},
	{
		...options,
		input: 'src/runsnip.js',
		output: [
			{
				...outputCompact,
				file: 'dist/runsnip.min.js',
				format: 'umd',
				name: 'runsnip',
			},
			{
				...outputCompact,
				file: 'dist/runsnip.min.mjs',
				format: 'es',
			},
		],
		plugins: pluginsCompact,
	},
	{
		...options,
		input: 'src/auto.js',
		output: {
			...outputCompact,
			file: 'dist/runsnip-auto.min.js',
			format: 'umd',
			name: 'runsnip',
		},
		plugins: pluginsCompact,
	},
// 	{
// 		...options,
// 		input: 'assets/js/index.js',
// 		output: {
// 			file: '.build/js/runsnip/script.js',
// 			format: 'umd',
// 			name: 'runsnip',
// 		},
// 		plugins: pluginsCompact,
// 	},
]
