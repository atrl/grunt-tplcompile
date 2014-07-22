/*
 * grunt-tplcompile
 * https://github.com/atrl/grunt-tplcompile
 *
 * Copyright (c) 2013 atrl
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var path = require('path');
    var compile = require('../lib/compile');

    var wraps = {
        'seajs' : {
            before : 'define("{name}", function (require, exports, module) {\nexports = module.exports = ',
            after : "\n});"
        },
        'node' : {
            before : 'module.exports = exports = ',
            after : ""
        }
    }

    grunt.registerMultiTask('tplcompile', 'manifest file builder', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            root : '',
            wrap : 'seajs',
            output : 'tmpl',
            global : []
        });
        var wrap = wraps[options.wrap] || options.wrap;

        // Iterate over all src-dest file pairs.
        var writeFile = {};

        this.files.forEach(function(f) {
            // Concat banner + specified files + footer.
            f.src.map(function(filepath) {
                var dir = path.normalize(filepath + '/../../' + options.output);
                if (!writeFile[dir]) {
                    writeFile[dir] = [];
                }
                var source = compile(grunt.file.read(filepath), {
                    filepath : filepath,
                    global : options.global
                });
                writeFile[dir].push('"' + path.basename(filepath).split('.')[0] + '":' + source);
            });
        });

        for (var dir in writeFile) {
            // Write the destination file.
            grunt.file.write(
                dir + '.js', 
                wrap.before.replace('{name}', dir.replace(/\\/g, '/').replace(options.root, '')) 
                + "{\n" + writeFile[dir].join(',') + "\n}" 
                + wrap.after
            );
        }
    });
};