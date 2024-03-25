require 'date'
require 'middleman-reslib/date'
require 'middleman-reslib/external_link_popup'
require 'middleman-reslib/i18n'
require 'middleman-reslib/lazyload_images'
require 'middleman-reslib/minify'
require 'middleman-reslib/title'
require 'middleman-reslib/url'

activate :i18n
activate :reslib_date
activate :reslib_external_link_popup
activate :reslib_i18n
activate :reslib_lazyload_images
activate :reslib_title
activate :reslib_url, base_url: app.data.site.url

activate :directory_indexes
activate :livereload

activate :autoprefixer do |prefix|
	prefix.browsers = 'last 2 versions'
end

configure :build do
	activate :asset_hash, exts: %w(.css .js)
	activate :gzip
	activate :reslib_minify

	after_build do |builder|
		builder.thor.run 'bin/build_brotli build'
	end

	before_build do |builder|
		builder.thor.run 'npm run js:build'
	end

	ignore '/nav/*'
	ignore '/index.html'
end

# activate :external_pipeline,
# 	name: :css,
# 	command: "npm run #{build? ? 'css:build' : 'css:watch'}",
# 	source: ".build/css",
# 	latency: 2

activate :external_pipeline,
	name: :js,
	command: "npm run #{build? ? 'js:build' : 'js:watch'}",
	source: ".build/js",
	latency: 2

ignore '.DS_Store'

page '/*.json', layout: false
page '/*.txt', layout: false
page '/*.xml', layout: false

prefix = '/runsnip'

set :source, 'pages'
set :build_dir, 'build'
set :css_dir, prefix
set :haml, { format: :html5 }
set :images_dir, prefix
set :js_dir, prefix
set :partials_dir, prefix
set :relative_links, false
