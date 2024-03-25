/*! @remino/runin v0.1.0 | (c) 2022-2024 Rémino Rem <https://remino.net/> | ISC Licence */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.runin = factory());
})(this, (function () { 'use strict';

	const create = document.createElement.bind(document);
	const sel = document.querySelector.bind(document);
	const selOrCreate = (query, tag) => sel(query) || create(tag);

	const RUNIN_DEFAULT_LABEL = 'Run';

	class RunIn extends HTMLElement {
		connectedCallback() {
			this.htmlEl = selOrCreate(this.getAttribute('html'), 'div');
			this.cssEl = selOrCreate(this.getAttribute('css'), 'style');
			this.jsEl = selOrCreate(this.getAttribute('js'), 'script');
			this.outputEl = selOrCreate(this.getAttribute('output'), 'output');
			this.appendEl = sel(this.getAttribute('append')) || document.body;
			this.submitEl = selOrCreate(this.getAttribute('submit'), 'button');

			if (!this.submitEl.getAttribute('type')) this.submitEl.setAttribute('type', 'submit');

			if (this.submitEl.tagName === 'INPUT') {
				this.submitEl.value = this.textContent || RUNIN_DEFAULT_LABEL;
			} else {
				this.submitEl.innerHTML = this.innerHTML || RUNIN_DEFAULT_LABEL;
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

		get css() {
			return this.cssEl.value || this.cssEl.textContent
		}

		get js() {
			return this.jsEl.value || this.jsEl.textContent
		}

		run() {
			if (
				!document.contains(this.outputEl)
				&& this.appendEl
				&& !this.appendEl.contains(this.outputEl)
			) {
				this.appendEl.appendChild(this.outputEl);
			}

			const style = create('style');
			style.textContent = this.css;

			const script = create('script');
			script.textContent = this.js;

			this.outputEl.innerHTML = '';
			this.outputEl.appendChild(style);
			this.outputEl.innerHTML += this.html;
			this.outputEl.appendChild(script);
		}

		submit(event) {
			event.preventDefault();
			event.stopPropagation();
			this.run();
		}
	}

	return RunIn;

}));
