'use strict';

module.exports = function (grunt) {
  var exec = require('child_process').exec;

  grunt.registerMultiTask('install-dependencies', 'Installs npm dependencies.', function () {
    var cb, options, cp;

    cb = this.async();
    options = this.options({
      cwd: '',
      stdout: true,
      stderr: true,
      failOnError: true,
      isDevelopment: false
    });
    var cmd = "npm install";
    if(!options.isDevelopment ) cmd += " -production";
    cp = exec(cmd, {cwd: options.cwd}, function (err, stdout, stderr) {
      if (err && options.failOnError) {
        grunt.warn(err);
      }
      cb();
    });

    grunt.verbose.writeflags(options, 'Options');

    if (options.stdout || grunt.option('verbose')) {
      console.log("Running npm install in: " + options.cwd);
      cp.stdout.pipe(process.stdout);
    }

    if (options.stderr || grunt.option('verbose')) {
      cp.stderr.pipe(process.stderr);
    }
  });
};
