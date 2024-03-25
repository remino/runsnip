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
		input: 'src/runin.js',
		output: [
			{
				...output,
				file: 'dist/runin.cjs',
				format: 'umd',
				name: 'runin',
			},
			{
				...output,
				file: 'dist/runin.mjs',
				format: 'es',
			},
		],
	},
	{
		...options,
		input: 'src/runin.js',
		output: [
			{
				...outputCompact,
				file: 'dist/runin.min.js',
				format: 'umd',
				name: 'runin',
			},
			{
				...outputCompact,
				file: 'dist/runin.min.mjs',
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
			file: 'dist/runin-auto.min.js',
			format: 'umd',
			name: 'runin',
		},
		plugins: pluginsCompact,
	},
	{
		...options,
		input: 'assets/js/index.js',
		output: {
			file: '.build/js/runin/script.js',
			format: 'umd',
			name: 'runin',
		},
		plugins: pluginsCompact,
	},
]
