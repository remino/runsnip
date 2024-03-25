/*! runsnip v0.2.0 | (c) 2022-2024 Rémino Rem <https://remino.net/> | ISC Licence */
const create = document.createElement.bind(document);
const sel = document.querySelector.bind(document);
const selOrCreate = (query, tag) => sel(query) || create(tag);

const DEFAULT_LABEL = 'Run';

class RunSnip extends HTMLElement {
	connectedCallback() {
		this.htmlEl = selOrCreate(this.getAttribute('html'), 'div');
		this.cssEl = selOrCreate(this.getAttribute('css'), 'style');
		this.jsEl = selOrCreate(this.getAttribute('js'), 'script');
		this.headEl = selOrCreate(this.getAttribute('head'), 'head');
		this.outputEl = selOrCreate(this.getAttribute('output'), 'output');
		this.appendEl = sel(this.getAttribute('append'));
		this.submitEl = selOrCreate(this.getAttribute('submit'), 'button');

		if (!this.submitEl.getAttribute('type')) this.submitEl.setAttribute('type', 'submit');

		if (this.submitEl.tagName === 'INPUT') {
			this.submitEl.value = this.textContent || DEFAULT_LABEL;
		} else {
			this.submitEl.innerHTML = this.innerHTML || DEFAULT_LABEL;
		}

		const form = this.submitEl.form || create('form');

		if (document.contains(form)) {
			if (!document.contains(this.submitEl)) this.appendChild(this.submitEl);
		} else {
			this.appendChild(form);
			if (!document.contains(this.submitEl)) form.appendChild(this.submitEl);
		}

		form.addEventListener('submit', this.submit.bind(this));
	}

	get html() {
		return this.htmlEl.value || this.htmlEl.innerHTML
	}

	get head() {
		return this.headEl.value || this.headEl.innerHTML
	}

	get css() {
		return this.cssEl.value || this.cssEl.textContent
	}

	get js() {
		return this.jsEl.value || this.jsEl.textContent
	}

	run() {
		if (
			!document.contains(this.outputEl)
		) {
			if (this.appendEl) {
				if (!this.appendEl.contains(this.outputEl)) {
					this.appendEl.appendChild(this.outputEl);
				}
			} else {
				this.insertAdjacentElement('afterend', this.outputEl);
			}
		}

		const iframe = create('iframe');

		const style = create('style');
		style.textContent = this.css;

		const script = create('script');
		script.setAttribute('defer', '');
		script.textContent = this.js;

		this.outputEl.innerHTML = '';
		this.outputEl.appendChild(iframe);

		iframe.contentDocument.head.innerHTML = this.head;
		iframe.contentDocument.head.appendChild(style);
		iframe.contentDocument.body.innerHTML = this.html;
		iframe.contentDocument.body.appendChild(script);
	}

	submit(event) {
		event.preventDefault();
		event.stopPropagation();
		this.run();
	}
}

export { RunSnip as default };
