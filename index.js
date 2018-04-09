var chokidar = require('chokidar');
const {exec} = require('child_process');
// One-liner for current directory, ignores .dotfiles
chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
    console.log(event, path);


    if (path.endsWith(".less") && !path.startsWith("node_modules/")) {

        console.log("run...");

        console.log(process.execPath)
        console.log(__dirname)
        console.log(process.cwd())
        let lesscPath = __dirname + "/node_modules/.bin/lessc";
        let srcPath = __dirname + "/" + path;
        let distPath = __dirname + "/" + path.replace(new RegExp('less$'), 'css');

        exec(lesscPath + ' ' + srcPath + ' ' + distPath, (err, stdout, stderr) => {
            console.log("err");
            console.log(err);
            console.log(stdout);
            console.log(stderr);

            if (err) {
                // node couldn't execute the command
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }


});