/*! runsnip v0.2.2 | (c) 2022-2024 Rémino Rem <https://remino.net/> | ISC Licence */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.runsnip = factory());
})(this, (function () { 'use strict';

	const create = (tagName, doc = document) => doc.createElement(tagName);
	const sel = document.querySelector.bind(document);
	const selOrCreate = (query, tag) => sel(query) || create(tag);

	const DEFAULT_LABEL = 'Run';

	class RunSnipElement extends HTMLElement {
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

		render(iframe) {
			const { contentDocument: doc } = iframe;

			const style = create('style', doc);
			style.textContent = this.css;

			const script = create('script', doc);
			script.setAttribute('crossorigin', '');
			script.setAttribute('defer', '');
			script.textContent = this.js;

			doc.head.innerHTML = this.head;
			doc.head.appendChild(style);
			doc.body.innerHTML = this.html;
			doc.body.appendChild(script);
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
			iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
			iframe.setAttribute('srcdoc', '<!DOCTYPE html>');

			this.outputEl.innerHTML = '';
			this.outputEl.appendChild(iframe);

			iframe.addEventListener('load', () => this.render(iframe));
		}

		submit(event) {
			event.preventDefault();
			event.stopPropagation();
			this.run();
		}
	}

	return RunSnipElement;

}));
