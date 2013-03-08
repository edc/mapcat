define 'model', ->
	class Person
		constructor: (@name, @age) ->
			debugger
			console.log("creating person instance")
		toString: ->
			return "#{@name} at age #{@age}"
