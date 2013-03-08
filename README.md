mapcat is a simple utility that concatenates JavaScript files while also
concatenating the corresponding source map files. It is useful if you use
compile-to-JS languages whose compiler emits source map files. This is the
case for CoffeeScript "transpiler" version 1.6 or later.

It's very easy to use:

    bin/mapcat input1.map input2.map -m output.map -j output.js

You specify the input by specifying the associated source map files - mapcat
will find the actual JavaScript source files. Use `-m` to specify one output
source map file and `-j` to specify one output JavaScript file. Invoke without
any argument to see the (short) full help.

# API

You can also use the simple API. It exposes one simple function:

    var cat = require('mapcat').cat;
    cat(['input1.map', 'input2.map'], 'output.js', 'out.map');
