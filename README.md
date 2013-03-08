**mapcat** is a simple utility that concatenates JavaScript files while also
consolidating the corresponding source map files. It is useful if you use
compile-to-JS languages whose compiler emits source map files. This is the
case for CoffeeScript "transpiler" version 1.6 or later.

It's very easy to use:

    bin/mapcat input1.map input2.map -m output.map -j output.js

You specify the input by specifying the associated source map files - mapcat
will find the actual JavaScript source files. Use `-m` to specify one output
source map file and `-j` to specify one output JavaScript file. Invoke without
any argument to see the (short) full help.

### Example

There is a simple example project in the `example` folder. Run `bash build.sh`
to build the project. Then open `index.html` with Webkit Nightly or Chrome with
Source Map support turned on in the Developer Tools. If you have Scripts panel
enabled, refresh the page and you will see the program pause at a predefined
`debugger` line, and you are looking at, CoffeeScript!

![WebKit Source Map support shows in developer tools](http://f.cl.ly/items/0t0r2i0j0s0C2K1h0v3a/Screen%20Shot%202013-03-08%20at%2011.15.49%20AM.png)

### API

You can also use the simple API. It exposes one simple function:

    var cat = require('mapcat').cat;
    cat(['input1.map', 'input2.map'], 'output.js', 'out.map');
