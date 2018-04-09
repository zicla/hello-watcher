var chokidar = require('chokidar');
const {exec} = require('child_process');
// One-liner for current directory, ignores .dotfiles
chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {

    if (path.endsWith(".less") && !path.startsWith("node_modules/")) {

        let lesscPath = __dirname + "/node_modules/.bin/lessc";
        let srcPath = __dirname + "/" + path;
        let distPath = __dirname + "/" + path.replace(new RegExp('less$'), 'css');
        let command = lesscPath + ' ' + srcPath + ' ' + distPath;
        console.log(command);
        exec(command, (err, stdout, stderr) => {
            if (err) {

                console.log(err);
            }
            if (stdout) {

                console.log(stdout);
            }
            if (stderr) {

                console.log(stderr);
            }

        });
    }


});