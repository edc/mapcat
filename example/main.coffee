define 'main', (require) ->
	Person = require './model'
	p = new Person("Jimmy Kim", 31)
	alert p.toString()
