export const create = document.createElement.bind(document)
export const sel = document.querySelector.bind(document)
export const selOrCreate = (query, tag) => sel(query) || create(tag)

export const runIn = (options = {}) => {
	const el = document.createElement('run-snip')

	Array.from(
		['append', 'css', 'js', 'html', 'output', 'submit'],
	).forEach(attr => {
		el.setAttribute(attr, options[attr])
	})

	document.body.appendChild(el)
}
