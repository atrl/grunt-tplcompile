'use strict';
var uglify = require("uglify-js");
module.exports = exports = function(str, options) {
    //get Variables
    var Variables = [
        // Global object properties
        // (http://www.ecma-international.org/publications/standards/Ecma-262.htm) 15.1
        'NaN', 'Infinity', 'undefined',
        'eval', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'decodeURI',
        'decodeURIComponent', 'encodeURI', 'encodeURIComponent',
        'Object', 'Function', 'Array', 'String', 'Boolean', 'Number',
        'Date', 'RegExp', 'Error', 'EvalError', 'RangeError',
        'ReferenceError', 'SyntaxError', 'TypeError', 'URIError',
        'Math', 'JSON',
        //non-object
        'undefined',
        //scope
        'this',
        //UserAgent global properties
        "Events", "Navigator", "Screen", "History", "Location", "window", "arguments",
        //common module argument
        "require", "modue", "exports"
    ];
    
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    var code = "function anonymous(data){var p='';" +
    "p +='" +
    // Convert the template into pure JavaScript
    str
    .replace(/[\r\t\n]/g, " ")
	.split("<%").join("\t")
    //replace str ' to \\'
	.replace(/(?:(^|%>)([^\t]*))/g, function($0, $1, $2){
        return $1 + $2.replace(/('|\\)/g, "\\$1")
    })
	.replace(/\t=(.*?)%>/g, "'; p+=$1; p+='")
	.split("\t").join("';")
	.split("%>").join("p +='")
	 + "';return p;}";

    var ast = uglify.parse(code);

    //get scope
    ast.figure_out_scope();

    //merge global object
    Variables = Variables.concat(options.global);

    var global = {};
    for(var i = 0, symbol; symbol = Variables[i]; i++){
        global[symbol] = true;
    }

    // transform and print
    var withExpression = 'data';
    var transformer = new uglify.TreeTransformer(null, function (node) {
		//clear function name
		if (node instanceof uglify.AST_Defun) {
			if (node.name.name == 'anonymous') {
                //after ast.figure_out_scope change function name 
                node.name.name = '';
                node.name.thedef.name = '';
			}
		}

		// add data scope
		if (node instanceof uglify.AST_Symbol) {
            var isInScope = false;
            var scope = node.scope;
            while(scope && !isInScope){
                isInScope = scope.variables.has(node.name);
                scope = scope.parent_scope;
            }

			if (!isInScope && !global[node.name]) {
                return new uglify.AST_Symbol({
                    name : withExpression + '.' + node.name
                });
			}
		}
	});
    var ast2 = ast.transform(transformer);

    //clear with
    // var withBody = ast2.body[0].body[1].body.body;
    // [].splice.apply(ast2.body[0].body, [1, 1].concat(withBody));

    return ast2.print_to_string({
        beautify: true
    });
};