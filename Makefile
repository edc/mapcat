lib/index.js: src/index.coffee
	coffee -bc -o `dirname $@` $<
